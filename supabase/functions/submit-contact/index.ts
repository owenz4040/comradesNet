// Supabase Edge Function for Contact Form Submission with Turnstile Verification
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const TURNSTILE_SECRET = "0x4AAAAAACM08Y82l7GuYyETyQHON4J7e8Q"
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  try {
    const body = await req.json()
    const { name, email, phone, location, plan, message } = body
    const turnstileToken = body['cf-turnstile-response']

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ error: 'Security check failed - no token provided' }),
        { 
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Verify with Cloudflare
    const formData = new URLSearchParams()
    formData.append('secret', TURNSTILE_SECRET)
    formData.append('response', turnstileToken)

    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      }
    )

    const verifyResult = await verifyResponse.json()

    if (!verifyResult.success) {
      console.error('Turnstile verification failed:', verifyResult)
      return new Response(
        JSON.stringify({ error: 'Bot detected - security verification failed' }),
        { 
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // ✅ Human verified - Store the contact form submission
    const submissionData = {
      name,
      email,
      phone,
      location: location || null,
      plan: plan || null,
      message,
      submitted_at: new Date().toISOString(),
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
    }

    // Store in Supabase (you'll need to create a 'contact_submissions' table)
    const storeResponse = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      body: JSON.stringify(submissionData),
    })

    if (!storeResponse.ok) {
      console.error('Failed to store submission:', await storeResponse.text())
      // Don't fail the request if storage fails - still send email notification
    }

    // Send email notification (using the email function)
    try {
      await fetch(`${SUPABASE_URL}/functions/v1/send-email-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        },
        body: JSON.stringify({
          to: 'support@comradeswifi.net',
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Location:</strong> ${location || 'Not provided'}</p>
            <p><strong>Interested In:</strong> ${plan || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
          `,
        }),
      })
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the request if email fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully! We will contact you soon.' 
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )

  } catch (error) {
    console.error('Error processing form:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})
