// Supabase Edge Function: Verify OTP
// Deploy: supabase functions deploy verify-otp

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    const { email, phone, code, type } = await req.json()

    // Validate required fields
    if ((!email && !phone) || !code || !type) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          message: 'Email/phone, code, and type are required'
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

    // Find OTP record
    let query = supabase
      .from('otp_codes')
      .select('*')
      .eq('code', code)
      .eq('type', type)
      .eq('verified', false)
      .gte('expires_at', new Date().toISOString())

    if (email) {
      query = query.eq('email', email)
    } else if (phone) {
      query = query.eq('phone', phone)
    }

    const { data: otpRecord, error: otpError } = await query.single()

    if (otpError || !otpRecord) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid or expired OTP',
          message: 'The OTP code is invalid or has expired. Please request a new one.'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Mark OTP as verified
    const { error: updateError } = await supabase
      .from('otp_codes')
      .update({ 
        verified: true,
        verified_at: new Date().toISOString()
      })
      .eq('id', otpRecord.id)

    if (updateError) {
      console.error('Failed to mark OTP as verified:', updateError)
    }

    // Handle different OTP types
    let response = { success: true, message: 'OTP verified successfully' }

    switch (type) {
      case 'email_verification':
        // Update user's email as verified
        const { error: emailVerifyError } = await supabase.auth.admin.updateUserById(
          otpRecord.user_id,
          { email_confirm: true }
        )
        if (emailVerifyError) {
          console.error('Email verification error:', emailVerifyError)
        }
        response.message = 'Email verified successfully'
        break

      case 'phone_verification':
        // Update user's phone as verified
        const { error: phoneVerifyError } = await supabase
          .from('profiles')
          .update({ phone_verified: true })
          .eq('id', otpRecord.user_id)
        if (phoneVerifyError) {
          console.error('Phone verification error:', phoneVerifyError)
        }
        response.message = 'Phone verified successfully'
        break

      case 'password_reset':
        // Generate password reset token
        const resetToken = crypto.randomUUID()
        const { error: tokenError } = await supabase
          .from('password_reset_tokens')
          .insert({
            user_id: otpRecord.user_id,
            token: resetToken,
            expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes
          })
        
        if (tokenError) {
          console.error('Reset token error:', tokenError)
        }
        
        response = {
          success: true,
          message: 'OTP verified. You can now reset your password.',
          resetToken
        }
        break

      case 'login':
        // Generate session token for passwordless login
        const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
          type: 'magiclink',
          email: email || otpRecord.email
        })

        if (sessionError || !sessionData) {
          console.error('Session generation error:', sessionError)
          return new Response(
            JSON.stringify({ 
              error: 'Failed to create session',
              message: 'Could not generate login session'
            }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        response = {
          success: true,
          message: 'Login successful',
          session: {
            access_token: sessionData.properties?.action_link,
            user_id: otpRecord.user_id
          }
        }
        break
    }

    return new Response(
      JSON.stringify(response),
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
