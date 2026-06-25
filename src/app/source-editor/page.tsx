"use client";

import { useState, useEffect, useCallback } from "react";
import Editor, { DiffEditor } from "@monaco-editor/react";
import {
  Play, Save, Eye, Terminal, CheckCircle2, ChevronRight,
  Wifi, WifiOff, FileCode2, Server,
  RefreshCw, AlertTriangle, CheckCircle, X
} from "lucide-react";
import axios from "axios";
import { sourceQuests, SourceQuest } from "@/data/source-quests";

type ViewMode = "edit" | "preview";

// Her dosya icin ayri state
interface FileState {
  path: string;
  description: string;
  originalCode: string;
  currentCode: string;
}

export default function SourceEditorPage() {
  // Gorev state
  const [questId, setQuestId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"temel" | "orta" | "zor">("temel");

  // Multi-file state
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>("edit");

  // SSH state
  const [sshConnected, setSshConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  // Terminal state
  const [terminalOutput, setTerminalOutput] = useState<string>("");
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // Ilerleme
  const [completedQuests, setCompletedQuests] = useState<Set<number>>(new Set());

  // Aktif gorev
  const currentQuest = sourceQuests.find(q => q.id === questId) || sourceQuests[0];

  // Aktif dosya
  const activeFile = fileStates[activeFileIndex] || null;

  // Kategoriye gore gorevler
  const temelQuests = sourceQuests.filter(q => q.category === "temel");
  const ortaQuests = sourceQuests.filter(q => q.category === "orta");
  const zorQuests = sourceQuests.filter(q => q.category === "zor");

  // Progress
  const progressPercentage = Math.round((completedQuests.size / sourceQuests.length) * 100);

  // Rank
  const getRank = (count: number) => {
    if (count >= 80) return "S";
    if (count >= 60) return "A";
    if (count >= 40) return "B";
    if (count >= 20) return "C";
    if (count >= 10) return "D";
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

  // SSH baglanti kontrolu
  const checkSSH = useCallback(async () => {
    try {
      const res = await axios.get("/api/ssh/connect");
      setSshConnected(res.data.connected);
    } catch {
      setSshConnected(false);
    }
  }, []);

  useEffect(() => { checkSSH(); }, [checkSSH]);

  // Progress yukle
  useEffect(() => {
    const saved = localStorage.getItem("source-progress");
    if (saved) {
      try { setCompletedQuests(new Set(JSON.parse(saved))); } catch {}
    }
  }, []);

  // Dosyalari yukle (gorev degistiginde)
  const loadFiles = useCallback(async () => {
    if (!currentQuest.files || currentQuest.files.length === 0) return;
    setIsLoading(true);
    setTerminalOutput("");
    setStatusMsg(null);
    setViewMode("edit");
    setActiveFileIndex(0);

    // Once SSH baglantisi var mi kontrol et
    let useSSH = false;
    try {
      const connRes = await axios.get("/api/ssh/connect");
      useSSH = connRes.data.connected === true;
      setSshConnected(useSSH);
    } catch {
      useSSH = false;
      setSshConnected(false);
    }

    const newFileStates: FileState[] = [];

    for (const file of currentQuest.files) {
      let content = `// ${file.path} dosyasi yuklenemedi.\n// ${useSSH ? "SSH" : "Lokal"} kaynaktan okunamadi.`;

      if (useSSH) {
        // SSH baglantisi var → SSH'dan oku
        try {
          const res = await axios.get(`/api/ssh/read?file=${file.path}`);
          if (res.data.success) {
            content = res.data.content;
          }
        } catch (err: any) {
          console.error(`SSH'dan okunamadi: ${file.path}`, err.message);
        }
      } else {
        // SSH yok → Lokalden oku
        try {
          const res = await axios.get(`/api/local/read?file=${file.path}`);
          if (res.data.success) {
            content = res.data.content;
          }
        } catch (err: any) {
          console.error(`Lokalden okunamadi: ${file.path}`, err.message);
        }
      }

      newFileStates.push({
        path: file.path,
        description: file.description,
        originalCode: content,
        currentCode: content,
      });
    }

    setFileStates(newFileStates);
    setIsLoading(false);
  }, [currentQuest]);

  useEffect(() => { loadFiles(); }, [questId, loadFiles]);

  // Kod degistiginde
  const handleCodeChange = (val: string | undefined) => {
    if (!val || activeFileIndex < 0 || activeFileIndex >= fileStates.length) return;
    setFileStates(prev => {
      const updated = [...prev];
      updated[activeFileIndex] = { ...updated[activeFileIndex], currentCode: val };
      return updated;
    });
  };

  // Tum dosyalarda degisiklik var mi
  const hasAnyChanges = fileStates.some(f => f.currentCode !== f.originalCode);
  const activeHasChanges = activeFile ? activeFile.currentCode !== activeFile.originalCode : false;

  // Kaydet (tum degisen dosyalari)
  const handleSave = async () => {
    const changedFiles = fileStates.filter(f => f.currentCode !== f.originalCode);
    if (changedFiles.length === 0) return;

    setIsSaving(true);
    setStatusMsg(null);

    try {
      for (const file of changedFiles) {
        await axios.post("/api/ssh/write", {
          file: file.path,
          content: file.currentCode,
        });
      }

      setStatusMsg({
        type: "success",
        text: `${changedFiles.length} dosya sunucuya kaydedildi: ${changedFiles.map(f => f.path).join(", ")}`
      });

      // Originalleri guncelle
      setFileStates(prev => prev.map(f => ({ ...f, originalCode: f.currentCode })));

      // Gorevi tamamla
      if (!completedQuests.has(questId)) {
        const newCompleted = new Set(completedQuests).add(questId);
        setCompletedQuests(newCompleted);
        localStorage.setItem("source-progress", JSON.stringify([...newCompleted]));
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: `Kaydetme hatasi: ${err.response?.data?.error || err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  // Derle
  const handleCompile = async () => {
    setIsCompiling(true);
    setTerminalOutput("Derleniyor... (make)\n");
    setStatusMsg(null);

    try {
      const res = await axios.post("/api/ssh/compile");
      const output = (res.data.stdout || "") + (res.data.stderr || "");
      setTerminalOutput(output || "Derleme tamamlandi.");

      if (res.data.success) {
        setStatusMsg({ type: "success", text: "Derleme basarili! Game binary guncellendi." });
      } else {
        setStatusMsg({ type: "error", text: "Derleme hatasi! Terminali kontrol et." });
      }
    } catch (err: any) {
      setTerminalOutput(`Derleme hatasi: ${err.message}`);
      setStatusMsg({ type: "error", text: "Sunucuya baglanamadi." });
    } finally {
      setIsCompiling(false);
    }
  };

  // Sonraki gorev
  const handleNextQuest = () => {
    const currentIndex = sourceQuests.findIndex(q => q.id === questId);
    if (currentIndex < sourceQuests.length - 1) {
      setQuestId(sourceQuests[currentIndex + 1].id);
    }
  };

  // Aktif kategorinin gorevleri
  const activeQuests = activeTab === "temel" ? temelQuests : activeTab === "orta" ? ortaQuests : zorQuests;

  // Degisen dosya sayisi
  const changedFileCount = fileStates.filter(f => f.currentCode !== f.originalCode).length;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)] text-foreground">
      {/* ===== SOL PANEL ===== */}
      <div className="w-full lg:w-[320px] border-r border-surface-border flex flex-col bg-background/50 overflow-y-auto max-h-[calc(100vh-73px)]">

        {/* SSH Durumu */}
        <div className="p-4 border-b border-surface-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {sshConnected ? (
                <><Wifi className="w-4 h-4 text-green-400" /><span className="text-green-400 text-sm font-bold">SSH Bağlı</span></>
              ) : (
                <><WifiOff className="w-4 h-4 text-orange-400" /><span className="text-orange-400 text-sm font-bold">Lokal Mod</span></>
              )}
            </div>
            <button onClick={checkSSH} className="text-foreground/50 hover:text-accent transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-foreground/40 mt-1.5">
            {sshConnected ? "📡 Kaynak: SSH sunucusu" : "📂 Kaynak: Lokal dosyalar"}
          </p>
        </div>

        {/* Progress Bar & Rank */}
        <div className="p-4 border-b border-surface-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-foreground/80 flex items-center gap-2">
              <Server className="w-4 h-4 text-red-400" />
              İlerleme ({completedQuests.size}/{sourceQuests.length})
            </span>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold leading-none">Rütbe</span>
                <span className={`${getRankColor(rank)} leading-none mt-1`}>{rank}</span>
              </div>
              <span className="text-lg font-black text-red-400 ml-2">{progressPercentage}%</span>
            </div>
          </div>
          <div className="w-full bg-background rounded-full h-3 border border-surface-border overflow-hidden">
            <div className="bg-red-500 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>

        {/* Kategori Sekmeleri */}
        <div className="flex border-b border-surface-border">
          {[
            { key: "temel" as const, label: "Temel", count: temelQuests.length },
            { key: "orta" as const, label: "Orta", count: ortaQuests.length },
            { key: "zor" as const, label: "Zor", count: zorQuests.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors
                ${activeTab === tab.key ? "text-red-400 border-b-2 border-red-400 bg-red-400/5" : "text-foreground/50 hover:text-foreground/80"}`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Gorev Listesi */}
        <div className="flex-1 overflow-y-auto">
          {activeQuests.map(q => (
            <button
              key={q.id}
              onClick={() => setQuestId(q.id)}
              className={`w-full text-left px-4 py-3 border-b border-surface-border/50 transition-colors flex items-center gap-3
                ${q.id === questId ? "bg-red-500/10 border-l-2 border-l-red-500" : "hover:bg-surface-hover"}
                ${completedQuests.has(q.id) ? "opacity-70" : ""}`}
            >
              {completedQuests.has(q.id) ? (
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              ) : (
                <FileCode2 className="w-4 h-4 text-foreground/30 shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground/90 truncate">{q.title}</p>
                <p className="text-xs text-foreground/50 truncate">
                  {q.files.map(f => f.path).join(" + ")}
                  {q.files.length > 1 && <span className="ml-1 text-orange-400 font-bold">({q.files.length} dosya)</span>}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ===== ORTA PANEL ===== */}
      <div className="flex-1 flex flex-col">
        {/* Gorev Bilgisi */}
        <div className="p-4 border-b border-surface-border bg-[#0d0f17]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-red-400 text-xs font-semibold tracking-wider uppercase mb-1">
                {currentQuest.category.toUpperCase()} SEVİYE
                {currentQuest.files.length > 1 && (
                  <span className="ml-2 bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs">{currentQuest.files.length} dosya</span>
                )}
                {completedQuests.has(questId) && <span className="ml-2 bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs">✓ Tamamlandı</span>}
              </p>
              <h2 className="text-xl font-bold text-white mb-2">{currentQuest.title}</h2>
              <p className="text-foreground/70 text-sm leading-relaxed">{currentQuest.description}</p>
              <div className="mt-3 bg-surface border border-surface-border rounded-lg p-3">
                <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-400" />
                  Yapılacak:
                </h3>
                <p className="text-foreground/80 text-sm whitespace-pre-line">{currentQuest.instruction}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dosya Sekmeleri */}
        <div className="flex items-center border-b border-surface-border bg-[#0a0c14] overflow-x-auto">
          {fileStates.map((file, index) => {
            const hasChanges = file.currentCode !== file.originalCode;
            return (
              <button
                key={file.path}
                onClick={() => { setActiveFileIndex(index); setViewMode("edit"); }}
                className={`px-4 py-2.5 text-xs font-bold border-r border-surface-border/30 flex items-center gap-2 transition-colors whitespace-nowrap
                  ${index === activeFileIndex
                    ? "bg-[#1e2030] text-white border-b-2 border-b-red-500"
                    : "text-foreground/50 hover:text-foreground/80 hover:bg-surface-hover"
                  }`}
              >
                <FileCode2 className="w-3.5 h-3.5" />
                {file.path}
                {hasChanges && <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />}
              </button>
            );
          })}
          {/* Dosya aciklamasi */}
          {activeFile && (
            <span className="px-3 text-xs text-foreground/40 italic ml-auto shrink-0">
              → {activeFile.description}
            </span>
          )}
        </div>

        {/* Editor Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-surface-border bg-[#0f111a]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("edit")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1.5
                ${viewMode === "edit" ? "bg-accent text-white" : "text-foreground/60 hover:text-white"}`}
            >
              <FileCode2 className="w-3.5 h-3.5" /> Düzenle
            </button>
            <button
              onClick={() => setViewMode("preview")}
              disabled={!activeHasChanges}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1.5
                ${viewMode === "preview" ? "bg-orange-500 text-white" : "text-foreground/60 hover:text-white"}
                ${!activeHasChanges ? "opacity-30 pointer-events-none" : ""}`}
            >
              <Eye className="w-3.5 h-3.5" /> Önizle
            </button>
          </div>
          <div className="flex items-center gap-2">
            {hasAnyChanges && (
              <span className="text-orange-400 text-xs font-bold animate-pulse">
                {changedFileCount} dosyada değişiklik
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={!hasAnyChanges || isSaving}
              className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none"
            >
              <Save className="w-3.5 h-3.5" /> {isSaving ? "Kaydediliyor..." : `Kaydet (${changedFileCount})`}
            </button>
            <button
              onClick={handleCompile}
              disabled={isCompiling}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-30"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> {isCompiling ? "Derleniyor..." : "Derle (make)"}
            </button>
          </div>
        </div>

        {/* Monaco Editor veya Diff */}
        <div className="flex-1 relative">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-foreground/50">
              <RefreshCw className="w-6 h-6 animate-spin mr-2" /> Dosyalar yükleniyor...
            </div>
          ) : !activeFile ? (
            <div className="flex items-center justify-center h-full text-foreground/50">
              Dosya seçilmedi
            </div>
          ) : viewMode === "preview" ? (
            <DiffEditor
              height="100%"
              language="cpp"
              theme="vs-dark"
              original={activeFile.originalCode}
              modified={activeFile.currentCode}
              options={{
                readOnly: true,
                renderSideBySide: true,
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }}
            />
          ) : (
            <Editor
              height="100%"
              defaultLanguage="cpp"
              theme="vs-dark"
              value={activeFile.currentCode}
              onChange={handleCodeChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                renderLineHighlight: "all",
              }}
            />
          )}
        </div>

        {/* Status Mesajlari */}
        {statusMsg && (
          <div className={`px-4 py-2 flex items-center justify-between text-sm font-bold
            ${statusMsg.type === "success" ? "bg-green-500/10 text-green-400 border-t border-green-500/20" :
              statusMsg.type === "error" ? "bg-red-500/10 text-red-400 border-t border-red-500/20" :
              "bg-blue-500/10 text-blue-400 border-t border-blue-500/20"}`}>
            <div className="flex items-center gap-2">
              {statusMsg.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              {statusMsg.text}
            </div>
            <div className="flex items-center gap-2">
              {statusMsg.type === "success" && (
                <button onClick={handleNextQuest} className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1">
                  Sonraki <ChevronRight className="w-3 h-3" />
                </button>
              )}
              <button onClick={() => setStatusMsg(null)}><X className="w-4 h-4 opacity-60 hover:opacity-100" /></button>
            </div>
          </div>
        )}

        {/* Terminal */}
        <div className="h-40 bg-[#0a0c14] border-t border-surface-border flex flex-col flex-shrink-0">
          <div className="flex items-center px-4 py-2 border-b border-surface-border/30 bg-[#0d0f17]">
            <Terminal className="w-4 h-4 text-foreground/50 mr-2" />
            <span className="text-foreground/50 font-medium text-xs">Derleme Çıktısı</span>
          </div>
          <div className="p-4 font-mono text-xs text-foreground/70 overflow-y-auto whitespace-pre-wrap flex-1">
            {terminalOutput || "Henüz bir derleme yapılmadı. Değişiklik yapıp 'Derle' butonuna basın."}
          </div>
        </div>
      </div>
    </div>
  );
}
