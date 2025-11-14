# 🧪 Testing Guide - Email Verification

## 🔧 Development Mode Setup

Your app is now in **Development Mode** which means:
- ✅ OTP codes are returned in the API response
- ✅ OTP codes are displayed in browser alerts
- ✅ OTP codes are logged to console
- ✅ No actual emails are sent (simulated)

## 📱 How to Test Registration Flow

### Step 1: Start Dev Server
```powershell
npm run dev
```
Open: http://localhost:3002/ (or whatever port is shown)

### Step 2: Navigate to Auth Page
Click on "Get Started" or go to `/auth`

### Step 3: Fill Registration Form
- **First Name:** Test
- **Last Name:** User
- **Email:** any@email.com (doesn't need to be real)
- **Phone:** +254712345678 (Kenyan format)
- **Password:** TestPass123! (8+ characters)
- **Confirm Password:** TestPass123!
- ✅ Check "I agree to Terms & Conditions"

### Step 4: Submit Registration
Click "Create Account"

### Step 5: Get OTP Codes
You will see a popup alert with:
```
DEV MODE - Email OTP: 123456
Phone OTP: 654321
```

**Also check:**
- Browser Console (F12) - OTPs are logged there
- Supabase Dashboard - Logs show OTP generation

### Step 6: Verify Email
1. OTP Modal opens automatically
2. Make sure "Email OTP" tab is selected
3. Enter the Email OTP from the alert: `123456`
4. Click "Verify & Continue"

### Step 7: Verify Phone
1. Modal switches to "Phone OTP" tab (or you can click it)
2. Enter the Phone OTP from the alert: `654321`
3. Click "Verify & Continue"

### Step 8: Login
1. Account is verified!
2. You're redirected to login
3. Enter your email and password
4. Click "Login to Account"
5. Redirected to Dashboard!

## 🎯 Quick Test (Bypassing Verification)

If you want to test faster, you can verify in Supabase Dashboard:

1. Go to: https://supabase.com/dashboard/project/higyzdmedyacpiupxecm/auth
2. Find your user in the Auth users table
3. Click on the user
4. Manually verify email (if needed)

## 🔍 Debugging

### Check OTP Codes in Database
1. Go to: https://supabase.com/dashboard/project/higyzdmedyacpiupxecm/editor
2. Click on `otp_codes` table
3. See all generated OTP codes with timestamps

### Check User Profile
1. Go to Table Editor
2. Click on `profiles` table
3. See your user profile with plan, balance, etc.

### Check Edge Function Logs
1. Go to: https://supabase.com/dashboard/project/higyzdmedyacpiupxecm/functions
2. Click on `register-user` function
3. View logs to see registration attempts

### Browser Console Logs
Press `F12` and check Console tab for:
```
🔐 Development Mode - Email OTP: 123456
📱 Development Mode - Phone OTP: 654321
```

## 🚀 Testing Features

### Test Resend OTP
1. In OTP modal, wait 60 seconds or click "Resend Code"
2. New OTP will be generated
3. Alert will show new OTP code

### Test Wrong OTP
1. Enter wrong code like `000000`
2. You'll see error: "Invalid or expired OTP code"

### Test Expired OTP
1. Wait 10 minutes after registration
2. Try to verify - will show expired error

### Test Duplicate Registration
1. Try to register with same email again
2. Error: "Email already registered"

## ✅ Expected Behavior

### Successful Registration:
```
✅ Account created! Please verify your email and phone.
✅ [Alert] DEV MODE - Email OTP: 123456, Phone OTP: 654321
✅ OTP Modal appears
✅ Email verification succeeds
✅ Phone verification succeeds
✅ Redirected to login
✅ Can login with credentials
✅ Redirected to Dashboard
```

### Dashboard Should Show:
- Your name in welcome message
- Plan: "5 Mbps"
- Balance: KES 0.00
- Data Used: 0 GB
- Data usage chart
- Quick action buttons

## 📧 Production Email Setup (Later)

When ready for production, you'll need to:

1. **Sign up for email service:**
   - Resend (recommended, free tier): https://resend.com
   - SendGrid: https://sendgrid.com
   - Mailgun: https://mailgun.com

2. **Get API key and set secret:**
```powershell
npx supabase secrets set RESEND_API_KEY=your-api-key
npx supabase secrets set ENVIRONMENT=production
```

3. **Emails will be sent automatically!**

## 🎉 You're All Set!

Your authentication system is working! Test it thoroughly and let me know if you encounter any issues.

**Next Steps:**
- Test complete registration flow
- Check Dashboard loads your data
- Customize email templates
- Add SMS provider for phone OTP (optional)
