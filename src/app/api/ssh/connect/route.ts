import { NextResponse } from "next/server";
import { sshTestConnection } from "@/lib/ssh";

export async function GET() {
  try {
    const connected = await sshTestConnection();
    return NextResponse.json({ success: true, connected });
  } catch (error: any) {
    return NextResponse.json({ success: false, connected: false, error: error.message }, { status: 500 });
  }
}
