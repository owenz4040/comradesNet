<template>
  <div class="home">
    <!-- Top Banner -->
    <TopBanner />
    
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title animate-slideInLeft">
              Fast, Affordable, and Reliable Internet<br/>
              <span class="gradient-text">For Students & Professionals</span>
            </h1>
            <p class="hero-subtitle">
              Stay connected with flexible plans starting at just <strong>KSh 999/month</strong>. 
              Experience blazing-fast speeds and 24/7 support across Kenya! 🇰🇪
            </p>
            <div class="hero-buttons">
              <a href="#plans" class="btn btn-primary">
                <span class="phone-icon">📞</span>
                CALL TO GET CONNECTED
              </a>
              <a href="tel:+254727895108" class="btn btn-phone">
                +254 727 895 108
              </a>
            </div>
            <div class="hero-stats">
              <div class="stat">
                <div class="stat-number">10K+</div>
                <div class="stat-label">Happy Customers</div>
              </div>
              <div class="stat">
                <div class="stat-number">50+</div>
                <div class="stat-label">Coverage Areas</div>
              </div>
              <div class="stat">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support</div>
              </div>
            </div>
          </div>
          <div class="hero-image">
            <div class="floating-card card-1">📶 100 Mbps</div>
            <div class="floating-card card-2">⚡ Ultra Fast</div>
            <div class="floating-card card-3">🔒 Secure</div>
            <div class="hero-illustration">🌐</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">Why Choose Comrades WiFi?</h2>
        <p class="section-subtitle">We provide the best internet experience in Kenya</p>
        
        <div class="features-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Plans Carousel -->
    <section class="plans-preview" id="plans">
      <div class="container">
        <h2 class="section-title">Choose Your Perfect Plan</h2>
        <p class="section-subtitle">Flexible, affordable, and lightning-fast internet for everyone</p>
        <PricingCarousel />
      </div>
    </section>

    <!-- Testimonials Section -->
    <Testimonials />

    <!-- Coverage Map Section -->
    <CoverageMap />

    <!-- Support Section -->
    <SupportSection />

    <!-- Referral Banner -->
    <ReferralBanner />

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Experience Lightning-Fast Internet?</h2>
          <p>Join thousands of satisfied customers across Kenya today!</p>
          <router-link to="/auth" class="btn btn-primary btn-large">Get Connected Now</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TopBanner from '../components/TopBanner.vue'
import PricingCarousel from '../components/PricingCarousel.vue'
import Testimonials from '../components/Testimonials.vue'
import CoverageMap from '../components/CoverageMap.vue'
import SupportSection from '../components/SupportSection.vue'
import ReferralBanner from '../components/ReferralBanner.vue'

export default {
  name: 'Home',
  components: {
    TopBanner,
    PricingCarousel,
    Testimonials,
    CoverageMap,
    SupportSection,
    ReferralBanner
  },
  data() {
    return {
      features: [
        {
          icon: '⚡',
          title: 'FAST',
          description: 'Reliable speeds for streaming, gaming, and browsing without any lag'
        },
        {
          icon: '💰',
          title: 'AFFORDABLE',
          description: 'Student-friendly prices starting at just KSh 999 per month'
        },
        {
          icon: '�',
          title: 'RELIABLE',
          description: 'Stable connections with 99.9% uptime and 24/7 support'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Hero Section */
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 4rem 0;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%);
  z-index: -1;
}

.hero-bg::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: var(--gradient-red);
  border-radius: 50%;
  top: -200px;
  right: -200px;
  opacity: 0.08;
  animation: float 6s ease-in-out infinite;
}

.hero-bg::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: var(--gradient-blue);
  border-radius: 50%;
  bottom: -150px;
  left: -150px;
  opacity: 0.08;
  animation: float 8s ease-in-out infinite reverse;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease;
}

.gradient-text {
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle strong {
  color: var(--brand-red);
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.8;
  animation: fadeInUp 1s ease;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  animation: fadeInUp 1.2s ease;
  flex-wrap: wrap;
}

.phone-icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

.btn-phone {
  background: white;
  color: var(--brand-blue);
  border: 3px solid var(--brand-blue);
  padding: 15px 35px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 102, 204, 0.2);
  font-family: 'Montserrat', sans-serif;
}

.btn-phone:hover {
  background: var(--brand-blue);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 102, 204, 0.4);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  animation: fadeInUp 1.4s ease;
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.hero-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-illustration {
  font-size: 20rem;
  opacity: 0.3;
  animation: float 4s ease-in-out infinite;
}

.floating-card {
  position: absolute;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  animation: float 3s ease-in-out infinite;
}

.card-1 {
  top: 10%;
  left: 10%;
  background: var(--gradient-red);
  color: white;
}

.card-2 {
  top: 50%;
  right: 5%;
  background: var(--gradient-blue);
  color: white;
  animation-delay: 1s;
}

.card-3 {
  bottom: 15%;
  left: 15%;
  background: var(--gradient-red-blue);
  color: white;
  animation-delay: 2s;
}

/* Features Section */
.features {
  padding: 6rem 0;
  background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.feature-card {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 25px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 3px solid transparent;
  text-align: center;
}

.feature-card:nth-child(1):hover {
  border-color: var(--brand-red);
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(220, 20, 60, 0.2);
}

.feature-card:nth-child(2):hover {
  border-color: var(--brand-blue);
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 102, 204, 0.2);
}

.feature-card:nth-child(3):hover {
  border-color: var(--accent-black);
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(26, 26, 26, 0.2);
}

.feature-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  letter-spacing: 2px;
}

.feature-card p {
  color: #666;
  line-height: 1.8;
  font-size: 1.05rem;
}

/* Plans Preview */
.plans-preview {
  padding: 6rem 0;
  background: white;
}

/* CTA Section */
.cta {
  padding: 6rem 0;
  background: var(--gradient-red-blue);
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '📡';
  position: absolute;
  font-size: 20rem;
  opacity: 0.05;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 3s ease-in-out infinite;
}

.cta-content {
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: 'Montserrat', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.cta-content p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.btn-large {
  padding: 18px 45px;
  font-size: 1.1rem;
  background: white;
  color: var(--brand-red);
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-large:hover {
  background: var(--light-gray);
  color: var(--brand-blue);
}

/* Responsive */
@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .hero-image {
    display: none;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .btn-phone {
    font-size: 1rem;
    padding: 12px 25px;
  }
}
</style>
