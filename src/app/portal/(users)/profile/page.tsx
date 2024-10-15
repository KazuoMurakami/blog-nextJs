"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Mail, MapPin } from "lucide-react";
import { Post } from "@prisma/client";
import { userRole } from "@/modules/auth/actions/auth-user";
import { Button } from "@/components/ui/button";

// Mock data for user and posts
const user = {
  name: "Jane Doe",
  username: "janedoe",
  email: "jane@example.com",
  location: "New York, USA",
  joinDate: "January 2022",
  avatar: "/placeholder.svg?height=100&width=100",
};

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPost] = useState<Post[] | null>(null); // Estado para armazenar o usuário
  // const [loading, setLoading] = useState(true); // Estado para o carregamento

  // useEffect para buscar os dados do usuário da API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await userRole();
        const response = await fetch(
          `http://localhost:3000/api/get-post?userId=${userId}`
        ); // URL para buscar o usuário
        const data = await response.json();
        setPost(data.userPost); // Salvando os dados no estado
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData(); // Chamando a função para buscar os dados
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 ">
          <Link href="/portal" className="hover:underline flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* User Info Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {user.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Joined {user.joinDate}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Posts and About */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <div className="space-y-4 mt-4">
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <Card key={post.id}>
                      <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{post.content.substring(0, 100)}...</p>
                        <Button variant="link" className="p-0 h-auto mt-2">
                          Read more
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No posts available.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Recusandae, voluptatum natus similique architecto distinctio
                    dolores reprehenderit, molestias, inventore aliquam
                    cupiditate doloremque eaque omnis alias aliquid. Excepturi,
                    rerum aperiam? Reprehenderit, voluptas!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 MyBlog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
