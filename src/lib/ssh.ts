import { Client } from "ssh2";

// SSH baglanti bilgileri .env'den okunur
function getSSHConfig() {
  return {
    host: process.env.SSH_HOST || "",
    port: parseInt(process.env.SSH_PORT || "22"),
    username: process.env.SSH_USER || "root",
    password: process.env.SSH_PASSWORD || undefined,
    privateKey: process.env.SSH_PRIVATE_KEY || undefined,
  };
}

export function getSourcePath(): string {
  return process.env.SSH_SOURCE_PATH || "/usr/src/Server/game/src";
}

export function getCompileCmd(): string {
  return process.env.SSH_COMPILE_CMD || "cd /usr/src/Server/game/src && gmake";
}

// SSH ile dosya oku
export function sshReadFile(remotePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    const config = getSSHConfig();

    conn.on("ready", () => {
      conn.sftp((err: Error | undefined, sftp: any) => {
        if (err) { conn.end(); return reject(err); }

        sftp.readFile(remotePath, "utf8", (err2: Error | null, data: string) => {
          conn.end();
          if (err2) return reject(err2);
          resolve(data);
        });
      });
    });

    conn.on("error", (err: Error) => reject(err));
    conn.connect(config);
  });
}

// SSH ile dosya yaz
export function sshWriteFile(remotePath: string, content: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    const config = getSSHConfig();

    conn.on("ready", () => {
      conn.sftp((err: Error | undefined, sftp: any) => {
        if (err) { conn.end(); return reject(err); }

        sftp.writeFile(remotePath, content, "utf8", (err2: Error | null) => {
          conn.end();
          if (err2) return reject(err2);
          resolve();
        });
      });
    });

    conn.on("error", (err: Error) => reject(err));
    conn.connect(config);
  });
}

// SSH ile komut calistir
export function sshExec(command: string): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    const config = getSSHConfig();

    conn.on("ready", () => {
      conn.exec(command, (err: Error | undefined, stream: any) => {
        if (err) { conn.end(); return reject(err); }

        let stdout = "";
        let stderr = "";

        stream.on("close", () => {
          conn.end();
          resolve({ stdout, stderr });
        });

        stream.on("data", (data: Buffer) => { stdout += data.toString(); });
        stream.stderr.on("data", (data: Buffer) => { stderr += data.toString(); });
      });
    });

    conn.on("error", (err: Error) => reject(err));
    conn.connect(config);
  });
}

// SSH baglanti testi
export function sshTestConnection(): Promise<boolean> {
  return new Promise((resolve) => {
    const conn = new Client();
    const config = getSSHConfig();

    conn.on("ready", () => {
      conn.end();
      resolve(true);
    });

    conn.on("error", () => resolve(false));

    try {
      conn.connect(config);
    } catch {
      resolve(false);
    }
  });
}
