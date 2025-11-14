# Setup Activity Tracking - Manual Method

Since Supabase CLI is not installed, follow these steps to set up the activity tracking system:

## Step 1: Run the SQL Migration

1. Open your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `higyzdmedyacpiupxecm`
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the entire content from `supabase/migrations/002_activity_logs.sql`
6. Click **Run** button

## Step 2: Verify Installation

After running the migration, verify it was successful:

```sql
-- Check if the table exists
SELECT * FROM activity_logs LIMIT 1;

-- Check if the function exists
SELECT get_recent_activities('00000000-0000-0000-0000-000000000000'::uuid, 5);
```

## Step 3: Test Activity Logging

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the application in your browser

3. Log in to your account

4. Check the "Recent Activity" section in the dashboard - you should see a "Logged In" activity

5. Try these actions to see more activities:
   - Click "Pay Bill" and complete payment → See "Payment Received"
   - Click "Edit Profile" and save → See "Profile Updated"
   - Log out → See "Logged Out" (will appear next time you log in)

## Alternative: Install Supabase CLI (Optional)

If you want to install Supabase CLI for future use:

### Linux/Ubuntu:
```bash
# Download and install
curl -fsSL https://supabase.com/install.sh | sh

# Or using npm
npm install -g supabase
```

### Verify installation:
```bash
supabase --version
```

### Then you can use:
```bash
# Link to your project
supabase link --project-ref higyzdmedyacpiupxecm

# Push migrations
supabase db push
```

## Troubleshooting

### Issue: "relation activity_logs does not exist"
**Solution:** The migration hasn't been run yet. Follow Step 1 above.

### Issue: Activities not showing in dashboard
**Solution:** 
1. Check browser console for errors
2. Verify you're logged in
3. Hard refresh the page (Ctrl+Shift+R)
4. Check if the table has data:
   ```sql
   SELECT * FROM activity_logs WHERE user_id = 'your-user-id';
   ```

### Issue: "permission denied for table activity_logs"
**Solution:** The RLS policies may not be set up correctly. Re-run the migration.

### Issue: Old activities showing wrong time
**Solution:** Clear browser cache or wait for the next auto-refresh (30 seconds).

## Quick SQL Script

Run this in Supabase SQL Editor to manually test activity logging:

```sql
-- Get your user ID
SELECT id, email FROM auth.users LIMIT 1;

-- Manually insert a test activity (replace user-id with your actual ID)
INSERT INTO activity_logs (user_id, activity_type, title, description)
VALUES (
  'your-user-id-here'::uuid,
  'login',
  'Test Activity',
  'This is a test activity'
);

-- View your activities
SELECT * FROM get_recent_activities('your-user-id-here'::uuid, 10);
```

## What Gets Logged Automatically

✅ **Login** - When you sign in
✅ **Logout** - When you sign out
✅ **Payments** - When you click "Pay Bill"
✅ **Profile Updates** - When you save profile changes

## Manual Logging (For Developers)

Add custom activity logging in your code:

```javascript
import { logActivity } from '@/services/api'

// Custom activity
await logActivity(
  userId,
  'custom_type',
  'Custom Activity',
  'Description of what happened',
  { optional: 'metadata' }
)
```

## Need Help?

If you encounter any issues:
1. Check the browser console (F12)
2. Check Supabase logs in the dashboard
3. Verify the migration SQL ran without errors
4. Make sure you're using the correct project reference
