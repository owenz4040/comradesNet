import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase client with service role key for storage operations
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'public-assets';
const IMAGES_DIR = path.join(__dirname, 'public', 'images');

async function createBucketIfNotExists() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);
    
    if (!bucketExists) {
      console.log('Creating storage bucket...');
      const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp']
      });
      
      if (error && error.statusCode !== '409') {
        console.error('Error creating bucket:', error);
        return false;
      }
      console.log('✓ Bucket created successfully');
    } else {
      console.log('✓ Bucket already exists');
    }
    return true;
  } catch (error) {
    if (error.statusCode === '409') {
      console.log('✓ Bucket already exists');
      return true;
    }
    console.error('Error checking/creating bucket:', error);
    return false;
  }
}

async function uploadImage(filePath, fileName) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const fileExt = path.extname(fileName).toLowerCase();
    
    // Determine content type
    let contentType = 'image/jpeg';
    if (fileExt === '.png') contentType = 'image/png';
    else if (fileExt === '.svg') contentType = 'image/svg+xml';
    else if (fileExt === '.webp') contentType = 'image/webp';
    
    console.log(`Uploading ${fileName}...`);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(`images/${fileName}`, fileBuffer, {
        contentType,
        upsert: true,
        cacheControl: '31536000' // 1 year cache
      });
    
    if (error) {
      console.error(`✗ Error uploading ${fileName}:`, error.message);
      return null;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(`images/${fileName}`);
    
    console.log(`✓ ${fileName} uploaded successfully`);
    return urlData.publicUrl;
  } catch (error) {
    console.error(`✗ Error uploading ${fileName}:`, error);
    return null;
  }
}

async function uploadAllImages() {
  console.log('🚀 Starting image upload to Supabase...\n');
  
  // Create bucket if needed
  const bucketReady = await createBucketIfNotExists();
  if (!bucketReady) {
    console.error('Failed to prepare storage bucket');
    return;
  }
  
  console.log('\n📁 Reading images directory...');
  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|svg|webp)$/i.test(file)
  );
  
  console.log(`Found ${imageFiles.length} image files\n`);
  
  const urls = {};
  
  for (const file of imageFiles) {
    const filePath = path.join(IMAGES_DIR, file);
    const url = await uploadImage(filePath, file);
    if (url) {
      urls[file] = url;
    }
  }
  
  console.log('\n✅ Upload complete!\n');
  console.log('Image URLs:');
  console.log(JSON.stringify(urls, null, 2));
  
  // Save URLs to a file
  fs.writeFileSync(
    path.join(__dirname, 'supabase-image-urls.json'),
    JSON.stringify(urls, null, 2)
  );
  
  console.log('\n📝 URLs saved to supabase-image-urls.json');
}

uploadAllImages().catch(console.error);
