"use client";
import { useEffect, useState } from "react";

export default function PortalUserDetail({
  params,
}: {
  params: { id: string };
}) {
  // Estado para armazenar os detalhes do usuário
  const [userDetail, setUserDetail] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar os detalhes do usuário
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await fetch(`/api/user/${params.id}`);

        if (!response.ok) {
          throw new Error("Erro ao buscar detalhes do usuário");
        }

        const data = await response.json();
        setUserDetail(data);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [params.id]); // Dependência do id

  // Se estiver carregando, mostra uma mensagem
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não houver dados, mostra que o usuário não foi encontrado
  if (!userDetail) {
    return <div>Usuário não encontrado</div>;
  }

  // Exibe os detalhes do usuário quando os dados estiverem disponíveis
  return (
    <div>
      <h1>Detalhes do Usuário</h1>
      <p>Nome: {userDetail.name}</p>
      <p>Email: {userDetail.email}</p>
    </div>
  );
}
