"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Star, GraduationCap, Code, Coffee, Heart } from "lucide-react"

export default function About() {
  const skills = [
    { name: "React.js", level: 90, color: "bg-blue-500" },
    { name: "Next.js", level: 85, color: "bg-gray-300" },
    { name: "Node.js", level: 80, color: "bg-green-500" },
    { name: "TypeScript", level: 75, color: "bg-blue-600" },
    { name: "MongoDB", level: 85, color: "bg-green-600" },
    { name: "Tailwind CSS", level: 90, color: "bg-cyan-500" },
    { name: "Express.js", level: 80, color: "bg-gray-600" },
    { name: "MySQL", level: 75, color: "bg-orange-500" },
  ]

  const languages = ["English", "Hindi", "Nepali", "Kannada"]

  const interests = [
    "AI & Machine Learning",
    "Web Development",
    "Open Source",
    "Tech Blogging",
    "Gaming",
    "Photography",
  ]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate Full Stack Developer with a love for creating innovative digital solutions and exploring the
            latest technologies.
          </p>
        </motion.div>

        {/* Personal Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-400">
                  <MapPin className="mr-2 h-5 w-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">86 Kashinagar Yellachenahalli</p>
                <p className="text-gray-300">Bangalore - 560078, India</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-400">
                  <Users className="mr-2 h-5 w-5" />
                  Clients Served
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">15+ Happy Clients</p>
                <p className="text-sm text-gray-400">Across various industries</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-pink-400">
                  <Star className="mr-2 h-5 w-5" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">2+ Years</p>
                <p className="text-sm text-gray-400">Professional Development</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <Card className="bg-gray-900 border-purple-500/30">
            <CardHeader className="bg-gradient-to-r from-purple-900/50 to-pink-900/50">
              <CardTitle className="text-2xl text-purple-400 flex items-center">
                <Heart className="mr-2 h-6 w-6" />
                My Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white text-lg leading-relaxed font-medium">
              <p>
                Hello! I'm Rahul Kumar Singh, a passionate Full Stack Developer based in Bangalore, India. My journey in
                technology began during my Computer Science studies at East West Institute of Technology, where I
                graduated with a 7.4 CGPA in 2024.
              </p>
              <p>
                Currently, I'm working as a Conversational AI intern at Avaamo.ai, where I've had the opportunity to
                work on cutting-edge AI chatbot platforms and develop innovative solutions like real-time Pokémon card
                games and flight booking systems. Simultaneously, I'm freelancing as a Full Stack Developer at Quantech,
                serving 15+ clients across diverse industries.
              </p>
              <p>
                What drives me is the endless possibility of creating digital experiences that make a difference.
                Whether it's building a galaxy-themed chat application with AI integration or developing virtual mouse
                applications using computer vision, I love pushing the boundaries of what's possible with code.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, writing about my development journey, or
                contributing to open-source projects. I believe in continuous learning and sharing knowledge with the
                developer community.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-300">{skill.name}</span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: 1.2 + index * 0.1 }}
                    className={`h-3 rounded-full ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education & Languages */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-400">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">B.E in Computer Science</h3>
                    <p className="text-gray-300">East West Institute of Technology</p>
                    <p className="text-sm text-gray-400">2020 - 2024 • CGPA: 7.4</p>
                    <p className="text-sm text-gray-400">Bangalore, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-400">
                  <Code className="mr-2 h-5 w-5" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <Badge key={language} variant="outline" className="border-cyan-500/50 text-cyan-400">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-pink-400">
                <Coffee className="mr-2 h-5 w-5" />
                Interests & Hobbies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                  >
                    <Badge variant="outline" className="border-pink-500/50 text-pink-400 text-sm py-1 px-3">
                      {interest}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
