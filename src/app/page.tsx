"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, UserPlus } from "lucide-react";

export default function ModernBlogLanding() {
  const [hoverBlog, setHoverBlog] = useState(false);
  const [hoverAccount, setHoverAccount] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-indigo-600">BlogKazuo</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Dive into a world of captivating stories, insightful articles, and
          vibrant discussions.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1"
        >
          <Link
            href="/portal"
            className={`group relative overflow-hidden rounded-lg bg-indigo-600 px-8 py-4 text-white shadow-lg transition-all duration-300 ease-out hover:bg-indigo-700 hover:shadow-xl flex items-center justify-center ${
              hoverBlog ? "ring-4 ring-indigo-300" : ""
            }`}
            onMouseEnter={() => setHoverBlog(true)}
            onMouseLeave={() => setHoverBlog(false)}
          >
            <span className="relative z-10 flex items-center text-lg font-semibold">
              <BookOpen className="mr-2 h-5 w-5" />
              Access the Blog
            </span>
            <motion.div
              className="absolute inset-0 z-0 bg-indigo-500"
              initial={false}
              animate={hoverBlog ? { scale: 1.5 } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1"
        >
          <Link
            href="/portal/cadastro"
            className={`group relative overflow-hidden rounded-lg bg-white px-8 py-4 text-indigo-600 shadow-lg transition-all duration-300 ease-out hover:text-indigo-700 hover:shadow-xl flex items-center justify-center ${
              hoverAccount ? "ring-4 ring-indigo-300" : ""
            }`}
            onMouseEnter={() => setHoverAccount(true)}
            onMouseLeave={() => setHoverAccount(false)}
          >
            <span className="relative z-10 flex items-center text-lg font-semibold">
              <UserPlus className="mr-2 h-5 w-5" />
              Create Account
            </span>
            <motion.div
              className="absolute inset-0 z-0 bg-gray-100"
              initial={false}
              animate={hoverAccount ? { scale: 1.5 } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
