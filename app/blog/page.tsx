"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Search } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"
import Link from "next/link"
import { useState } from "react"

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTag, setSelectedTag] = useState("All")

  const categories = ["All", ...new Set(blogPosts.map((post) => post.category))]
  const allTags = ["All", ...new Set(blogPosts.flatMap((post) => post.tags))]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag)

    return matchesSearch && matchesCategory && matchesTag
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My journey through code, projects, and professional experiences. Sharing insights, lessons learned, and
            technical deep-dives.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "All" || selectedTag !== "All" || searchTerm) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchTerm && (
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  Search: {searchTerm}
                </Badge>
              )}
              {selectedCategory !== "All" && (
                <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                  Category: {selectedCategory}
                </Badge>
              )}
              {selectedTag !== "All" && (
                <Badge variant="outline" className="border-pink-500 text-pink-400">
                  Tag: {selectedTag}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setSelectedTag("All")
                }}
                className="text-gray-400 hover:text-white"
              >
                Clear All
              </Button>
            </div>
          )}
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Posts
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm h-full group hover:border-purple-500/50 transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="border-purple-500 text-purple-400">
                            {post.category}
                          </Badge>
                          <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                            Featured
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl text-white group-hover:text-purple-400 transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300 text-base">{post.excerpt}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="border-cyan-500/50 text-cyan-400">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 4 && (
                            <Badge variant="outline" className="border-gray-500/50 text-gray-400">
                              +{post.tags.length - 4}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {post.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                All Posts
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm h-full group hover:border-cyan-500/50 transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                            {post.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300 text-sm">{post.excerpt}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="border-purple-500/50 text-purple-400 text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="border-gray-500/50 text-gray-400 text-xs">
                              +{post.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No posts found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setSelectedTag("All")
              }}
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
