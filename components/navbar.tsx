"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, Home, User, Code, BookOpen, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Code },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDownloadResume = () => {
    // Create a more comprehensive resume content for PDF generation
    const resumeContent = `
RAHUL KUMAR SINGH
Full Stack Developer

Contact Information:
Email: rahul181002singh@gmail.com
Phone: +917022244729
Location: 86 Kashinagar Yellachenahalli, Bangalore - 560078, India
LinkedIn: linkedin.com/in/rahul-singh-0613842a7
GitHub: github.com/Rahulsingh1810

PROFESSIONAL EXPERIENCE:

Conversational AI Intern | Avaamo.ai (February 2025 – May 2025)
• Designed and developed a real-time Pokémon card game using Vanilla JavaScript, HTML, and CSS
• Collaborated on Avaamo's AI chatbot building platform, creating a pizza ordering skill
• Built a fully functional web bot for flight bookings, rescheduling, and cancellations
• Led development of SSO-enabled timesheet application with Google Sheets integration

Full Stack Developer | Quantech (August 2024 – Present)
• Freelancing for 15+ clients for website development and Google Ads
• Clients include The Imperial Crest (investment firm), BeSpace (interior designer)
• Developed solutions for local tattoo studios and TV repair stores

TECHNICAL SKILLS:
• Frontend: React.js, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3, JavaScript
• Backend: Node.js, Express.js, Python
• Databases: MongoDB, MySQL
• Tools & Technologies: Git, Socket.io, OpenCV, MediaPipe, AI Integration
• Cloud & Deployment: Vercel, Netlify, AWS

PROJECTS:

Cosmic Talks
• Real-time chat application with AI integration and media sharing
• Technologies: React.js, Node.js, Socket.io, AI Integration, WebRTC

Cinewale
• Movie recommendation website using TMDB API with trailer viewing feature
• Technologies: React.js, TMDB API, Tailwind CSS, Responsive Design

AirCursor - Virtual Mouse
• Virtual mouse application using Python with computer vision
• Technologies: Python, OpenCV, Computer Vision, MediaPipe

EDUCATION:
B.E in Computer Science
East West Institute of Technology (2020-2024)
CGPA: 7.4

LANGUAGES:
English, Hindi, Nepali, Kannada
  `

    // Create a simple HTML structure for PDF conversion
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Rahul Kumar Singh - Resume</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #333; }
        h2 { color: #666; margin-top: 30px; }
        .contact { margin-bottom: 20px; }
        .section { margin-bottom: 25px; }
        ul { margin-left: 20px; }
      </style>
    </head>
    <body>
      <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${resumeContent}</pre>
    </body>
    </html>
  `

    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Rahul_Kumar_Singh_Resume.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/95 backdrop-blur-md border-b border-purple-500/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-0.5"
            >
              <img
                src="/images/rahul-profile.jpg"
                alt="Rahul Kumar Singh"
                className="w-full h-full rounded-full object-cover"
              />
            </motion.div>
            <span className="text-white font-bold text-xl hidden sm:block">Rahul Singh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-purple-600/20 text-purple-400"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </motion.div>
                </Link>
              )
            })}

            <Button
              onClick={handleDownloadResume}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Resume
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md border-b border-purple-500/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-purple-600/20 text-purple-400"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </motion.div>
                  </Link>
                )
              })}

              <Button
                onClick={() => {
                  handleDownloadResume()
                  setIsOpen(false)
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mt-4"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
