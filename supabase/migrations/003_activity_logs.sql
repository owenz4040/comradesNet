-- Activity Logs Table for tracking user activities
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL CHECK (activity_type IN ('login', 'logout', 'payment', 'profile_update', 'plan_change', 'support_ticket', 'data_alert', 'password_change', 'email_change')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_type ON activity_logs(activity_type);

-- Enable RLS
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own activity logs"
    ON activity_logs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity logs"
    ON activity_logs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Function to automatically log login activity (triggered by auth events)
CREATE OR REPLACE FUNCTION log_user_login()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO activity_logs (user_id, activity_type, title, description, metadata)
    VALUES (
        NEW.id,
        'login',
        'Logged In',
        'Successfully logged into your account',
        jsonb_build_object('ip', NEW.last_sign_in_at)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up old activity logs (keep last 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_activity_logs()
RETURNS void AS $$
BEGIN
    DELETE FROM activity_logs
    WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Function to get recent activities with formatted time
CREATE OR REPLACE FUNCTION get_recent_activities(p_user_id UUID, p_limit INT DEFAULT 10)
RETURNS TABLE (
    id UUID,
    activity_type TEXT,
    title TEXT,
    description TEXT,
    time_ago TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.activity_type,
        a.title,
        a.description,
        CASE 
            WHEN NOW() - a.created_at < INTERVAL '1 minute' THEN 'Just now'
            WHEN NOW() - a.created_at < INTERVAL '1 hour' THEN 
                EXTRACT(MINUTE FROM NOW() - a.created_at)::INT || ' minutes ago'
            WHEN NOW() - a.created_at < INTERVAL '24 hours' THEN 
                EXTRACT(HOUR FROM NOW() - a.created_at)::INT || ' hours ago'
            WHEN NOW() - a.created_at < INTERVAL '7 days' THEN 
                EXTRACT(DAY FROM NOW() - a.created_at)::INT || ' days ago'
            ELSE TO_CHAR(a.created_at, 'MMM DD, YYYY')
        END as time_ago,
        a.created_at
    FROM activity_logs a
    WHERE a.user_id = p_user_id
    ORDER BY a.created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
