import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const shoppingItemId = parseInt(id, 10);
  if (isNaN(shoppingItemId)) {
    return NextResponse.json(
      { error: "Invalid shopping item ID" },
      { status: 400 }
    );
  }
  try {
    await prisma.shoppingItem.delete({
      where: { id: shoppingItemId },
    });
    return NextResponse.json(
      { message: "Delete shopping item" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting shopping item" },
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
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const shoppingItemId = parseInt(id, 10);
  if (isNaN(shoppingItemId)) {
    return NextResponse.json(
      { error: "Invalid shopping item ID" },
      { status: 400 }
    );
  }
  const body = await req.json();
  const { checked } = body;

  try {
    await prisma.shoppingItem.update({
      where: { id: shoppingItemId },
      data: { checked },
    });
    return NextResponse.json(
      { message: "Update shopping item" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating shopping item" },
      { status: 500 }
    );
  }
}
