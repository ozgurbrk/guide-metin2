import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Metin2 C++ Geliştirici Akademisi",
  description: "Web tabanlı C++ ve Metin2 eğitim platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <nav className="border-b border-surface-border bg-surface px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-white">M2</div>
            <span className="font-bold text-lg tracking-wide">Metin2 Academy</span>
          </div>
          <div className="flex gap-4 text-sm font-medium">
            <a href="/" className="hover:text-accent transition-colors">Ana Sayfa</a>
            <a href="/editor" className="hover:text-accent transition-colors">C++ Akademisi</a>
            <a href="/source-editor" className="text-red-400/70 hover:text-red-400 transition-colors">Source Akademisi</a>
          </div>
        </nav>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
