// Supabase API Service
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// User Registration
export async function registerUser(userData) {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/register-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify(userData)
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

// Send OTP
export async function sendOTP(identifier, type = 'phone_verification') {
  try {
    // Determine if identifier is email or phone
    const isEmail = identifier.includes('@')
    const payload = {
      type,
      ...(isEmail ? { email: identifier } : { phone: identifier })
    }
    
    const response = await fetch(`${supabaseUrl}/functions/v1/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify(payload)
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Send OTP error:', error)
    throw error
  }
}

// Verify OTP
export async function verifyOTP(identifier, code, type = 'phone_verification') {
  try {
    // Determine if identifier is email or phone
    const isEmail = identifier.includes('@')
    const payload = {
      code,
      type,
      ...(isEmail ? { email: identifier } : { phone: identifier })
    }
    
    const response = await fetch(`${supabaseUrl}/functions/v1/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify(payload)
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Verify OTP error:', error)
    throw error
  }
}

// Get User Profile
export async function getUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Get profile error:', error)
    throw error
  }
}

// Update User Profile
export async function updateUserProfile(userId, updates) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

// Get Billing History
export async function getBillingHistory(userId) {
  try {
    const { data, error } = await supabase
      .from('billing_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Get billing history error:', error)
    throw error
  }
}

// Get Data Usage
export async function getDataUsage(userId, days = 30) {
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const { data, error } = await supabase
      .from('data_usage')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Get data usage error:', error)
    throw error
  }
}

// Create Support Ticket
export async function createSupportTicket(userId, ticketData) {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        user_id: userId,
        subject: ticketData.subject,
        message: ticketData.message,
        priority: ticketData.priority || 'medium'
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Create ticket error:', error)
    throw error
  }
}

// Get Support Tickets
export async function getSupportTickets(userId) {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Get tickets error:', error)
    throw error
  }
}

// Sign In with Email/Password
export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }
}

// Sign Out
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error('Sign out error:', error)
    throw error
  }
}

// Get Current Session
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Get session error:', error)
    throw error
  }
}

// Password Reset Request
export async function requestPasswordReset(email) {
  try {
    // First send OTP
    const otpResult = await sendOTP(email, 'password_reset')
    return otpResult
  } catch (error) {
    console.error('Password reset request error:', error)
    throw error
  }
}

// Reset Password with OTP
export async function resetPasswordWithOTP(email, otp, newPassword) {
  try {
    // Verify OTP first
    const verifyResult = await verifyOTP(email, otp, 'password_reset')
    
    if (!verifyResult.success) {
      throw new Error('Invalid or expired OTP')
    }
    
    // Update password
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })
    
    if (error) throw error
    return { success: true, message: 'Password reset successful' }
  } catch (error) {
    console.error('Password reset error:', error)
    throw error
  }
}

// Activity Logging Functions

// Log an activity
export async function logActivity(userId, activityType, title, description, metadata = null) {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .insert({
        user_id: userId,
        activity_type: activityType,
        title: title,
        description: description,
        metadata: metadata
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Log activity error:', error)
    // Don't throw error for activity logging - it's non-critical
    return null
  }
}

// Get recent activities
export async function getRecentActivities(userId, limit = 10) {
  try {
    const { data, error } = await supabase.rpc('get_recent_activities', {
      p_user_id: userId,
      p_limit: limit
    })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Get activities error:', error)
    // If RPC function doesn't exist, fallback to direct query
    try {
      const { data, error: fallbackError } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)
      
      if (fallbackError) throw fallbackError
      
      // Format time manually
      return (data || []).map(activity => {
        const now = new Date()
        const activityDate = new Date(activity.created_at)
        const diffMs = now - activityDate
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)
        
        let timeAgo
        if (diffMins < 1) timeAgo = 'Just now'
        else if (diffMins < 60) timeAgo = `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
        else if (diffHours < 24) timeAgo = `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
        else if (diffDays < 7) timeAgo = `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
        else timeAgo = activityDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        
        return {
          ...activity,
          time_ago: timeAgo
        }
      })
    } catch (fallbackError) {
      console.error('Fallback get activities error:', fallbackError)
      return []
    }
  }
}

// Log login activity
export async function logLogin(userId) {
  return logActivity(userId, 'login', 'Logged In', 'Successfully logged into your account')
}

// Log logout activity
export async function logLogout(userId) {
  return logActivity(userId, 'logout', 'Logged Out', 'Logged out of your account')
}

// Log payment activity
export async function logPayment(userId, amount, plan) {
  return logActivity(
    userId, 
    'payment', 
    'Payment Received', 
    `KSh ${amount.toLocaleString()} for ${plan} plan`,
    { amount, plan }
  )
}

// Log profile update activity
export async function logProfileUpdate(userId, changes) {
  const changesList = Object.keys(changes).join(', ')
  return logActivity(
    userId, 
    'profile_update', 
    'Profile Updated', 
    `Updated: ${changesList}`,
    changes
  )
}

// Log plan change activity
export async function logPlanChange(userId, oldPlan, newPlan) {
  return logActivity(
    userId, 
    'plan_change', 
    'Plan Changed', 
    `Upgraded from ${oldPlan} to ${newPlan}`,
    { old_plan: oldPlan, new_plan: newPlan }
  )
}
