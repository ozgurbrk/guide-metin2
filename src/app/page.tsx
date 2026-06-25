import { Code2, Server, Gamepad2, Play, FileCode2, Terminal, Zap, Shield, Swords, Database } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-border via-background to-background">
      <div className="max-w-5xl w-full text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Metin2 Geliştirici <span className="text-accent">Akademisi</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          C++ temellerinden Metin2 Source düzenlemeye kadar interaktif bir öğrenme deneyimi.
        </p>

        {/* İki Ana Kurs */}
        <div className="grid md:grid-cols-2 gap-8 pt-12">
          {/* C++ Akademisi */}
          <Link href="/editor" className="group block">
            <div className="relative bg-surface border border-surface-border p-8 rounded-2xl hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 h-full">
              <div className="absolute top-4 right-4 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold">
                120 Görev
              </div>
              <div className="flex flex-col items-center text-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Code2 className="w-10 h-10 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">C++ Akademisi</h2>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Sıfırdan ileri seviye C++ öğren. Pointer'lar, OOP, STL, template'ler ve Metin2'ye özel C++ kalıplarını interaktif görevlerle pekiştir.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {["Temel C++", "OOP", "STL", "Pointer", "Template", "Thread"].map(tag => (
                    <span key={tag} className="bg-accent/10 text-accent text-xs px-2.5 py-1 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-accent font-bold mt-4 group-hover:gap-3 transition-all">
                  <Play fill="currentColor" className="w-4 h-4" /> C++ Görevlerine Başla
                </div>
              </div>
            </div>
          </Link>

          {/* Source Akademisi */}
          <Link href="/source-editor" className="group block">
            <div className="relative bg-surface border border-surface-border p-8 rounded-2xl hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 h-full">
              <div className="absolute top-4 right-4 bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold">
                100 Görev
              </div>
              <div className="flex flex-col items-center text-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Server className="w-10 h-10 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Source Akademisi</h2>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Gerçek Metin2 sunucu kaynak kodlarını SSH ile düzenle. GM komutları yaz, yeni sistemler ekle, sunucuda derle ve test et.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {["GM Komutları", "Hasar Sistemi", "Paket", "Anti-Cheat", "Dungeon", "Pet"].map(tag => (
                    <span key={tag} className="bg-red-500/10 text-red-400 text-xs px-2.5 py-1 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-red-400 font-bold mt-4 group-hover:gap-3 transition-all">
                  <Terminal className="w-4 h-4" /> Source Görevlerine Başla
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Özellikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          {[
            { icon: <Zap className="w-5 h-5" />, label: "Canlı Derleme" },
            { icon: <Shield className="w-5 h-5" />, label: "SSH Entegrasyonu" },
            { icon: <Swords className="w-5 h-5" />, label: "Gerçek Source" },
            { icon: <Database className="w-5 h-5" />, label: "İlerleme Kayıt" },
          ].map((f, i) => (
            <div key={i} className="flex items-center justify-center gap-2 text-gray-500 text-sm bg-surface/50 border border-surface-border/50 rounded-lg py-3">
              {f.icon} {f.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
