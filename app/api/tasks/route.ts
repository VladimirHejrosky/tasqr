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

  const filter = () => {
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
    where: {...filter(), userId:user.id},
    orderBy: [
      { priority: "desc" },
      { updatedAt: "desc" },
      { done: "asc" }
    ]
  })


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