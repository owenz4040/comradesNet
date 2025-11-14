// Supabase Edge Function: Send OTP
// Deploy: supabase functions deploy send-otp

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
    const { email, phone, type } = await req.json()

    // Validate required fields
    if (!email && !phone) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          message: 'Either email or phone is required'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate OTP type
    const validTypes = ['login', 'password_reset', 'email_verification', 'phone_verification']
    if (!type || !validTypes.includes(type)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid OTP type',
          message: `Type must be one of: ${validTypes.join(', ')}`
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

    // Find user by email or phone
    let userId = null
    if (email) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single()
      
      userId = profile?.id
    } else if (phone) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', phone)
        .single()
      
      userId = profile?.id
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ 
          error: 'User not found',
          message: 'No user found with the provided email or phone'
        }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check for recent OTP requests (rate limiting)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const { data: recentOTP } = await supabase
      .from('otp_codes')
      .select('created_at')
      .eq('user_id', userId)
      .eq('type', type)
      .gte('created_at', fiveMinutesAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (recentOTP) {
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests',
          message: 'Please wait 5 minutes before requesting a new OTP'
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Store OTP in database
    const { error: otpError } = await supabase
      .from('otp_codes')
      .insert({
        user_id: userId,
        email: email || null,
        phone: phone || null,
        code: otp,
        type: type,
        expires_at: otpExpiry.toISOString(),
        verified: false,
      })

    if (otpError) {
      console.error('OTP storage error:', otpError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to generate OTP',
          message: otpError.message
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Send OTP via SMS/Email
    const isDev = Deno.env.get('ENVIRONMENT') === 'development'
    let sendSuccess = false
    
    if (email) {
      // Send email with OTP
      console.log(`Sending OTP to email: ${email}`)
      const emailHtml = generateOTPEmail(otp, type)
      sendSuccess = await sendEmail({
        to: email,
        subject: `Your Comrades WiFi Verification Code: ${otp}`,
        text: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
        html: emailHtml
      })
      
      if (!sendSuccess) {
        console.error('Failed to send email OTP')
        // Continue anyway in dev mode
        if (!isDev) {
          return new Response(
            JSON.stringify({ 
              error: 'Failed to send OTP',
              message: 'Could not send verification email. Please try again.'
            }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }
      }
    }
    
    if (phone) {
      // Send SMS with OTP (Africa's Talking)
      console.log(`Sending OTP to phone: ${phone}`)
      
      // TODO: Integrate Africa's Talking SMS
      // For now, just log in development
      if (isDev) {
        console.log(`SMS OTP for ${phone}: ${otp}`)
        sendSuccess = true
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `OTP sent successfully to ${email ? 'your email' : 'your phone'}`,
        expiresIn: 600, // 10 minutes in seconds
        ...(isDev && { otp }) // Only include OTP in development
      }),
      { 
        status: 200, 
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
