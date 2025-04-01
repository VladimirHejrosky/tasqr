import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";
import { ShoppingItem } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as "personal" | "family" | null;

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  //if status is family

  //if status is not family
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { shoppingItem: { orderBy: { updatedAt: "desc" } } },
  });

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // const data: ShoppingItem[] = user.shoppingItem

  // Simulated data
  const data = [
    { id: 1, name: "Mléko", checked: false },
    { id: 2, name: "Chleba", checked: false },
    { id: 3, name: "Šunka", checked: false },
    { id: 4, name: "Sýr", checked: false },
    { id: 5, name: "Jogurt", checked: false },
  ];

  return NextResponse.json({ data }, { status: 200 });
}
