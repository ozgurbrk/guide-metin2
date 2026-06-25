"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Play, Terminal, CheckCircle2, ChevronRight, CheckCircle, Database } from "lucide-react";
import axios from "axios";
import { quests } from "@/data/quests";

export default function EditorPage() {
  const [questId, setQuestId] = useState<number>(1);
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [completedQuests, setCompletedQuests] = useState<Set<number>>(new Set());

  // Get current quest object
  const currentQuest = quests.find(q => q.id === questId) || quests[0];

  // Fetch progress on load
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = await axios.get("/api/progress");
        if (res.data.success) {
          const completedIds = res.data.progress.map((p: any) => p.questId);
          setCompletedQuests(new Set(completedIds));
        }
      } catch (err) {
        console.error("Progress yuklenemedi", err);
      }
    };
    loadProgress();
  }, []);

  // When quest changes, update the editor code
  useEffect(() => {
    setCode(currentQuest.defaultCode);
    setOutput("");
    setStatus("idle");
    setErrorMsg("");
  }, [questId, currentQuest]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Sunucuya gonderiliyor ve derleniyor...");
    setStatus("idle");
    setErrorMsg("");
    
    try {
      const response = await axios.post("/api/execute", {
        code: code,
      });

      const runResult = response.data.run;
      const compileResult = response.data.compile;

      if (compileResult && compileResult.stderr) {
        setOutput(`--- DERLEME HATASI ---\n${compileResult.stderr}`);
        setStatus("error");
        setErrorMsg("Kod derlenirken bir hata olustu. Terminali kontrol et!");
        setIsRunning(false);
        return;
      }

      if (runResult && runResult.stderr) {
        setOutput(`--- CALISMA ZAMANI HATASI ---\n${runResult.stderr}`);
        setStatus("error");
        setErrorMsg("Kod calisirken bir hata olustu.");
        setIsRunning(false);
        return;
      }

      const finalOutput = runResult ? runResult.stdout : "Aciklanamayan bos cikti";
      setOutput(finalOutput);

      // Hedef kontrolü
      const cleanOutput = finalOutput.trim();
      const targetText = currentQuest.targetOutputText.trim();
      
      if (cleanOutput.includes(targetText)) {
        setStatus("success");
        // Eger daha once tamamlanmadiysa veritabanina kaydet
        if (!completedQuests.has(questId)) {
          try {
            await axios.post("/api/progress", { questId, code });
            setCompletedQuests(prev => new Set(prev).add(questId));
          } catch (err) {
            console.error("Progress kaydedilemedi", err);
          }
        }
      } else {
        setStatus("error");
        setErrorMsg(`Yazdirilan metin istenilen metinle eslesmiyor. Cikti: '${cleanOutput}', Beklenen: '${targetText}'`);
      }

    } catch (error: any) {
      setOutput(
        error.response?.data?.error || "API ile iletisim kurulurken bir hata olustu. Sunucu kapali veya limit asildi."
      );
      setStatus("error");
      setErrorMsg("Sunucuya baglanilamadi!");
    } finally {
      setIsRunning(false);
    }
  };

  const handleNextQuest = () => {
    if (questId < quests.length) {
      setQuestId(questId + 1);
    } else {
      alert("Tebrikler! Mevcut tüm eğitimleri bitirdiniz. Yeni görevler yolda!");
    }
  };

  const progressPercentage = Math.round((completedQuests.size / quests.length) * 100);

  const getRank = (count: number) => {
    if (count >= 100) return "S";
    if (count >= 80) return "A";
    if (count >= 60) return "B";
    if (count >= 40) return "C";
    if (count >= 20) return "D";
    return "E";
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "S": return "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] font-black text-2xl";
      case "A": return "text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.6)] font-extrabold text-2xl";
      case "B": return "text-blue-400 font-bold text-xl";
      case "C": return "text-green-400 font-bold text-xl";
      case "D": return "text-orange-400 font-bold text-lg";
      default: return "text-gray-400 font-bold text-lg";
    }
  };

  const rank = getRank(completedQuests.size);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)] text-foreground">
      {/* Sol Taraf - Gorev Aciklamasi */}
      <div className="w-full lg:w-1/3 border-r border-surface-border p-6 lg:p-8 flex flex-col gap-6 bg-background/50 overflow-y-auto max-h-[calc(100vh-73px)]">
        
        {/* Progress Bar & Rank */}
        <div className="bg-surface border border-surface-border p-5 rounded-xl flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-foreground/80 flex items-center gap-2">
              <Database className="w-4 h-4 text-accent" />
              İlerleme ({completedQuests.size}/{quests.length})
            </span>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold leading-none">Rütbe</span>
                <span className={`${getRankColor(rank)} leading-none mt-1`}>{rank}</span>
              </div>
              <span className="text-lg font-black text-accent ml-2">{progressPercentage}%</span>
            </div>
          </div>
          <div className="w-full bg-background rounded-full h-3 border border-surface-border overflow-hidden">
            <div className="bg-accent h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-accent text-sm font-semibold tracking-wider uppercase flex items-center justify-between">
            {currentQuest.level}
            {completedQuests.has(questId) && <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs">Tamamlandı</span>}
          </p>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            {currentQuest.title}
          </h1>
        </div>

        <p className="text-foreground/80 leading-relaxed text-lg">
          {currentQuest.description}
        </p>

        <div className="bg-surface border border-surface-border rounded-xl p-5 mt-2">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            Hedefiniz:
          </h3>
          <p className="text-foreground/90">
            {currentQuest.instruction}
          </p>
        </div>

        {/* Status Messages */}
        <div className="mt-4">
          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse" />
              <div>
                <h4 className="text-red-400 font-bold mb-1">Gorev Basarisiz</h4>
                <p className="text-red-400/80 text-sm">{errorMsg}</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
                <div>
                  <h4 className="text-green-400 font-bold mb-1">Gorev Basariyla Tamamlandi!</h4>
                  <p className="text-green-400/80 text-sm">{currentQuest.successMessage}</p>
                </div>
              </div>
              
              <button 
                onClick={handleNextQuest}
                className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2"
              >
                Sonraki Göreve Geç
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Görev Seçici (Hızlı Navigasyon) */}
        <div className="mt-auto pt-6">
          <h3 className="text-sm font-bold text-foreground/60 mb-2 uppercase tracking-wider">Görev Seçici</h3>
          <div className="flex flex-wrap gap-2">
            {quests.map(q => (
              <button
                key={q.id}
                onClick={() => setQuestId(q.id)}
                className={`w-10 h-10 rounded flex items-center justify-center font-bold text-xs transition-colors border
                  ${q.id === questId 
                    ? 'bg-accent text-white border-accent' 
                    : completedQuests.has(q.id) 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30' 
                      : 'bg-surface text-foreground/60 border-surface-border hover:bg-surface-hover'}`}
              >
                {q.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sag Taraf - Editor ve Konsol */}
      <div className="w-full lg:w-2/3 flex flex-col h-full border-b lg:border-b-0 border-surface-border">
        {/* Monaco Editor */}
        <div className="w-full h-[50vh] lg:h-[calc(100vh-73px-16rem)] relative">
          <Editor
            height="100%"
            defaultLanguage="cpp"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              padding: { top: 24, bottom: 24 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              renderLineHighlight: "all",
            }}
          />
        </div>

        {/* Konsol Tarafı */}
        <div className="h-64 lg:h-64 bg-[#0d0f17] flex flex-col flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-3 border-y border-surface-border/50 bg-[#0f111a]">
            <div className="flex items-center gap-2 text-foreground/70 font-medium text-sm">
              <Terminal className="w-4 h-4" />
              Terminal (Derleyici Ciktisi)
            </div>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100"
            >
              <Play className="w-4 h-4 fill-current" />
              {isRunning ? "Derleniyor..." : "Derle ve Calistir"}
            </button>
          </div>
          <div className="p-6 font-mono text-sm text-foreground/80 overflow-y-auto whitespace-pre-wrap flex-1">
            {output || "Henuz bir islem yapilamadi. Kodu calistirmak icin yukaridaki butona basin."}
          </div>
        </div>
      </div>
    </div>
  );
}
