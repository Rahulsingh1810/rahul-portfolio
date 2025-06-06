"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter(
      (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))),
    )
    .slice(0, 3)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                    Featured
                  </Badge>
                )}
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="mr-1 h-3 w-3" />
                  {post.date}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="mr-1 h-3 w-3" />
                  {post.readTime}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-cyan-500/50 text-cyan-400">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Share Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.article>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="prose prose-invert prose-purple max-w-none">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "")
                      return !inline && match ? (
                        <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                    h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 text-purple-400">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 text-cyan-400">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-bold mb-3 text-pink-400">{children}</h3>,
                    p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                    ul: ({ children }) => (
                      <ul className="text-gray-300 mb-4 list-disc list-inside space-y-2">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="text-gray-300 mb-4 list-decimal list-inside space-y-2">{children}</ol>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-400 mb-4">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Related Posts
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm h-full group hover:border-cyan-500/50 transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6">
                        <Badge variant="outline" className="border-cyan-500 text-cyan-400 mb-3">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{relatedPost.excerpt}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="mr-1 h-3 w-3" />
                          {relatedPost.date}
                          <span className="mx-2">•</span>
                          <Clock className="mr-1 h-3 w-3" />
                          {relatedPost.readTime}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
