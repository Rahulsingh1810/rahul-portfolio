"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Phone,
  Mail,
  Loader2,
  CheckCircle,
  AlertCircle,
  StopCircle,
} from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface UserInfo {
  name: string
  email: string
  phone: string
}

interface ProjectDetails {
  type: string
  budget: string
  timeline: string
  requirements: string
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    type: "",
    budget: "",
    timeline: "",
    requirements: "",
  })
  const [conversationStage, setConversationStage] = useState<"info-collection" | "conversation" | "completed">(
    "info-collection"
  )
  const [conversationEnded, setConversationEnded] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0 && !conversationEnded) {
      const welcomeMessage: Message = {
        role: "assistant",
        content:
          "👋 Hi! I'm Rahul's AI assistant. I'm here to help you learn about Rahul's services and provide project quotations.\n\nTo get started, I'll need some basic information:\n\n📝 Could you please share your:\n• Full Name\n• Email Address\n• Phone Number\n\nThis will help me provide you with personalized assistance and send your inquiry directly to Rahul's email!",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, conversationEnded])

  const extractUserInfo = (message: string): Partial<UserInfo> | null => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
    const phoneRegex = /(\+91|91)?[\s-]?[6-9]\d{9}/
    const nameRegex = /(?:name|i'm|i am|my name is)\s+([a-zA-Z\s]+)/i

    const email = message.match(emailRegex)?.[0]
    const phone = message.match(phoneRegex)?.[0]
    const nameMatch = message.match(nameRegex)?.[1]

    if (email || phone || nameMatch) {
      return {
        ...(nameMatch && { name: nameMatch.trim() }),
        ...(email && { email }),
        ...(phone && { phone }),
      }
    }
    return null
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || conversationEnded) return

    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      if (conversationStage === "info-collection") {
        const extractedInfo = extractUserInfo(inputMessage)
        if (extractedInfo) {
          setUserInfo((prev) => ({ ...prev, ...extractedInfo }) as UserInfo)
        }

        const currentInfo = { ...userInfo, ...extractedInfo }
        if (currentInfo.name && currentInfo.email && currentInfo.phone) {
          setConversationStage("conversation")
        }
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          userInfo,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        throw new Error(data.error || "Failed to get response")
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I apologize, but I'm having trouble responding right now. Please try again or contact Rahul directly at +91 7022244729.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const endConversation = async (setState = true) => {
    if (conversationEnded || emailSent) return

    if (setState) {
      setIsLoading(true)
      setConversationEnded(true)
    }

    try {
      if (setState) {
        const endingMessage: Message = {
          role: "assistant",
          content:
            "Thank you for your interest! I'm now sending your conversation details to Rahul via email. He'll review your requirements and get back to you soon.\n\n✅ What happens next:\n• Rahul receives your conversation via email\n• He'll contact you within 2-4 hours\n• You'll receive a detailed project proposal\n\nThank you for choosing Rahul's services! 🚀",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, endingMessage])
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: messages,
          userInfo,
          projectDetails,
        }),
      })

      const data = await response.json()

      if (data.success) {
        if (setState) {
          setEmailSent(true)
          const successMessage: Message = {
            role: "assistant",
            content:
              "✅ Perfect! Your conversation has been successfully sent to Rahul's email. He has been notified and will contact you soon.\n\nFeel free to close this chat window. Thank you! 😊",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, successMessage])
        }
      } else {
        throw new Error(data.error || "Failed to send email")
      }
    } catch (error) {
      console.error("Error ending conversation:", error)
      if (setState) {
        const errorMessage: Message = {
          role: "assistant",
          content:
            "I had trouble sending your details to Rahul. Please contact him directly at rahul181002singh@gmail.com or +91 7022244729.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } finally {
      if (setState) setIsLoading(false)
    }
  }

  const handleChatboxClose = async () => {
    if (!conversationEnded && messages.some((msg) => msg.role === "user")) {
      await endConversation(false)
    }
    setIsOpen(false)
  }

  const handleChatboxClick = () => {
    setIsOpen((prev) => !prev)
  }

  const resetConversation = () => {
    setMessages([])
    setInputMessage("")
    setUserInfo(null)
    setProjectDetails({ type: "", budget: "", timeline: "", requirements: "" })
    setConversationStage("info-collection")
    setConversationEnded(false)
    setEmailSent(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button
          onClick={handleChatboxClick}
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white text-xs font-bold">AI</span>
        </motion.div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm sm:max-w-md md:max-w-lg h-[70vh] max-h-[600px]"
          >
            <Card className="h-full flex flex-col bg-gray-900/95 border-purple-500/30 backdrop-blur-lg shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">Rahul's AI Assistant</CardTitle>
                      <p className="text-sm text-purple-100">
                        {conversationEnded
                          ? emailSent
                            ? "Email Sent ✅"
                            : "Ending..."
                          : conversationStage === "info-collection"
                          ? "Collecting Info"
                          : "Online"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleChatboxClose}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages Container */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[85%] ${
                        message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === "user" ? "bg-purple-600" : "bg-gradient-to-r from-cyan-500 to-blue-500"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 shadow-sm ${
                          message.role === "user"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-800 text-gray-100 border border-gray-700"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                          <span className="text-sm text-gray-300">
                            {conversationEnded ? "Sending to Rahul..." : "Typing..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* User Info Display */}
              {userInfo && (
                <div className="px-4 py-2 bg-gray-800/50 border-t border-gray-700 flex-shrink-0">
                  <div className="flex flex-wrap gap-2">
                    {userInfo.name && (
                      <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                        <User className="h-3 w-3 mr-1" />
                        {userInfo.name}
                      </Badge>
                    )}
                    {userInfo.email && (
                      <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                        <Mail className="h-3 w-3 mr-1" />
                        Email ✓
                      </Badge>
                    )}
                    {userInfo.phone && (
                      <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        Phone ✓
                      </Badge>
                    )}
                    {emailSent && (
                      <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Sent to Rahul
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-gray-700 flex-shrink-0 space-y-3">
                {!conversationEnded && messages.some((msg) => msg.role === "user") && (
                  <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start space-x-2 mb-3">
                      <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-200">
                        Please end the conversation so Rahul can receive your enquiries and connect with you
                      </p>
                    </div>
                    <Button
                      onClick={() => endConversation(true)}
                      size="sm"
                      className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending to Rahul...
                        </>
                      ) : (
                        <>
                          <StopCircle className="h-4 w-4 mr-2" />
                          End Conversation & Send to Rahul
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {conversationEnded && emailSent && (
                  <Button
                    onClick={resetConversation}
                    size="sm"
                    variant="outline"
                    className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10 transition-colors"
                  >
                    Start New Conversation
                  </Button>
                )}

                {!conversationEnded && (
                  <div className="flex space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        conversationStage === "info-collection"
                          ? "Please share your name, email, and phone..."
                          : "Ask me about Rahul's services..."
                      }
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={isLoading || !inputMessage.trim()}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}