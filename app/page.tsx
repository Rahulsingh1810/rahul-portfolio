"use client"

import { motion } from "framer-motion"
import {
  Code2,
  Database,
  Globe,
  Smartphone,
  Cpu,
  Zap,
  Github,
  Mail,
  Rocket,
  Brain,
  Coffee,
  Terminal,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

const FloatingIcon = ({
  icon: Icon,
  delay = 0,
  size = 24,
  className = "",
}: {
  icon: LucideIcon
  delay?: number
  size?: number
  className?: string
}) => {
  return (
    <motion.div
      className={`absolute text-purple-400/30 ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        x: [0, 50, -50, 0],
        y: [0, -30, 30, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <Icon size={size} />
    </motion.div>
  )
}

const BouncingIcon = ({
  icon: Icon,
  delay = 0,
  className = "",
}: {
  icon: LucideIcon
  delay?: number
  className?: string
}) => {
  return (
    <motion.div
      className={`absolute text-cyan-400/40 ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <Icon size={28} />
    </motion.div>
  )
}

const OrbitingIcon = ({
  icon: Icon,
  radius = 100,
  duration = 10,
  delay = 0,
}: {
  icon: LucideIcon
  radius?: number
  duration?: number
  delay?: number
}) => {
  return (
    <motion.div
      className="absolute text-pink-400/30"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: "50%",
        top: "50%",
        marginLeft: -radius,
        marginTop: -radius,
      }}
    >
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration,
          delay,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon size={24} />
      </motion.div>
    </motion.div>
  )
}

const TypewriterText = ({
  text,
  delay = 0,
}: {
  text: string
  delay?: number
}) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }
      },
      delay + currentIndex * 50, // Reduced from 100 to 50 for faster typing
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="text-purple-400"
      >
        |
      </motion.span>
    </span>
  )
}

export default function Home() {
  const featuredProjects = [
    {
      title: "Cosmic Talks",
      description: "Real-time chat application with AI integration and galaxy theme",
      tech: ["React.js", "Node.js", "Socket.io", "AI"],
      link: "/projects",
    },
    {
      title: "Cinewale",
      description: "Movie recommendation website using TMDB API",
      tech: ["React.js", "TMDB API", "Tailwind CSS"],
      link: "/projects",
    },
    {
      title: "AirCursor",
      description: "Virtual mouse application using Python and computer vision",
      tech: ["Python", "OpenCV", "Computer Vision"],
      link: "/projects",
    },
  ]

  const recentBlogs = [
    {
      title: "Building Cosmic Talks: My Journey with Real-time Chat and AI",
      excerpt: "How I created a galaxy-themed chat application with AI integration...",
      date: "Dec 15, 2024",
      slug: "building-cosmic-talks",
    },
    {
      title: "My Experience as a Conversational AI Intern at Avaamo",
      excerpt: "Insights from working on enterprise AI chatbot platforms...",
      date: "Dec 10, 2024",
      slug: "avaamo-internship-experience",
    },
    {
      title: "Freelancing Journey: 15+ Clients and Counting",
      excerpt: "Lessons learned from building websites for diverse industries...",
      date: "Dec 5, 2024",
      slug: "freelancing-journey",
    },
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Icons */}
          <FloatingIcon icon={Code2} delay={0} className="top-20 left-20" size={32} />
          <FloatingIcon icon={Database} delay={1} className="top-40 right-32" size={28} />
          <FloatingIcon icon={Globe} delay={2} className="bottom-40 left-16" size={30} />
          <FloatingIcon icon={Smartphone} delay={3} className="top-60 left-1/3" size={26} />
          <FloatingIcon icon={Cpu} delay={4} className="bottom-20 right-20" size={34} />
          <FloatingIcon icon={Zap} delay={5} className="top-32 right-16" size={24} />

          {/* Bouncing Icons */}
          <BouncingIcon icon={Rocket} delay={0} className="top-1/4 left-1/4" />
          <BouncingIcon icon={Brain} delay={1} className="top-3/4 right-1/4" />
          <BouncingIcon icon={Coffee} delay={2} className="bottom-1/3 left-1/2" />
          <BouncingIcon icon={Terminal} delay={3} className="top-1/2 right-1/3" />

          {/* Orbiting Icons */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <OrbitingIcon icon={Sparkles} radius={150} duration={15} delay={0} />
            <OrbitingIcon icon={Star} radius={200} duration={20} delay={2} />
            <OrbitingIcon icon={Zap} radius={120} duration={12} delay={4} />
          </div>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-1">
              <img
                src="/images/rahul-profile.jpg"
                alt="Rahul Kumar Singh"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
          >
            Rahul Kumar Singh
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-2xl md:text-3xl mb-8 text-gray-300"
          >
            <TypewriterText text="Full Stack Developer"  />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-400"
          >
            Crafting digital experiences with cutting-edge technologies. Specialized in React, Next.js, and AI
            integration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                <Github className="mr-2 h-4 w-4" />
                View Projects
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-purple-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300">Some of my recent work</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm h-full group hover:border-purple-500/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-400">{project.title}</CardTitle>
                    <CardDescription className="text-gray-300">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-cyan-500/50 text-cyan-400">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/projects">
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Latest Blog Posts
            </h2>
            <p className="text-xl text-gray-300">Insights from my development journey</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {recentBlogs.map((blog, index) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={`/blog/${blog.slug}`}>
                  <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm h-full group hover:border-cyan-500/50 transition-all duration-300 cursor-pointer">
                    <CardHeader>
                      <div className="text-sm text-cyan-400 mb-2">{blog.date}</div>
                      <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">
                        {blog.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">{blog.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/blog">
              <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                Read All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Ready to bring your ideas to life? Let's collaborate and create something extraordinary.
            </p>

            <div className="flex justify-center space-x-6">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Start a Project
                </Button>
              </Link>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Rahulsingh1810"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-purple-500 transition-all duration-200"
              >
                <Github className="mr-2 h-5 w-5" />
                Follow on GitHub
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
