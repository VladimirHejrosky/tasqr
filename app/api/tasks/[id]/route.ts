import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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
