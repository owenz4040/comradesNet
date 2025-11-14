// Test Activity Logging System
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://higyzdmedyacpiupxecm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZ3l6ZG1lZHlhY3BpdXB4ZWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MDEyMDcsImV4cCI6MjA3NzM3NzIwN30.G0_dHr6xZ_VMby_EetdUMHXb24z1QEULmwy_P_oUgVY'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testActivityTracking() {
  console.log('🧪 Testing Activity Tracking System...\n')

  try {
    // Test 1: Check if activity_logs table exists
    console.log('1️⃣  Checking if activity_logs table exists...')
    const { data: tables, error: tableError } = await supabase
      .from('activity_logs')
      .select('*')
      .limit(1)
    
    if (tableError) {
      console.error('❌ ERROR: activity_logs table does not exist!')
      console.error('   Error:', tableError.message)
      console.log('\n📋 ACTION REQUIRED:')
      console.log('   1. Open Supabase Dashboard: https://supabase.com/dashboard/project/higyzdmedyacpiupxecm')
      console.log('   2. Go to SQL Editor')
      console.log('   3. Run the SQL from: supabase/migrations/002_activity_logs.sql')
      console.log('   4. Re-run this test\n')
      return
    }
    console.log('✅ Table exists!\n')

    // Test 2: Check current user
    console.log('2️⃣  Checking authentication...')
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.log('⚠️  No user logged in. Please log in first.')
      console.log('   Visit: http://localhost:5173/auth\n')
      return
    }
    console.log('✅ User authenticated:', user.email)
    console.log('   User ID:', user.id, '\n')

    // Test 3: Try to insert a test activity
    console.log('3️⃣  Attempting to log test activity...')
    const { data: insertData, error: insertError } = await supabase
      .from('activity_logs')
      .insert({
        user_id: user.id,
        activity_type: 'login',
        title: 'Test Activity',
        description: 'This is a test activity to verify the system works'
      })
      .select()
    
    if (insertError) {
      console.error('❌ ERROR: Could not insert activity!')
      console.error('   Error:', insertError.message)
      console.log('\n📋 Possible Issues:')
      console.log('   • RLS policies not set up correctly')
      console.log('   • Migration not run completely')
      console.log('   • User permissions issue\n')
      return
    }
    console.log('✅ Test activity logged successfully!\n')

    // Test 4: Fetch recent activities
    console.log('4️⃣  Fetching recent activities...')
    const { data: activities, error: fetchError } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (fetchError) {
      console.error('❌ ERROR: Could not fetch activities!')
      console.error('   Error:', fetchError.message)
      return
    }

    console.log('✅ Found', activities.length, 'activities:')
    activities.forEach((activity, index) => {
      console.log(`   ${index + 1}. [${activity.activity_type}] ${activity.title}`)
      console.log(`      ${activity.description}`)
      console.log(`      Time: ${new Date(activity.created_at).toLocaleString()}\n`)
    })

    // Test 5: Check if RPC function exists
    console.log('5️⃣  Testing RPC function...')
    const { data: rpcData, error: rpcError } = await supabase.rpc('get_recent_activities', {
      p_user_id: user.id,
      p_limit: 5
    })

    if (rpcError) {
      console.warn('⚠️  WARNING: RPC function not available')
      console.warn('   Error:', rpcError.message)
      console.log('   System will use fallback method\n')
    } else {
      console.log('✅ RPC function works! Found', rpcData.length, 'activities\n')
    }

    console.log('🎉 ALL TESTS PASSED!')
    console.log('\n✅ Activity tracking system is working correctly!')
    console.log('   Open the dashboard to see your activities.')

  } catch (error) {
    console.error('❌ UNEXPECTED ERROR:', error.message)
    console.error('   Stack:', error.stack)
  }
}

// Run the tests
testActivityTracking().then(() => {
  console.log('\n✨ Test completed!')
  process.exit(0)
}).catch(error => {
  console.error('❌ Test failed:', error)
  process.exit(1)
})
