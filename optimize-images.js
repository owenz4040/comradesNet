import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, 'public', 'images');
const QUALITY = 80;
const MAX_WIDTH = 1200;

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');
  
  const files = await readdir(IMAGES_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f) && !f.startsWith('opt_'));
  
  console.log(`Found ${imageFiles.length} images to optimize\n`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const outputPath = path.join(IMAGES_DIR, `opt_${file}`);
    
    try {
      const metadata = await sharp(inputPath).metadata();
      console.log(`Processing: ${file}`);
      console.log(`  Original: ${metadata.width}x${metadata.height} (${(metadata.size / 1024 / 1024).toFixed(2)}MB)`);
      
      await sharp(inputPath)
        .resize(MAX_WIDTH, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(outputPath);
      
      const optimizedMeta = await sharp(outputPath).metadata();
      const savings = ((metadata.size - optimizedMeta.size) / metadata.size * 100).toFixed(1);
      
      console.log(`  Optimized: ${optimizedMeta.width}x${optimizedMeta.height} (${(optimizedMeta.size / 1024 / 1024).toFixed(2)}MB)`);
      console.log(`  Saved: ${savings}% 💾\n`);
      
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }
  
  console.log('✅ Optimization complete!');
  console.log('\nNext steps:');
  console.log('1. Review optimized images (opt_*.jpg)');
  console.log('2. If satisfied, replace originals: mv public/images/opt_*.jpg public/images/');
  console.log('3. Build and deploy: npm run build');
  console.log('4. Images will be fast on: https://colinowen.me/images/');
}

optimizeImages().catch(console.error);
