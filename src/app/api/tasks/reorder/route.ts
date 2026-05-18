import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { TaskStatus } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { tasks } = body;

    await prisma.$transaction(
      tasks.map((task: { id: string; status: TaskStatus; order: number }) =>
        prisma.task.update({
          where: { id: task.id },
          data: { status: task.status, order: task.order },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reorder tasks" }, { status: 500 });
  }
}
