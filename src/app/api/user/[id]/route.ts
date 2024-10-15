import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Função GET que busca o usuário pelo ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Tenta encontrar o usuário pelo ID passado na URL
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  // Se não encontrar o usuário, retorna um erro 404
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Se encontrar, retorna as informações do usuário
  return NextResponse.json(user);
}
