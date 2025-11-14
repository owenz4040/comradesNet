// Test Email Sending with Resend API
// Run with: node test-email.js

const SUPABASE_URL = 'https://higyzdmedyacpiupxecm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZ3l6ZG1lZHlhY3BpdXB4ZWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MDEyMDcsImV4cCI6MjA3NzM3NzIwN30.G0_dHr6xZ_VMby_EetdUMHXb24z1QEULmwy_P_oUgVY'

async function testEmailSending() {
  console.log('🧪 Testing Email Sending via Resend...\n')
  
  // Get test email from command line argument or use default
  const testEmail = process.argv[2] || 'owenzcolin@gmail.com'
  
  console.log(`📧 Sending test OTP to: ${testEmail}\n`)
  
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        email: testEmail,
        type: 'email_verification'
      })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ SUCCESS! Email sent via Resend\n')
      console.log('Response:', JSON.stringify(data, null, 2))
      console.log('\n📬 Check your inbox for the OTP code!')
      console.log('💡 Note: In production mode, OTP is NOT shown in response')
    } else {
      console.log('❌ FAILED to send email\n')
      console.log('Error:', JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.error('❌ Error testing email:', error.message)
  }
}

testEmailSending()
