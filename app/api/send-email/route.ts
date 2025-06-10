import { type NextRequest, NextResponse } from "next/server"

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY 
const SENDGRID_URL = "https://api.sendgrid.com/v3/mail/send"

export async function POST(request: NextRequest) {
  try {
    const { conversation, userInfo, projectDetails } = await request.json()

    console.log("Attempting to send email with data:", {
      userInfo,
      conversationLength: conversation?.length,
      projectDetails,
    })

    // Format the conversation for email
    const conversationHTML = conversation
      .map((msg: any, index: number) => {
        const role = msg.role === "user" ? "👤 Visitor" : "🤖 AI Assistant"
        const timestamp = new Date(msg.timestamp).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "short",
          timeStyle: "short",
        })
        const bgColor = msg.role === "user" ? "#7C3AED" : "#1F2937"
        const textColor = "#FFFFFF"

        return `
          <div style="margin-bottom: 15px; padding: 12px; border-radius: 8px; background-color: ${bgColor}; color: ${textColor};">
            <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">
              ${role} <span style="font-weight: normal; font-size: 12px; opacity: 0.8;">[${timestamp}]</span>
            </div>
            <div style="line-height: 1.5; white-space: pre-wrap;">${msg.content}</div>
          </div>
        `
      })
      .join("")

    const conversationText = conversation
      .map((msg: any, index: number) => {
        const role = msg.role === "user" ? "Visitor" : "AI Assistant"
        const timestamp = new Date(msg.timestamp).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })
        return `[${timestamp}] ${role}: ${msg.content}`
      })
      .join("\n\n")

    // Create HTML email content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead from AI Chatbot</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #7C3AED, #EC4899); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 28px;">🚀 New Lead from AI Chatbot</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Portfolio Website Inquiry</p>
    </div>

    <!-- Visitor Information -->
    <div style="background-color: #F3F4F6; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #7C3AED; margin-top: 0; font-size: 20px; border-bottom: 2px solid #7C3AED; padding-bottom: 10px;">👤 Visitor Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 8px 0;">${userInfo?.name || "Not provided"}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${userInfo?.email || ""}" style="color: #7C3AED; text-decoration: none;">${userInfo?.email || "Not provided"}</a></td>
            </tr>
            <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${userInfo?.phone || ""}" style="color: #7C3AED; text-decoration: none;">${userInfo?.phone || "Not provided"}</a></td>
            </tr>
        </table>
    </div>

    <!-- Project Interest -->
    <div style="background-color: #EFF6FF; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #1E40AF; margin-top: 0; font-size: 20px; border-bottom: 2px solid #1E40AF; padding-bottom: 10px;">💼 Project Interest</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 120px;">Type:</td>
                <td style="padding: 8px 0;">${projectDetails?.type || "General inquiry"}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; font-weight: bold;">Budget:</td>
                <td style="padding: 8px 0;">${projectDetails?.budget || "Not specified"}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; font-weight: bold;">Timeline:</td>
                <td style="padding: 8px 0;">${projectDetails?.timeline || "Not specified"}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; font-weight: bold;">Requirements:</td>
                <td style="padding: 8px 0;">${projectDetails?.requirements || "See conversation below"}</td>
            </tr>
        </table>
    </div>

    <!-- Conversation -->
    <div style="background-color: #FAFAFA; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #059669; margin-top: 0; font-size: 20px; border-bottom: 2px solid #059669; padding-bottom: 10px;">💬 Complete Conversation</h2>
        <div style="max-height: 500px; overflow-y: auto; padding: 10px; background-color: #FFFFFF; border-radius: 8px; border: 1px solid #E5E7EB;">
            ${conversationHTML}
        </div>
    </div>

    <!-- Lead Summary -->
    <div style="background-color: #FEF3C7; padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #F59E0B;">
        <h2 style="color: #D97706; margin-top: 0; font-size: 20px;">📊 Lead Summary</h2>
        <ul style="margin: 0; padding-left: 20px;">
            <li><strong>Lead Quality:</strong> ${userInfo?.name && userInfo?.email && userInfo?.phone ? "High (Complete contact info)" : "Medium (Incomplete contact info)"}</li>
            <li><strong>Conversation Length:</strong> ${conversation.length} messages</li>
            <li><strong>Generated:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</li>
            <li><strong>Source:</strong> Portfolio AI Chatbot</li>
        </ul>
    </div>

    <!-- Action Required -->
    <div style="background-color: #FEE2E2; padding: 25px; border-radius: 10px; text-align: center; border: 2px solid #EF4444;">
        <h2 style="color: #DC2626; margin-top: 0; font-size: 20px;">⚡ Action Required</h2>
        <p style="margin: 15px 0; font-size: 16px; color: #7F1D1D;">
            <strong>Follow up with this lead within 2-4 hours for best conversion rates!</strong>
        </p>
        <div style="margin-top: 20px;">
            <a href="mailto:${userInfo?.email || ""}" style="display: inline-block; background-color: #7C3AED; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: bold;">📧 Reply via Email</a>
            <a href="tel:${userInfo?.phone || ""}" style="display: inline-block; background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: bold;">📞 Call Now</a>
        </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px; padding: 20px; color: #6B7280; font-size: 14px; border-top: 1px solid #E5E7EB;">
        <p>This email was automatically generated from your Portfolio AI Chatbot</p>
        <p>Rahul Kumar Singh | Full Stack Developer | +91 7022244729</p>
    </div>

</body>
</html>
    `

    // Create plain text version
    const textContent = `
NEW LEAD FROM AI CHATBOT

Visitor Information:
Name: ${userInfo?.name || "Not provided"}
Email: ${userInfo?.email || "Not provided"}
Phone: ${userInfo?.phone || "Not provided"}

Project Interest:
Type: ${projectDetails?.type || "General inquiry"}
Budget: ${projectDetails?.budget || "Not specified"}
Timeline: ${projectDetails?.timeline || "Not specified"}
Requirements: ${projectDetails?.requirements || "See conversation below"}

Complete Conversation:
${conversationText}

Lead Summary:
- Lead Quality: ${userInfo?.name && userInfo?.email && userInfo?.phone ? "High (Complete contact info)" : "Medium (Incomplete contact info)"}
- Conversation Length: ${conversation.length} messages
- Generated: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
- Source: Portfolio AI Chatbot

ACTION REQUIRED: Follow up within 2-4 hours for best conversion rates!

---
Auto-generated from Portfolio AI Chatbot
Rahul Kumar Singh | Full Stack Developer | +91 7022244729
    `

    // Send email via SendGrid using your verified sender
    const emailData = {
      personalizations: [
        {
          to: [
            {
              email: "rahul181002singh@gmail.com",
              name: "Rahul Kumar Singh",
            },
          ],
          subject: `🚨 New Lead: ${userInfo?.name || "Anonymous"} - ${projectDetails?.type || "General Inquiry"}`,
        },
      ],
      from: {
        email: "nodemailerrahul@gmail.com",
        name: "Portfolio AI Chatbot",
      },
      reply_to: {
        email: userInfo?.email || "nodemailerrahul@gmail.com",
        name: userInfo?.name || "Website Visitor",
      },
      content: [
        {
          type: "text/plain",
          value: textContent,
        },
        {
          type: "text/html",
          value: htmlContent,
        },
      ],
      categories: ["portfolio-lead", "ai-chatbot"],
      custom_args: {
        lead_source: "ai_chatbot",
        visitor_name: userInfo?.name || "anonymous",
        conversation_length: conversation.length.toString(),
      },
    }

    console.log("Sending email with verified sender:", {
      from: "nodemailerrahul@gmail.com",
      to: "rahul181002singh@gmail.com",
      subject: emailData.personalizations[0].subject,
    })

    const response = await fetch(SENDGRID_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })

    const responseText = await response.text()
    console.log("SendGrid Response Status:", response.status)
    console.log("SendGrid Response:", responseText)

    if (!response.ok) {
      console.error("SendGrid Error Details:", {
        status: response.status,
        statusText: response.statusText,
        response: responseText,
      })
      throw new Error(`SendGrid API error: ${response.status} - ${responseText}`)
    }

    console.log("Email sent successfully!")

    return NextResponse.json({
      success: true,
      message: "Conversation sent successfully to Rahul's email",
      emailSent: true,
      timestamp: new Date().toISOString(),
      debug: {
        sendgridStatus: response.status,
        emailFrom: "nodemailerrahul@gmail.com",
        emailTo: "rahul181002singh@gmail.com",
        subject: emailData.personalizations[0].subject,
      },
    })
  } catch (error) {
    console.error("Send email error:", error)
    return NextResponse.json(
      {
        error: "Failed to send conversation via email",
        success: false,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
