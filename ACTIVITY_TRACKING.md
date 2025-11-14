# Real-Time Activity Tracking System

## Overview
The Comrades WiFi customer portal now includes a comprehensive real-time activity tracking system that logs and displays user activities such as logins, logouts, payments, profile changes, and more.

## Features

### Tracked Activities
The system tracks the following user activities:

1. **Login** - When a user successfully logs into their account
2. **Logout** - When a user logs out of their account
3. **Payment** - When a user makes a payment (amount and plan details)
4. **Profile Update** - When a user updates their profile information
5. **Plan Change** - When a user upgrades/downgrades their plan
6. **Support Ticket** - When a user creates a support ticket
7. **Data Alert** - System-generated alerts for data usage
8. **Password Change** - When a user changes their password
9. **Email Change** - When a user updates their email address

### Real-Time Updates
- Activities are displayed in the dashboard's "Recent Activity" section
- Automatic polling every 30 seconds for new activities
- Human-readable timestamps (e.g., "2 hours ago", "Just now")
- Color-coded icons for different activity types

## Database Schema

### activity_logs Table
```sql
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    activity_type TEXT CHECK (activity_type IN ('login', 'logout', 'payment', ...)),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexes
- `idx_activity_logs_user_id` - Fast lookups by user
- `idx_activity_logs_created_at` - Ordered by time
- `idx_activity_logs_type` - Filter by activity type

### Row Level Security (RLS)
- Users can only view their own activity logs
- Users can insert their own activity logs
- Automatic cleanup of logs older than 90 days

## API Functions

### Log Activity
```javascript
import { logActivity } from '@/services/api'

await logActivity(userId, 'payment', 'Payment Received', 'KSh 1,500 for 10 Mbps plan', {
  amount: 1500,
  plan: '10 Mbps'
})
```

### Get Recent Activities
```javascript
import { getRecentActivities } from '@/services/api'

const activities = await getRecentActivities(userId, 10)
```

### Convenience Functions
```javascript
import { logLogin, logLogout, logPayment, logProfileUpdate, logPlanChange } from '@/services/api'

// Log login
await logLogin(userId)

// Log logout
await logLogout(userId)

// Log payment
await logPayment(userId, 1500, '10 Mbps')

// Log profile update
await logProfileUpdate(userId, { phone: '+254712345678', email: 'new@email.com' })

// Log plan change
await logPlanChange(userId, '5 Mbps', '10 Mbps')
```

## Implementation

### Dashboard Component
The dashboard automatically:
1. Fetches recent activities on mount
2. Polls for new activities every 30 seconds
3. Cleans up polling interval on unmount
4. Maps activity types to appropriate icons
5. Formats timestamps as human-readable text

### Activity Icons
Each activity type has a unique icon and color:
- **Login** - Blue gradient with login arrow icon
- **Logout** - Purple gradient with logout arrow icon
- **Payment** - Green gradient with dollar sign icon
- **Profile** - Pink gradient with user icon
- **Upgrade** - Orange gradient with upward arrow icon
- **Data** - Red gradient with chart icon
- **Support** - Cyan gradient with question mark icon
- **Security** - Teal gradient with lock icon
- **Email** - Indigo gradient with envelope icon

### Auto-Logging
Activities are automatically logged when:
- User logs in (Auth.vue)
- User logs out (Dashboard.vue)
- User makes a payment (Dashboard.vue)
- User updates their profile (Dashboard.vue)

## Running the Migration

To set up the activity tracking system in your Supabase project:

1. Open Supabase SQL Editor
2. Run the migration file: `supabase/migrations/002_activity_logs.sql`
3. Verify the table and functions were created successfully

Alternatively, using Supabase CLI:
```bash
supabase db push
```

## Usage Examples

### Viewing Activities
Activities are automatically displayed in the dashboard's "Recent Activity" card. No additional code required.

### Manual Activity Logging
```javascript
// In any component
async logCustomActivity() {
  try {
    const { logActivity } = await import('@/services/api')
    await logActivity(
      this.userId,
      'custom_type',
      'Custom Title',
      'Custom description',
      { extra: 'metadata' }
    )
  } catch (error) {
    console.error('Error logging activity:', error)
  }
}
```

## Performance Considerations

1. **Polling Interval** - Set to 30 seconds to balance real-time updates with server load
2. **Activity Limit** - Default limit of 10 activities per fetch
3. **Automatic Cleanup** - Old activities (>90 days) are automatically removed
4. **Non-Critical Logging** - Activity logging failures don't affect main operations

## Future Enhancements

- [ ] WebSocket/real-time subscriptions instead of polling
- [ ] Activity filtering by type
- [ ] Export activity history
- [ ] Admin dashboard for viewing all user activities
- [ ] Push notifications for critical activities
- [ ] Activity analytics and insights

## Troubleshooting

### Activities Not Showing
1. Verify the migration was run successfully
2. Check browser console for errors
3. Verify RLS policies are correctly configured
4. Ensure user is authenticated

### Slow Performance
1. Check database indexes are created
2. Reduce polling frequency if needed
3. Decrease activity limit if fetching too many records

### Missing Activity Types
1. Verify activity type is in the CHECK constraint
2. Update the migration if adding new types
3. Redeploy the database schema

## Security

- All activity data is protected by Row Level Security (RLS)
- Users can only view their own activities
- Sensitive information should be stored in metadata JSONB field
- Activity logging is non-blocking and won't crash the app if it fails
