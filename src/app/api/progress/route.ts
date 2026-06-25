import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const progress = await prisma.userProgress.findMany({
      where: { userId: "local-user" },
      select: { questId: true, code: true }
    });

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error("Progress fetch error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

// Yeni gorev tamamlandiginda kaydeder
export async function POST(req: Request) {
  try {
    const { questId, code } = await req.json();

    if (!questId) {
      return NextResponse.json({ success: false, error: "Missing questId" }, { status: 400 });
    }

    // Ayni gorevi tekrar yaparsa ustune yaziyoruz (upsert mantigi, ama su an upsert icin unique constraint gerekecek)
    // Prisma tarafinda questId'yi @unique tanimladigimiz icin upsert kullanabiliriz
    const updatedProgress = await prisma.userProgress.upsert({
      where: { questId: questId },
      update: {
        code: code,
        completedAt: new Date()
      },
      create: {
        userId: "local-user",
        questId: questId,
        code: code
      }
    });

    return NextResponse.json({ success: true, progress: updatedProgress });
  } catch (error) {
    console.error("Progress save error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
