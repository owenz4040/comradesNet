// Supabase Edge Function: Register User
// Deploy: supabase functions deploy register-user

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { sendEmail, generateOTPEmail } from '../_shared/email.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get request body
    const { email, password, fullName, phone, plan } = await req.json()

    // Validate required fields
    if (!email || !password || !fullName || !phone) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          message: 'Email, password, full name, and phone are required'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid email format',
          message: 'Please provide a valid email address'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate phone format (Kenyan format)
    const phoneRegex = /^(\+254|0)[17]\d{8}$/
    if (!phoneRegex.test(phone)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid phone format',
          message: 'Please provide a valid Kenyan phone number (e.g., +254712345678 or 0712345678)'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('email, phone')
      .or(`email.eq.${email},phone.eq.${phone}`)
      .single()

    if (existingUser) {
      return new Response(
        JSON.stringify({ 
          error: 'User already exists',
          message: 'An account with this email or phone number already exists'
        }),
        { 
          status: 409, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false, // Require email verification
      user_metadata: {
        full_name: fullName,
        phone: phone,
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ 
          error: 'Registration failed',
          message: authError.message
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        phone,
        plan: plan || '5 Mbps',
        balance: 0,
        data_used: 0,
        data_cap: 50,
        status: 'active',
        created_at: new Date().toISOString(),
      })

    if (profileError) {
      console.error('Profile error:', profileError)
      // Rollback: delete auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      
      return new Response(
        JSON.stringify({ 
          error: 'Profile creation failed',
          message: profileError.message
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate and send verification OTPs (separate for email and phone)
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString()
    const phoneOtp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Store Email OTP in database
    const { error: emailOtpError } = await supabase
      .from('otp_codes')
      .insert({
        user_id: authData.user.id,
        email,
        code: emailOtp,
        type: 'email_verification',
        expires_at: otpExpiry.toISOString(),
      })

    if (emailOtpError) {
      console.error('Email OTP error:', emailOtpError)
    }

    // Store Phone OTP in database
    const { error: phoneOtpError } = await supabase
      .from('otp_codes')
      .insert({
        user_id: authData.user.id,
        phone,
        code: phoneOtp,
        type: 'phone_verification',
        expires_at: otpExpiry.toISOString(),
      })

    if (phoneOtpError) {
      console.error('Phone OTP error:', phoneOtpError)
    }

    // Send Email OTP
    const emailSent = await sendEmail({
      to: email,
      subject: 'Verify Your Comrades WiFi Account',
      text: `Your verification code is: ${emailOtp}. This code expires in 10 minutes.`,
      html: generateOTPEmail(emailOtp, 'email_verification')
    })

    if (!emailSent) {
      console.error('Failed to send email OTP to:', email)
    } else {
      console.log('Email OTP sent successfully to:', email)
    }

    // TODO: Send Phone OTP via SMS (requires Africa's Talking integration)
    // For now, phone OTP is stored in database and can be sent later

    // Check environment for response handling
    const isDev = Deno.env.get('ENVIRONMENT') === 'development'

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'User registered successfully. Please check your email for the verification code.',
        userId: authData.user.id,
        requiresVerification: true,
        emailSent,
        ...(isDev && { emailOtp, phoneOtp }) // Only include OTPs in development
      }),
      { 
        status: 201, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
