import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Task } from "@prisma/client";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskId = parseInt(id, 10);
  if (isNaN(taskId)) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  try {
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      task: { where: {id: taskId} },
    },
  });

  if (!user || user.task.length === 0) {
    return NextResponse.json({ error: "Task not found or not owned by user" }, { status: 404 });
  }

  await prisma.task.delete({
    where: { id: taskId },
  });

  return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });

} catch (error) {
  return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
}
}

export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  const taskId = parseInt(id, 10)
  if (isNaN(taskId)){
    return NextResponse.json({error: "Invalid Task ID"}, {status: 400})
  }

  try {
    const user = await prisma.user.findUnique({
      where: {email: session.user.email},
      include: {
        task: {where: { id: taskId}}
      }
    })

    if (!user || user.task.length === 0) {
      return NextResponse.json({error: "Taks not found or not owned by user"}, {status: 404})
    }

    const currentTaskCompletion = user.task[0].done
    await prisma.task.update({
      where: { id: taskId },
      data: { done: !currentTaskCompletion }
    })

    return NextResponse.json({message: "Task updated succesfully"}, {status: 200})
  } catch (error) {
    return NextResponse.json({error: "Failed to edit task,"}, {status: 500})
  }
}

export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  const taskId = parseInt(id, 10)
  if (isNaN(taskId)){
    return NextResponse.json({error: "Invalid Task ID"}, {status: 400})
  }

  try {
    const user = await prisma.user.findUnique({
      where: {email: session.user.email},
      include: {
        task: { where: {id: taskId}}
      }
    })

    if (!user || user.task.length === 0) {
      return NextResponse.json({error: "Taks not found or not owned by user"}, {status: 404})
    }
    const task = user.task[0] || null

    return NextResponse.json(task, {status: 200})

  } catch (error) {
    return NextResponse.json({error: "Failed to get task,"}, {status: 500})
  }
}