"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { userRole } from "@/modules/auth/actions/auth-user";
import { toast } from "@/hooks/use-toast";

export default function CreateNewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [authorId, setAuthorId] = useState<string | null>(null); // Adicionando estado para 'role'

  // useEffect para obter o role do usuário
  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await userRole();
      setAuthorId(role);
    };

    fetchUserRole();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fazendo a requisição para a API
      const response = await fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Especificando o tipo de conteúdo
        },
        body: JSON.stringify({
          title,
          content,
          authorId,
        }), // Serializando os dados como JSON
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o post");
      }

      toast({
        title: "Post saved",
        description: "Your blog post has been successfully saved.",
      });
      // Após criar o post, você pode redirecionar ou limpar o formulário
    } catch (error) {
      console.error("Erro na criação do post:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="#" className="text-2xl font-bold">
            MyBlog
          </Link>
          <Link href="/portal" className="hover:underline flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              required
              className="min-h-[200px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" /> Save Post
          </Button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 MyBlog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
