"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  MessageSquare,
  Clock,
  CheckCircle,
  Building,
  Briefcase,
} from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        projectType: "",
        budget: "",
        timeline: "",
      })
    }, 5000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "rahul181002singh@gmail.com",
      description: "Best way to reach me",
      color: "text-purple-400",
      bgColor: "from-purple-500 to-pink-500",
      href: "mailto:rahul181002singh@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 7022244729",
      description: "Available 9 AM - 8 PM IST",
      color: "text-cyan-400",
      bgColor: "from-cyan-500 to-blue-500",
      href: "tel:+917022244729",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Bangalore, India",
      description: "Open to remote work",
      color: "text-pink-400",
      bgColor: "from-pink-500 to-purple-500",
      href: "#",
    },
  ]

  const projectTypes = [
    "Web Development",
    "Mobile App Development",
    "E-commerce Website",
    "Portfolio Website",
    "Business Website",
    "AI Integration",
    "Custom Software",
    "Consultation",
    "Other",
  ]

  const budgetRanges = [
    "Under $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
    "Let's discuss",
  ]

  const timelineOptions = ["ASAP", "Within 1 month", "1-3 months", "3-6 months", "6+ months", "Flexible"]

  const services = [
    {
      icon: Building,
      title: "Web Development",
      description: "Custom websites and web applications using modern technologies",
      features: ["React.js & Next.js", "Responsive Design", "SEO Optimization", "Performance Tuning"],
    },
    {
      icon: Briefcase,
      title: "Freelance Services",
      description: "Complete digital solutions for businesses of all sizes",
      features: ["15+ Happy Clients", "Google Ads Management", "Maintenance & Support", "Quick Turnaround"],
    },
    {
      icon: MessageSquare,
      title: "AI Integration",
      description: "Intelligent chatbots and AI-powered features for your applications",
      features: ["Conversational AI", "Custom Chatbots", "API Integration", "Enterprise Solutions"],
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
            Let's Work Together
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? I'm here to help you build amazing digital experiences. Let's discuss
            your project and create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-400 flex items-center">
                    <Send className="mr-2 h-6 w-6" />
                    Send Me a Message
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the form below and I'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
                      <p className="text-gray-300 mb-4">Thank you for reaching out. I'll get back to you soon!</p>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        Expected response: Within 24 hours
                      </Badge>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                            Project Type
                          </label>
                          <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          >
                            <option value="">Select project type</option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                            Budget Range
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>
                                {range}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                            Timeline
                          </label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          >
                            <option value="">Select timeline</option>
                            {timelineOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                            Subject *
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            placeholder="Project subject"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Project Details *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                          placeholder="Tell me about your project, goals, and any specific requirements..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Info & Services */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-400">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.href}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${info.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${info.color}`}>{info.title}</h3>
                        <p className="text-white font-medium">{info.value}</p>
                        <p className="text-gray-400 text-sm">{info.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-cyan-400">Services I Offer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {services.map((service, index) => (
                    <div key={service.title} className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <service.icon className="h-6 w-6 text-pink-400" />
                        <h3 className="font-semibold text-white">{service.title}</h3>
                      </div>
                      <p className="text-gray-300 text-sm">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="outline"
                            className="border-purple-500/50 text-purple-400 text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Quick Response</h3>
                  <p className="text-gray-300 text-sm">
                    I typically respond to messages within 24 hours. For urgent projects, feel free to call directly.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center space-x-4"
            >
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Rahulsingh1810"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Github className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/in/rahul-singh-0613842a7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "What's your typical project timeline?",
                answer:
                  "Project timelines vary based on complexity. Simple websites take 1-2 weeks, while complex applications can take 1-3 months. I'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "Do you provide ongoing support?",
                answer:
                  "Yes! I offer maintenance packages that include updates, security monitoring, and technical support. I believe in long-term partnerships with my clients.",
              },
              {
                question: "What technologies do you specialize in?",
                answer:
                  "I specialize in React.js, Next.js, Node.js, and modern web technologies. I also have experience with AI integration, mobile development, and cloud deployment.",
              },
              {
                question: "How do you handle project communication?",
                answer:
                  "I provide regular updates through your preferred communication channel (email, Slack, WhatsApp). You'll receive weekly progress reports and have direct access to me throughout the project.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-400">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
