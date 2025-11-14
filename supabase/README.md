# Comrades WiFi Backend

Supabase Edge Functions for authentication and user management.

## Setup Instructions

### 1. Install Supabase CLI

```powershell
# Install via npm
npm install -g supabase

# Or via Scoop (Windows package manager)
scoop install supabase
```

### 2. Link to Your Supabase Project

```powershell
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref
```

You can find your project reference in your Supabase dashboard URL:
`https://app.supabase.com/project/YOUR-PROJECT-REF`

### 3. Set Up Environment Variables

Create a `.env` file in the `supabase` directory:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Environment
ENVIRONMENT=development

# SMS Provider (Africa's Talking)
AFRICASTALKING_API_KEY=your-api-key
AFRICASTALKING_USERNAME=your-username
AFRICASTALKING_SENDER_ID=COMRADES

# Email Provider (Optional - for email OTPs)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

Get your Supabase keys from: **Project Settings > API**

### 4. Run Database Migrations

```powershell
# Navigate to the project directory
cd c:\Users\Colin\OneDrive\Documents\projects\comradesAP

# Run migrations
supabase db push
```

Or manually run the SQL in Supabase SQL Editor:
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and execute

### 5. Deploy Edge Functions

```powershell
# Deploy all functions
supabase functions deploy register-user
supabase functions deploy send-otp
supabase functions deploy verify-otp

# Or deploy all at once
supabase functions deploy
```

### 6. Set Function Secrets

```powershell
# Set environment variables for functions
supabase secrets set AFRICASTALKING_API_KEY=your-api-key
supabase secrets set AFRICASTALKING_USERNAME=your-username
supabase secrets set AFRICASTALKING_SENDER_ID=COMRADES
supabase secrets set SMTP_HOST=smtp.gmail.com
supabase secrets set SMTP_PORT=587
supabase secrets set SMTP_USER=your-email@gmail.com
supabase secrets set SMTP_PASSWORD=your-app-password
```

## Available Functions

### 1. Register User
**Endpoint:** `POST /register-user`

Registers a new user with email/phone validation.

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe",
  "phone": "+254712345678",
  "plan": "10 Mbps"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email and phone.",
  "userId": "uuid",
  "requiresVerification": true
}
```

### 2. Send OTP
**Endpoint:** `POST /send-otp`

Sends an OTP code via SMS or email.

```json
{
  "identifier": "+254712345678",
  "type": "phone_verification"
}
```

**Types:** `login`, `password_reset`, `email_verification`, `phone_verification`

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### 3. Verify OTP
**Endpoint:** `POST /verify-otp`

Verifies an OTP code.

```json
{
  "identifier": "+254712345678",
  "code": "123456",
  "type": "phone_verification"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "sessionToken": "jwt-token"
}
```

## Testing Locally

```powershell
# Start Supabase local development
supabase start

# Serve functions locally
supabase functions serve

# Test function
curl -X POST http://localhost:54321/functions/v1/register-user `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_ANON_KEY" `
  -d '{\"email\":\"test@example.com\",\"password\":\"Test123!\",\"fullName\":\"Test User\",\"phone\":\"+254712345678\",\"plan\":\"5 Mbps\"}'
```

## Frontend Integration

Update your Vue components to call these endpoints:

```javascript
// src/services/api.js
const SUPABASE_URL = 'https://your-project-ref.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'

export async function registerUser(userData) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/register-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(userData)
  })
  return response.json()
}

export async function sendOTP(identifier, type) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/send-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({ identifier, type })
  })
  return response.json()
}

export async function verifyOTP(identifier, code, type) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({ identifier, code, type })
  })
  return response.json()
}
```

## Database Tables

- **profiles**: User account information
- **otp_codes**: OTP verification codes
- **password_reset_tokens**: Password reset tokens
- **billing_history**: Payment records
- **data_usage**: Daily data usage tracking
- **support_tickets**: Customer support tickets

## Security Notes

- All tables have Row Level Security (RLS) enabled
- Users can only access their own data
- Service role key is required for Edge Functions
- Never expose service role key in frontend code
- Use anon key in frontend, service role in backend

## SMS Provider Setup (Africa's Talking)

1. Sign up at https://africastalking.com/
2. Get your API Key and Username
3. Buy credits for SMS sending
4. Add your sender ID (e.g., "COMRADES")
5. Set environment variables

## Troubleshooting

**Function not found:**
- Check function is deployed: `supabase functions list`
- Verify project is linked: `supabase projects list`

**Database errors:**
- Check migrations ran: `supabase db reset`
- Verify tables exist in SQL Editor

**OTP not sending:**
- Check Africa's Talking credentials
- Verify phone number format (+254...)
- Check credits balance

**CORS errors:**
- Edge Functions automatically handle CORS
- Check Authorization header is set correctly

## Next Steps

1. ✅ Create database schema
2. ⏳ Deploy Edge Functions to Supabase
3. ⏳ Set up SMS provider (Africa's Talking)
4. ⏳ Create frontend API service
5. ⏳ Integrate Auth.vue with backend
6. ⏳ Update Dashboard.vue to fetch real data
7. ⏳ Test registration flow end-to-end
