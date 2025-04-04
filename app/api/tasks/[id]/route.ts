import { prisma } from "@/prisma/prisma";
import { Repeat } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

interface patchData {
  label?: string;
  done?: boolean;
  repeat?: Repeat;
  priority?: number;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
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
        task: { where: { id: taskId } },
      },
    });

    if (!user || user.task.length === 0) {
      return NextResponse.json(
        { error: "Task not found or not owned by user" },
        { status: 404 }
      );
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const { label, repeat, priority, done }: patchData = await req.json();

  const updateData: patchData = {
    label,
    repeat,
    priority,
    done,
  };
  console.log(updateData);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskId = parseInt(id, 10);
  if (isNaN(taskId)) {
    return NextResponse.json({ error: "Invalid Task ID" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        task: { where: { id: taskId } },
      },
    });

    if (!user || user.task.length === 0) {
      return NextResponse.json(
        { error: "Taks not found or not owned by user" },
        { status: 404 }
      );
    }

    await prisma.task.update({
      where: { id: taskId },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Task updated succesfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to edit task," },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskId = parseInt(id, 10);
  if (isNaN(taskId)) {
    return NextResponse.json({ error: "Invalid Task ID" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        task: { where: { id: taskId } },
      },
    });

    if (!user || user.task.length === 0) {
      return NextResponse.json(
        { error: "Taks not found or not owned by user" },
        { status: 404 }
      );
    }
    const task = user.task[0] || null;

    return NextResponse.json(task, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to get task," }, { status: 500 });
  }
}
