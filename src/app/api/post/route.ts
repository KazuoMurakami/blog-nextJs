// app/api/posts/route.ts

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface schemaBody {
  title: string;
  content: string;
  authorId: string;
}

export async function POST(request: Request) {
  try {
    const body: schemaBody = await request.json();
    const { title, content, authorId } = body;

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: "Título e conteúdo são obrigatórios." },
        { status: 400 }
      );
    }

    console.log(body);

    await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (e) {
    console.error("Erro ao criar post:", e);
    return NextResponse.json(
      { error: "Erro ao criar o post." },
      { status: 500 }
    );
  }
}
