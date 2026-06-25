import { NextResponse } from "next/server";
import { sshReadFile, getSourcePath } from "@/lib/ssh";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");

    if (!file) {
      return NextResponse.json({ success: false, error: "file parametresi gerekli" }, { status: 400 });
    }

    // Guvenlik: sadece izin verilen uzantilara izin ver
    const allowedExtensions = [".cpp", ".h", ".hpp", ".c", ".inc"];
    const hasValidExt = allowedExtensions.some(ext => file.endsWith(ext));
    if (!hasValidExt) {
      return NextResponse.json({ success: false, error: "Gecersiz dosya uzantisi" }, { status: 400 });
    }

    // Path traversal engelle
    if (file.includes("..")) {
      return NextResponse.json({ success: false, error: "Gecersiz dosya yolu" }, { status: 400 });
    }

    const sourcePath = getSourcePath(); // /usr/guide_source/Srcs/Server/game/src

    // Oncelikle game/src/ altinda ara
    const primaryPath = `${sourcePath}/${file}`;
    try {
      const content = await sshReadFile(primaryPath);
      return NextResponse.json({ success: true, content, file: primaryPath });
    } catch {
      // game/src/ altinda bulunamadi — Server/ kokunden dene
      // (common/, db/ gibi paylasimli klasorler icin)
      // sourcePath: /usr/guide_source/Srcs/Server/game/src → 2 ust dizin: /usr/guide_source/Srcs/Server
      const serverRoot = sourcePath.replace(/\/game\/src\/?$/, "");
      const fallbackPath = `${serverRoot}/${file}`;

      try {
        const content = await sshReadFile(fallbackPath);
        return NextResponse.json({ success: true, content, file: fallbackPath });
      } catch (err2: any) {
        return NextResponse.json({
          success: false,
          error: `Dosya bulunamadi: ${primaryPath} ve ${fallbackPath} denendi. Hata: ${err2.message}`
        }, { status: 404 });
      }
    }
  } catch (error: any) {
    console.error("SSH read error:", error.message);
    return NextResponse.json({ success: false, error: error.message || "SSH baglanti hatasi" }, { status: 500 });
  }
}
