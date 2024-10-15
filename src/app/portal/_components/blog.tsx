import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import Image from "next/image";
import AuthService from "@/modules/auth/services/auth-service";
import HamburgerMenu from "./button-hambuguer";

export default async function BlogPage() {
  const session = await AuthService.isSessionValid(); // Pega os dados da sessão

  const userName =
    session && typeof session.name === "string" ? session.name : "Guest"; // Verifica se o nome existe

  const role = session && typeof session.role === "string" ? session.role : " ";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {userName} / {role}
          </h1>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/portal/new-post" className="hover:underline">
                Create Post
              </Link>
            </li>
            <li>
              <HamburgerMenu />
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="prose prose-lg mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
          <p className="text-muted-foreground mb-4">
            Published on October 10, 2024
          </p>
          <Image
            src="https://picsum.photos/400/800"
            width={800}
            height={400}
            alt="Blog post cover image"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <h2 className="text-2xl font-bold mt-6 mb-4">
            Exploring the Topic Further
          </h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <ul>
            <li>Point one about the topic</li>
            <li>Another important aspect to consider</li>
            <li>Final thoughts on the subject</li>
          </ul>
        </article>
      </main>

      {/* Newsletter Signup */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-6">
              Stay updated with our latest blog posts and news.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button type="submit">
                <Mail className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 MyBlog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
