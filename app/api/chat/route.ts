import { type NextRequest, NextResponse } from "next/server"

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

const RAHUL_RESUME_DATA = `
RAHUL KUMAR SINGH - Full Stack Developer

Contact Information:
Email: rahul181002singh@gmail.com
Phone: +917022244729
Location: 86 Kashinagar Yellachenahalli, Bangalore - 560078, India
LinkedIn: linkedin.com/in/rahul-singh-0613842a7
GitHub: github.com/Rahulsingh1810

PROFESSIONAL EXPERIENCE:
• Conversational AI Intern at Avaamo.ai (February 2025 – May 2025)
  - Designed real-time Pokémon card game using Vanilla JavaScript, HTML, CSS
  - Collaborated on AI chatbot building platform, creating pizza ordering skill
  - Built functional web bot for flight bookings, rescheduling, cancellations
  - Led development of SSO-enabled timesheet application with Google Sheets integration

• Full Stack Developer at Quantech (August 2024 – Present)
  - Freelancing for 15+ clients for website development and Google Ads
  - Clients include The Imperial Crest (investment firm), BeSpace (interior designer)
  - Developed solutions for local tattoo studios and TV repair stores

TECHNICAL SKILLS:
• Frontend: React.js, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3, JavaScript
• Backend: Node.js, Express.js, Python
• Databases: MongoDB, MySQL
• Tools & Technologies: Git, Socket.io, OpenCV, MediaPipe, AI Integration
• Cloud & Deployment: Vercel, Netlify, AWS

KEY PROJECTS:
• Cosmic Talks - Real-time chat application with AI integration and media sharing
• Cinewale - Movie recommendation website using TMDB API with trailer viewing
• AirCursor - Virtual mouse application using Python with computer vision

EDUCATION:
B.E in Computer Science, East West Institute of Technology (2020-2024), CGPA: 7.4

LANGUAGES: English, Hindi, Nepali, Kannada
`

const PRICING_GUIDELINES = `
RAHUL'S DEVELOPMENT SERVICES PRICING (in Indian Rupees):

Basic Website (5-10 pages):
• Simple Business Website: ₹15,000 - ₹25,000
• Portfolio Website: ₹12,000 - ₹20,000
• Landing Page: ₹8,000 - ₹15,000

Advanced Websites:
• E-commerce Website: ₹35,000 - ₹75,000
• Custom Web Application: ₹50,000 - ₹1,50,000
• Enterprise Website: ₹75,000 - ₹2,00,000

Specialized Services:
• AI Integration: ₹25,000 - ₹60,000
• Mobile App Development: ₹40,000 - ₹1,20,000
• Custom Software: ₹60,000 - ₹2,50,000

Additional Services:
• Google Ads Management: ₹5,000/month
• Website Maintenance: ₹3,000 - ₹8,000/month
• SEO Optimization: ₹10,000 - ₹25,000

Timeline: 1-8 weeks depending on complexity
Payment: 50% advance, 50% on completion
`

export async function POST(request: NextRequest) {
  try {
    const { messages, userInfo } = await request.json()

    const systemPrompt = `You are Rahul's AI assistant helping visitors on his portfolio website. Your role is to:

1. COLLECT USER INFO FIRST: Always start by asking for name, email, and phone number before proceeding with any other conversation.

2. ANSWER QUESTIONS ABOUT RAHUL: Use this resume data to answer questions about Rahul Kumar Singh:
${RAHUL_RESUME_DATA}

3. PROJECT QUOTATIONS: When users ask about pricing or want quotes, use these guidelines:
${PRICING_GUIDELINES}

4. CONVERSATION FLOW:
   - Be friendly, professional, and helpful
   - Ask relevant follow-up questions about their project needs
   - Gather project requirements (type, features, timeline, budget range)
   - For complex pricing questions, say "Rahul will provide you with a detailed quotation based on your specific requirements"
   - Keep responses concise but informative

5. IMPORTANT RULES:
   - Always quote prices in Indian Rupees (₹)
   - If asked about pricing, provide ranges but mention Rahul will give exact quotes
   - Be conversational and engaging
   - Ask about project details to provide better estimates
   - Encourage users to share their contact details for follow-up

6. USER INFO COLLECTED: ${userInfo ? `Name: ${userInfo.name}, Email: ${userInfo.email}, Phone: ${userInfo.phone}` : "Not collected yet - ASK FOR IT FIRST"}

Remember: You represent Rahul Kumar Singh, so maintain his professional image while being approachable and helpful.`

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://rahul-portfolio.vercel.app",
        "X-Title": "Rahul Portfolio Chatbot",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json({
      message: data.choices[0].message.content,
      success: true,
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      {
        error: "Sorry, I encountered an error. Please try again or contact Rahul directly.",
        success: false,
      },
      { status: 500 },
    )
  }
}
