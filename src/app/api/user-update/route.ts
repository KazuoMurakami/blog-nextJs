import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const { id, role } = await req.json();
  const users = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });
  return NextResponse.json(users, { status: 200 });
}
