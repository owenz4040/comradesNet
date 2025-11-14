// Email utility for sending emails via Resend API
// This module handles email sending for the Comrades WiFi application

interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured')
      
      // Fallback: Log to console (for development)
      console.log('=== EMAIL (Dev Mode) ===')
      console.log('To:', options.to)
      console.log('Subject:', options.subject)
      console.log('Body:', options.text)
      console.log('========================')
      return true
    }

    // Use Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Comrades WiFi <noreply@colinowen.online>',
        to: [options.to],
        subject: options.subject,
        html: options.html || `<p>${options.text}</p>`,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Resend API error:', error)
      console.error('Response status:', response.status)
      return false
    }

    console.log('Email sent successfully to:', options.to)
    return true

  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}

export function generateOTPEmail(code: string, type: string): string {
  const typeText = {
    'email_verification': 'Email Verification',
    'phone_verification': 'Phone Verification',
    'password_reset': 'Password Reset',
    'login': 'Login Verification'
  }[type] || 'Verification'

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Comrades WiFi - ${typeText}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 40px 20px;
          line-height: 1.6;
        }
        
        .email-wrapper {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }
        
        .header {
          background: linear-gradient(135deg, #DC143C 0%, #B22222 50%, #0066CC 100%);
          padding: 50px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: subtle-pulse 4s ease-in-out infinite;
        }
        
        .header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #DC143C 0%, #0066CC 100%);
        }
        
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        .header h1 {
          color: #ffffff;
          font-size: 32px;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
        }
        
        .header p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          margin-top: 10px;
          font-weight: 500;
        }
        
        .content {
          padding: 50px 40px;
          background: #ffffff;
        }
        
        .greeting {
          font-size: 18px;
          color: #1A1A1A;
          margin-bottom: 20px;
          font-weight: 600;
        }
        
        .message {
          color: #4A5568;
          font-size: 16px;
          margin-bottom: 30px;
          line-height: 1.7;
        }
        
        .otp-container {
          background: linear-gradient(135deg, #FFF5F5 0%, #F0F7FF 100%);
          border-radius: 20px;
          padding: 45px 40px;
          text-align: center;
          margin: 35px 0;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(220, 20, 60, 0.1);
        }
        
        .otp-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #DC143C 0%, #0066CC 100%);
        }
        
        .otp-container::after {
          content: '';
          position: absolute;
          bottom: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(0, 102, 204, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }
        
        .otp-label {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #718096;
          font-weight: 800;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }
        
        .otp-code {
          font-size: 52px;
          font-weight: 900;
          background: linear-gradient(135deg, #DC143C 0%, #0066CC 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 14px;
          font-family: 'Courier New', Monaco, monospace;
          padding: 15px 0;
          display: inline-block;
          position: relative;
          z-index: 2;
          text-shadow: 0 4px 10px rgba(220, 20, 60, 0.2);
        }
        
        .otp-expiry {
          margin-top: 20px;
          font-size: 14px;
          color: #718096;
          font-weight: 700;
          position: relative;
          z-index: 2;
          background: #ffffff;
          display: inline-block;
          padding: 8px 20px;
          border-radius: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .info-box {
          background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
          border-left: 5px solid #0066CC;
          border-radius: 12px;
          padding: 30px;
          margin: 35px 0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          position: relative;
        }
        
        .info-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(180deg, #DC143C 0%, #0066CC 100%);
          border-radius: 12px 0 0 12px;
        }
        
        .info-title {
          font-size: 16px;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 15px;
        }
        
        .info-list {
          list-style: none;
          padding: 0;
        }
        
        .info-list li {
          color: #4A5568;
          font-size: 15px;
          margin-bottom: 10px;
          padding-left: 25px;
          position: relative;
        }
        
        .info-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #DC143C, #0066CC);
          border-radius: 50%;
        }
        
        .support-section {
          text-align: center;
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px solid #E2E8F0;
        }
        
        .support-text {
          color: #718096;
          font-size: 15px;
          margin-bottom: 15px;
        }
        
        .contact-info {
          display: inline-block;
          background: linear-gradient(135deg, #DC143C 0%, #0066CC 100%);
          color: #ffffff;
          padding: 12px 30px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          transition: transform 0.3s ease;
        }
        
        .footer {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: #E2E8F0;
          padding: 45px 40px;
          text-align: center;
          border-radius: 0 0 24px 24px;
          margin-top: 50px;
          box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        
        .footer-logo {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 18px;
          letter-spacing: 1px;
        }
        
        .footer-logo .comrades {
          background: linear-gradient(135deg, #DC143C, #FF0000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(220, 20, 60, 0.3);
        }
        
        .footer-logo .wifi {
          background: linear-gradient(135deg, #0066CC, #0080FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(0, 102, 204, 0.3);
        }
        
        .footer-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 15px;
          margin: 12px 0;
          font-weight: 500;
        }
        
        .footer-tagline {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 600;
          margin-top: 18px;
        }
        
        .divider {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, transparent, #DC143C, #0066CC, transparent);
          margin: 25px auto;
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(220, 20, 60, 0.4);
        }
        
        @media only screen and (max-width: 600px) {
          .email-wrapper {
            border-radius: 0;
          }
          
          .header {
            padding: 40px 30px;
          }
          
          .header h1 {
            font-size: 26px;
          }
          
          .content {
            padding: 40px 30px;
          }
          
          .otp-code {
            font-size: 36px;
            letter-spacing: 8px;
          }
          
          .otp-container {
            padding: 30px 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="header">
          <h1>Comrades WiFi</h1>
          <p>${typeText}</p>
        </div>
        
        <div class="content">
          <div class="greeting">Hello there,</div>
          
          <div class="message">
            Thank you for choosing Comrades WiFi. To complete your ${type === 'email_verification' ? 'email verification' : type === 'phone_verification' ? 'phone verification' : type === 'password_reset' ? 'password reset' : 'login'}, please use the verification code below:
          </div>
          
          <div class="otp-container">
            <div class="otp-label">Your Verification Code</div>
            <div class="otp-code">${code}</div>
            <div class="otp-expiry">Valid for 10 minutes</div>
          </div>
          
          <div class="info-box">
            <div class="info-title">Security Information</div>
            <ul class="info-list">
              <li>This code expires in 10 minutes from the time of request</li>
              <li>Never share this code with anyone, including Comrades WiFi staff</li>
              <li>If you didn't request this code, please ignore this email</li>
              <li>For security, this code can only be used once</li>
            </ul>
          </div>
          
          <div class="support-section">
            <div class="support-text">Need assistance? Our support team is here to help</div>
            <a href="mailto:support@comradeswifi.co.ke" class="contact-info">Contact Support</a>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-logo">
            <span class="comrades">Comrades</span> <span class="wifi">WiFi</span>
          </div>
          <div class="divider"></div>
          <div class="footer-text">&copy; 2025 Comrades WiFi. All rights reserved.</div>
          <div class="footer-tagline">Fast • Affordable • Reliable Internet</div>
          <div class="footer-text" style="margin-top: 15px;">Nairobi, Kenya</div>
        </div>
      </div>
    </body>
    </html>
  `
}
