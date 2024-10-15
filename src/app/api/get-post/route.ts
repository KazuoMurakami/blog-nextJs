import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Pegando o `authorId` da URL (parâmetro de query)
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Author ID is required" },
      { status: 400 }
    );
  }

  const userPost = await prisma.post.findMany({
    where: {
      authorId: String(userId),
    },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });

  if (userPost.length === 0) {
    return NextResponse.json(
      { error: "No posts found for this user" },
      { status: 404 }
    );
  }

  return NextResponse.json({ userPost });
}
