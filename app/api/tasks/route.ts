import { NextRequest, NextResponse } from "next/server";
import { Repeat, Task } from "@prisma/client";
import { prisma } from "@/prisma/prisma";
  
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as "active" | "completed" | "repeated" | null;

  const where = () => {
    switch (status) {
      default:
    case "active":
      return { done: false };
    case "completed":
      return { done: true };
    case "repeated":
      return { repeat: { not: "none" as Repeat} };
  }
  }

  const tasks: Task[] = await prisma.task.findMany({
    where: where(),
    orderBy: [
      { priority: "desc" },
      { updatedAt: "desc" },
      { done: "asc" }
    ]
  })


  return NextResponse.json(tasks, { status: 200 });
}
