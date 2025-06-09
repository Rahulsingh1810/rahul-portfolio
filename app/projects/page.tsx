"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star } from "lucide-react"

export default function Projects() {
  const personalProjects = [
    {
      title: "Cosmic Talks",
      description:
        "A real-time chat application with AI integration and media sharing based on a galaxy theme. Features include real-time messaging, AI-powered responses, cosmic UI design, and seamless media sharing capabilities.",
      longDescription:
        "Cosmic Talks represents my passion for combining cutting-edge technology with creative design. Built with React.js and Node.js, this application features real-time communication through Socket.io, AI integration for intelligent responses, and a stunning galaxy-themed interface that creates an immersive user experience.",
      tech: ["React.js", "Node.js", "Socket.io", "AI Integration", "WebRTC", "MongoDB"],
      image: "/cosmic_talks.png",
      github: "https://github.com/Rahulsingh1810/chat_app",
      demo: "https://chat-app-nine-rosy-94.vercel.app/",
      featured: true,
      category: "Web Application",
      status: "Completed",
      year: "2024",
    },
    {
      title: "Cinewale",
      description:
        "Movie recommendation website using TMDB API with trailer viewing feature. Fully responsive design with advanced filtering, search capabilities, and personalized recommendations.",
      longDescription:
        "Cinewale is a comprehensive movie discovery platform that leverages the TMDB API to provide users with detailed movie information, trailers, and personalized recommendations. The application features a modern, responsive design and advanced filtering options.",
      tech: ["React.js", "TMDB API", "Tailwind CSS", "JavaScript", "Responsive Design"],
      image: "/cinewale.png",
      github: "https://github.com/Rahulsingh1810/cinewale",
      demo: "https://cinewale.vercel.app/",
      featured: true,
      category: "Web Application",
      status: "Completed",
      year: "2024",
    },
    {
      title: "AirCursor - Virtual Mouse",
      description:
        "Virtual mouse application using Python with computer vision. Features virtual paint and virtual reps counter for exercise, enabling hands-free computer interaction.",
      longDescription:
        "AirCursor demonstrates the power of computer vision in creating intuitive human-computer interfaces. Using Python and OpenCV, this application tracks hand movements to control the mouse cursor, includes a virtual painting feature, and even counts exercise repetitions.",
      tech: ["Python", "OpenCV", "Computer Vision", "MediaPipe", "NumPy"],
      image: "/virtual_mouse.png",
      github: "https://github.com/Rahulsingh1810/aircursor",
      demo: "https://aircursor-demo.vercel.app/",
      featured: false,
      category: "Desktop Application",
      status: "Completed",
      year: "2024",
    },
  ]

  const freelanceProjects = [
    {
      title: "The Imperial Crest",
      description:
        "Investment firm website with modern design, portfolio management features, and client dashboard. Built with Next.js and integrated with financial APIs.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Financial APIs"],
      image: "/imperial_crest.png",
      category: "Investment Firm",
      year: "2024",
      link: "https://theimperial-2.vercel.app/"
    },
    {
      title: "BeSpace",
      description:
        "Interior designer portfolio with stunning visual galleries, project showcases, and client testimonials. Features responsive design and image optimization.",
      tech: ["React.js", "Framer Motion", "Image Optimization", "CMS"],
      image: "/bespace.png",
      category: "Interior Design",
      year: "2024",
      link: "https://www.bespace.in/"
    },
    {
      title: "Tattoo Studio Portfolio",
      description:
        "Local tattoo studio website with artist portfolios, booking system, and gallery showcase. Includes appointment scheduling and artist profiles.",
      tech: ["React.js", "Node.js", "Booking System", "Gallery"],
      image: "/tattoo_studio.png",
      category: "Creative Studio",
      year: "2024",
      link: "https://www.darkinktattoostudios.in/"
    },
    {
      title: "TV Repair Services",
      description:
        "Service-based website with booking system, repair tracking, and customer management. Features real-time status updates and service history.",
      tech: ["Next.js", "Database", "Tracking System", "CRM"],
      image: "/tv_services.png",
      category: "Service Business",
      year: "2024",
      link: "https://manju-tech.vercel.app/"
    },
    {
      title: "Ekatra Car Care",
      description:
        "Car care service website with booking system and service catalog.",
      tech: ["Next.js", "React", "Tailwind CSS", "Booking System"],
      image: "/ekatra_car_care.png",
      category: "Service Business",
      year: "2024",
      link: "https://ekatra-flax.vercel.app/"
    },
  ]

  const workProjects = [
    {
      title: "Pokémon Card Game",
      description:
        "Real-time Pokémon card game using Vanilla JavaScript, HTML, and CSS. Features advanced filtering, search functionalities, deck building, and bot battles.",
      tech: ["Vanilla JavaScript", "HTML5", "CSS3", "Game Logic", "Real-time"],
      company: "Avaamo.ai",
      year: "2025",
    },
    {
      title: "AI Chatbot Pizza Ordering",
      description:
        "Pizza ordering skill for Avaamo's AI chatbot platform, enhancing customer interaction and order processing efficiency with natural language processing.",
      tech: ["AI/ML", "NLP", "Chatbot Platform", "Order Management"],
      company: "Avaamo.ai",
      year: "2025",
    },
    {
      title: "Flight Booking Web Bot",
      description:
        "Fully functional web bot for managing flight bookings, rescheduling, and cancellations. Streamlines user experience and operational workflows.",
      tech: ["Web Automation", "API Integration", "Booking System", "Workflow"],
      company: "Avaamo.ai",
      year: "2025",
    },
    {
      title: "Avaamo Timesheet Application",
      description:
        "SSO-enabled timesheet application with Google Sheets integration for task assignment and real-time timelog management, actively used by Avaamo.",
      tech: ["SSO", "Google Sheets API", "Time Tracking", "Task Management"],
      company: "Avaamo.ai",
      year: "2025",
    },
  ]

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
            My Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of my work spanning personal projects, professional experience, and freelance collaborations
          </p>
        </motion.div>

        {/* Freelance Projects */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Freelance Portfolio
            </h2>
            <p className="text-gray-300">Client projects across various industries - 15+ successful collaborations</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelanceProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm h-full group hover:border-pink-500/50 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="border-pink-500 text-pink-400">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-pink-400">{project.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-sm">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="border-purple-500/50 text-purple-400 text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="outline" className="border-gray-500/50 text-gray-400 text-xs">
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{project.year}</span>
                      <span className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-400" />
                        Client Project
                      </span>
                    </div>
                    {project.link && (
                      <div className="mt-4">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Site
                          </Button>
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Work Projects */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Professional Work
            </h2>
            <p className="text-gray-300">Projects developed during my professional experience</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {workProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/30 border-cyan-500/20 backdrop-blur-sm h-full group hover:border-cyan-500/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                        {project.company}
                      </Badge>
                      <Badge variant="outline" className="border-gray-500 text-gray-400">
                        {project.year}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-cyan-400">{project.title}</CardTitle>
                    <CardDescription className="text-gray-300">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-blue-500/50 text-blue-400">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Personal Projects */}
        <section>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Personal Projects
            </h2>
            <p className="text-gray-300">Passion projects that showcase my creativity and technical skills</p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8">
            {personalProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={project.featured ? "lg:col-span-2" : ""}
              >
                <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm h-full group hover:border-purple-500/50 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="border-purple-500 text-purple-400">
                        {project.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                        {project.year}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl text-purple-400 mb-2">{project.title}</CardTitle>
                        <CardDescription className="text-gray-300 text-base">
                          {project.featured ? project.longDescription : project.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-cyan-500/50 text-cyan-400">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Button>
                      </a>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 py-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Project Statistics
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">20+</div>
                <div className="text-gray-300">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">15+</div>
                <div className="text-gray-300">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400 mb-2">8</div>
                <div className="text-gray-300">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">2+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}