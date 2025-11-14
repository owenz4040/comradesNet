<template>
  <div class="speed-test-container">
    <div class="speed-test-card">
      <h2 class="test-title">
        <span class="icon">⚡</span>
        Network Speed Test
      </h2>
      
      <p class="test-description">Powered by Fast.com (Netflix)</p>
      
      <!-- Fast.com Embed -->
      <div class="speed-test-embed">
        <iframe 
          src="https://fast.com" 
          class="fast-embed"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      
      <div class="test-info">
        <p>💡 <strong>Tip:</strong> Close other apps and pause downloads for accurate results</p>
        <p>🌐 This test is powered by Netflix's Fast.com service</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeedTest'
}
</script>

<style scoped>
.speed-test-container {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.speed-test-card {
  background: white;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.test-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
}

.test-title .icon {
  font-size: 2.5rem;
  margin-right: 0.5rem;
}

.test-description {
  text-align: center;
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 2rem;
  font-weight: 600;
}

.speed-test-embed {
  width: 100%;
  background: #000;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  margin-bottom: 2rem;
}

.fast-embed {
  width: 100%;
  height: 600px;
  border: none;
  display: block;
}

.test-info {
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  padding: 1.5rem;
  border-radius: 15px;
  border: 2px solid #BAE6FD;
}

.test-info p {
  margin: 0.5rem 0;
  color: #0369A1;
  font-size: 0.95rem;
  line-height: 1.6;
}

.test-info strong {
  color: #0C4A6E;
}

@media (max-width: 768px) {
  .speed-test-container {
    padding: 1rem;
  }
  
  .speed-test-card {
    padding: 1.5rem;
  }
  
  .fast-embed {
    height: 500px;
  }
  
  .test-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .fast-embed {
    height: 400px;
  }
}
</style>
