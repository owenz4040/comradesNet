// Test User Registration with Email Sending
// Run with: node test-registration.js your-email@example.com

const SUPABASE_URL = 'https://higyzdmedyacpiupxecm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZ3l6ZG1lZHlhY3BpdXB4ZWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MDEyMDcsImV4cCI6MjA3NzM3NzIwN30.G0_dHr6xZ_VMby_EetdUMHXb24z1QEULmwy_P_oUgVY'

async function testRegistration() {
  console.log('🧪 Testing User Registration with Email OTP...\n')
  
  // Get test email from command line or use default
  const testEmail = process.argv[2] || `test${Date.now()}@example.com`
  const testPhone = `+254712${Math.floor(100000 + Math.random() * 900000)}`
  
  console.log(`📧 Email: ${testEmail}`)
  console.log(`📱 Phone: ${testPhone}\n`)
  
  const userData = {
    email: testEmail,
    password: 'TestPassword123!',
    fullName: 'Test User',
    phone: testPhone,
    plan: '10 Mbps'
  }
  
  try {
    console.log('⏳ Registering user...')
    
    const response = await fetch(`${SUPABASE_URL}/functions/v1/register-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(userData)
    })
    
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ SUCCESS! User registered\n')
      console.log('Response:', JSON.stringify(data, null, 2))
      
      if (data.emailSent) {
        console.log('\n📬 Email OTP sent via Resend!')
        console.log('💡 Check your inbox:', testEmail)
      } else {
        console.log('\n⚠️  Warning: Email was not sent')
      }
      
      if (data.emailOtp) {
        console.log('\n🔐 Dev Mode OTP:', data.emailOtp)
      }
    } else {
      console.log('❌ FAILED to register user\n')
      console.log('Error:', JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.error('❌ Error testing registration:', error.message)
  }
}

testRegistration()
