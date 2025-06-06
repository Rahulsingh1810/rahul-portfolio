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
  const link = document.createElement('a');
  link.href = '/Rahul_Singh_Resume.pdf'; // Adjust this path based on your hosting setup
  link.download = 'Rahul_Kumar_Singh_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

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
