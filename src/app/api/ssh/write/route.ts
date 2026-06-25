import { NextResponse } from "next/server";
import { sshWriteFile, getSourcePath } from "@/lib/ssh";

export async function POST(req: Request) {
  try {
    const { file, content } = await req.json();

    if (!file || content === undefined) {
      return NextResponse.json({ success: false, error: "file ve content gerekli" }, { status: 400 });
    }

    const allowedExtensions = [".cpp", ".h", ".hpp", ".c", ".inc"];
    const hasValidExt = allowedExtensions.some(ext => file.endsWith(ext));
    if (!hasValidExt || file.includes("..")) {
      return NextResponse.json({ success: false, error: "Gecersiz dosya" }, { status: 400 });
    }

    const remotePath = `${getSourcePath()}/${file}`;
    await sshWriteFile(remotePath, content);

    return NextResponse.json({ success: true, message: `${file} basariyla kaydedildi` });
  } catch (error: any) {
    console.error("SSH write error:", error.message);
    return NextResponse.json({ success: false, error: error.message || "Yazma hatasi" }, { status: 500 });
  }
}
