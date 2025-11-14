import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const fileBuffer = fs.readFileSync('public/images/reliable.jpg');
const { data, error } = await supabase.storage
  .from('public-assets')
  .upload('images/reliable.jpg', fileBuffer, {
    contentType: 'image/jpeg',
    upsert: true,
    cacheControl: '31536000'
  });

if (error) console.error('Error:', error);
else console.log('✓ reliable.jpg uploaded:', data);

const { data: urlData } = supabase.storage
  .from('public-assets')
  .getPublicUrl('images/reliable.jpg');
console.log('URL:', urlData.publicUrl);
