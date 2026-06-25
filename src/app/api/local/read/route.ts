import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

// Lokal source dosyalarini okur
// Oncelik: game/src/ → sonra Server/ koku (common/ gibi klasorler icin)
const SERVER_ROOT = path.resolve("d:/guide metin2/gdb_server_source/Srcs/Server");
const GAME_SRC = path.resolve("d:/guide metin2/gdb_server_source/Srcs/Server/game/src");
const CLIENT_ROOT = path.resolve("d:/guide metin2/source-client/Srcs/Client");

const ALLOWED_ROOTS = [SERVER_ROOT, CLIENT_ROOT];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");

    if (!file) {
      return NextResponse.json({ success: false, error: "file parametresi gerekli" }, { status: 400 });
    }

    if (file.includes("..")) {
      return NextResponse.json({ success: false, error: "Gecersiz dosya yolu" }, { status: 400 });
    }

    const allowedExtensions = [".cpp", ".h", ".hpp", ".c", ".inc", ".py"];
    const hasValidExt = allowedExtensions.some(ext => file.endsWith(ext));
    if (!hasValidExt) {
      return NextResponse.json({ success: false, error: "Gecersiz dosya uzantisi" }, { status: 400 });
    }

    // Eger tam yol verilmisse (eski uyumluluk)
    if (path.isAbsolute(file)) {
      const fullPath = path.resolve(file);
      const isAllowed = ALLOWED_ROOTS.some(root => fullPath.startsWith(root));
      if (!isAllowed) {
        return NextResponse.json({ success: false, error: "Bu dizine erisim yetkisi yok" }, { status: 403 });
      }
      if (!fs.existsSync(fullPath)) {
        return NextResponse.json({ success: false, error: "Dosya bulunamadi" }, { status: 404 });
      }
      const content = fs.readFileSync(fullPath, "utf-8");
      return NextResponse.json({ success: true, content, file: fullPath });
    }

    // Relatif yol → oncelikle game/src/ altinda, sonra Server/ kokunde ara
    const primaryPath = path.resolve(GAME_SRC, file);
    if (primaryPath.startsWith(SERVER_ROOT) && fs.existsSync(primaryPath)) {
      const content = fs.readFileSync(primaryPath, "utf-8");
      return NextResponse.json({ success: true, content, file: primaryPath });
    }

    // Fallback: Server/ kokunden dene (common/ gibi klasorler icin)
    const fallbackPath = path.resolve(SERVER_ROOT, file);
    if (fallbackPath.startsWith(SERVER_ROOT) && fs.existsSync(fallbackPath)) {
      const content = fs.readFileSync(fallbackPath, "utf-8");
      return NextResponse.json({ success: true, content, file: fallbackPath });
    }

    return NextResponse.json({ success: false, error: `Dosya bulunamadi: ${file}` }, { status: 404 });
  } catch (error: any) {
    console.error("Local read error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
