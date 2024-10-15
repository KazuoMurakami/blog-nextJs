"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  // Carrega os usuários da API
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  // Função para atualizar o role do usuário
  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/user-update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, role: newRole }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        // Atualiza a lista de usuários com o novo role
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: updatedUser.role } : user
          )
        );
      } else {
        console.error("Erro ao atualizar o role do usuário");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} / {user.email} /{" "}
          <select
            value={user.role}
            onChange={(e) => updateUserRole(user.id, e.target.value)}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </li>
      ))}
    </ul>
  );
}
