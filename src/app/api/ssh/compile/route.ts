import { NextResponse } from "next/server";
import { sshExec, getCompileCmd } from "@/lib/ssh";

export async function POST() {
  try {
    const cmd = getCompileCmd();
    const { stdout, stderr } = await sshExec(cmd);

    const hasError = stderr.includes("error:") || stderr.includes("Error");

    return NextResponse.json({
      success: !hasError,
      stdout,
      stderr,
      command: cmd,
    });
  } catch (error: any) {
    console.error("SSH compile error:", error.message);
    return NextResponse.json({ success: false, error: error.message || "Derleme hatasi" }, { status: 500 });
  }
}
