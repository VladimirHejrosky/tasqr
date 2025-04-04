import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";
import { ShoppingItem } from "@prisma/client";

type item = {
  temporaryId: number,
  name: string,
  checked: boolean,
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { shoppingItem: { orderBy: { updatedAt: "desc" } } },
  });

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data: ShoppingItem[] = user.shoppingItem

  return NextResponse.json( data , { status: 200 });
}

export async function POST(req: NextRequest) {
  const body: item = await req.json()
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.shoppingItem.create({
      data: {
        name: body.name,
        checked: body.checked,
        userId: user.id,}
    });

    return NextResponse.json({ body }, { status: 200 });

  } catch  {
    return NextResponse.json({ error: "Error creating shopping items" }, { status: 500 });
  }
}