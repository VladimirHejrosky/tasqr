import { NextRequest, NextResponse } from "next/server";
import { Repeat, Task } from "@prisma/client";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
  
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as "active" | "completed" | "repeated" | null;
  
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filters = {
    active: {
      where: { userId: user.id, done: false },
      orderBy: [{ priority: "desc" as const }, { updatedAt: "desc" as const }],
      take: undefined
    },
    completed: {
      where: { userId: user.id, done: true },
      orderBy: [{ updatedAt: "desc" as const }],
      take: 10,
    },
    repeated: {
      where: { userId: user.id, repeat: { not: "none" as Repeat } },
      orderBy: [{ priority: "desc" as const }, { updatedAt: "desc" as const }],
      take: undefined
    },
    default: {
      where: { userId: user.id, done: false },
      orderBy: [{ priority: "desc" as const }, { updatedAt: "desc" as const }],
      take: undefined
    },
  };
  
  const { where, orderBy, take } = filters[status as keyof typeof filters] || filters.default;
  
  const tasks: Task[] = await prisma.task.findMany({
    where,
    orderBy,
    take,
  });
  return NextResponse.json(tasks, { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const {label, priority, repeat } = await req.json()
    const userId = user.id
    const newTask: Task = await prisma.task.create({
      data: {
        label,
        priority,
        repeat,
        userId
      }
    })
    return NextResponse.json(newTask, {status: 201})

  } catch (error) {
    return NextResponse.json({ message: "Chyba při vytváření úkolu" }, { status: 500 })
  }
}