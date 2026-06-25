import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    // Piston yerine gercek bir C++ derleyicisi olan Wandbox API (gcc-head) kullaniyoruz.
    const response = await axios.post("https://wandbox.org/api/compile.json", {
      code: code,
      compiler: "gcc-head",
      save: false
    });

    const data = response.data;

    // Wandbox donus tipini Piston'un yapisina ceviriyoruz ki frontend'deki kod bozulmasin
    const compileStderr = data.compiler_error || "";
    const stdout = data.program_output || data.program_message || "";
    const runStderr = data.program_error || "";

    if (data.status !== "0" && !compileStderr && !runStderr) {
      return NextResponse.json({
        compile: { stderr: "Derleme sirasinda bilinmeyen bir hata olustu." },
        run: null
      });
    }

    return NextResponse.json({
      compile: { stderr: compileStderr },
      run: { 
        stdout: stdout, 
        stderr: runStderr 
      }
    });

  } catch (error: any) {
    console.error("Compiler API Error:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Kod derleyici sunucusuna ulasilamadi." },
      { status: 500 }
    );
  }
}
