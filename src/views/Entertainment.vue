<template>
  <div class="entertainment">
    <!-- Hero Section -->
    <section class="entertainment-hero">
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="title-icon">🎬</span>
            Entertainment Hub
          </h1>
          <p class="hero-subtitle">
            Stream unlimited HD movies & series with lightning-fast internet from Comrades WiFi
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">10K+</div>
              <div class="stat-label">Movies & Series</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">4K</div>
              <div class="stat-label">Ultra HD Quality</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Streaming</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Movies Carousel -->
    <MoviesCarousel />

    <!-- Sports Widget -->
    <SportsWidget />

    <!-- Features Section -->
    <section class="streaming-features">
      <div class="container">
        <h2 class="section-title">Perfect Internet for Streaming</h2>
        <p class="section-subtitle">Enjoy buffer-free streaming with our high-speed plans</p>
        
        <div class="features-grid">
          <div class="feature-box">
            <div class="feature-icon">🚀</div>
            <h3>Ultra Fast</h3>
            <p>Speeds up to 20 Mbps for seamless 4K streaming</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon">📺</div>
            <h3>Multiple Devices</h3>
            <p>Stream on unlimited devices simultaneously</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon">🎯</div>
            <h3>No Buffering</h3>
            <p>Consistent speeds with 99.9% uptime guarantee</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon">💎</div>
            <h3>HD Quality</h3>
            <p>Crystal clear streaming in Full HD and 4K</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="entertainment-cta">
      <div class="container">
        <div class="cta-card">
          <h2>Ready to Stream Without Limits?</h2>
          <p>Get high-speed internet perfect for all your entertainment needs</p>
          <div class="cta-buttons">
            <router-link to="/plans" class="btn btn-primary">View Plans</router-link>
            <a href="tel:0793590575" class="btn btn-secondary">📞 Call Now</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MoviesCarousel from '../components/MoviesCarousel.vue'
import SportsWidget from '../components/SportsWidget.vue'

export default {
  name: 'Entertainment',
  components: {
    MoviesCarousel,
    SportsWidget
  }
}
</script>

<style scoped>
.entertainment {
  padding-top: 80px;
}

/* Hero Section */
.entertainment-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0A0E27 0%, #1A1A2E 50%, #0A0E27 100%);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 50%, rgba(220, 20, 60, 0.15), transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(0, 102, 204, 0.15), transparent 50%);
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 0;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: fadeInDown 0.8s ease;
}

.title-icon {
  font-size: 5rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  line-height: 1.8;
  animation: fadeInUp 1s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
  animation: fadeInUp 1.2s ease;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  font-weight: 600;
}

/* Streaming Features */
.streaming-features {
  padding: 6rem 0;
  background: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;
}

.feature-box {
  background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
  padding: 3rem 2rem;
  border-radius: 25px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 3px solid transparent;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.feature-box:hover {
  transform: translateY(-15px) scale(1.05);
  border-color: var(--brand-red);
  box-shadow: 0 20px 60px rgba(220, 20, 60, 0.2);
}

.feature-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.feature-box:nth-child(2) .feature-icon {
  animation-delay: 0.5s;
}

.feature-box:nth-child(3) .feature-icon {
  animation-delay: 1s;
}

.feature-box:nth-child(4) .feature-icon {
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.feature-box h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.feature-box p {
  color: #666;
  line-height: 1.7;
  font-size: 1.05rem;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .entertainment-hero {
    padding: 4rem 0 3rem;
  }
  
  .hero-title {
    font-size: 2rem !important;
  }
  
  .hero-subtitle {
    font-size: 1rem !important;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 1rem !important;
  }
  
  .stat-card {
    padding: 1rem !important;
  }
  
  .stat-value {
    font-size: 1.5rem !important;
  }
  
  .features-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }
  
  .feature-box {
    padding: 1.5rem !important;
  }
  
  .feature-box h3 {
    font-size: 1.2rem !important;
  }
}

/* CTA Section */
.entertainment-cta {
  padding: 6rem 0;
  background: linear-gradient(135deg, #0A0E27 0%, #1A1A2E 100%);
  position: relative;
  overflow: hidden;
}

.entertainment-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(220, 20, 60, 0.1), transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.cta-card {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 4rem 3rem;
  border-radius: 30px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.cta-card h2 {
  font-size: 3rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1.5rem;
}

.cta-card p {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  line-height: 1.7;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-buttons .btn {
  padding: 16px 40px;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .title-icon {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-stats {
    gap: 2rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-card {
    padding: 3rem 2rem;
  }
  
  .cta-card h2 {
    font-size: 2rem;
  }
  
  .cta-card p {
    font-size: 1.1rem;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
  
  .cta-buttons .btn {
    width: 100%;
  }
}
</style>
