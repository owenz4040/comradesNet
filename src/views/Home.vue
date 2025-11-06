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
  background: linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 50%, #FFFFFF 100%);
  z-index: -1;
}

.hero-bg::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  background: var(--gradient-red);
  border-radius: 50%;
  top: -250px;
  right: -250px;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
  filter: blur(60px);
}

.hero-bg::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: var(--gradient-blue);
  border-radius: 50%;
  bottom: -200px;
  left: -200px;
  opacity: 0.1;
  animation: float 8s ease-in-out infinite reverse;
  filter: blur(60px);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease;
  letter-spacing: -1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
}

.gradient-text {
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
  animation: pulse 3s ease-in-out infinite;
}

.hero-subtitle strong {
  color: var(--brand-red);
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.8;
  animation: fadeInUp 1s ease;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.02);
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: fadeInUp 1.2s ease;
  flex-wrap: wrap;
  align-items: center;
}

.hero-buttons .btn-primary {
  font-size: 1rem;
  padding: 16px 38px;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 1.5px;
  box-shadow: 0 15px 40px rgba(220, 20, 60, 0.4);
}

.hero-buttons .btn-primary:hover {
  box-shadow: 0 20px 50px rgba(220, 20, 60, 0.6);
}

.phone-icon {
  font-size: 1.3rem;
  margin-right: 0.5rem;
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
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
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
}

.btn-phone::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--brand-blue);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  z-index: -1;
}

.btn-phone:hover::before {
  width: 300%;
  height: 300%;
}

.btn-phone:hover {
  color: white;
  transform: translateY(-3px) scale(1.02);
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
  padding: 1.5rem;
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.stat:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 50px rgba(220, 20, 60, 0.2);
  border-color: var(--brand-red);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -1px;
  display: block;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.stat:hover .stat-number {
  transform: scale(1.1);
}

.stat-label {
  color: #666;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
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
  padding: 1.2rem 1.8rem;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  font-weight: 700;
  animation: float 3s ease-in-out infinite;
  backdrop-filter: blur(10px);
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

.card-1 {
  top: 10%;
  left: 10%;
  background: var(--gradient-red);
  color: white;
  box-shadow: 0 15px 50px rgba(220, 20, 60, 0.3);
}

.card-2 {
  top: 50%;
  right: 5%;
  background: var(--gradient-blue);
  color: white;
  animation-delay: 1s;
  box-shadow: 0 15px 50px rgba(0, 102, 204, 0.3);
}

.card-3 {
  bottom: 15%;
  left: 15%;
  background: var(--gradient-red-blue);
  color: white;
  animation-delay: 2s;
  box-shadow: 0 15px 50px rgba(220, 20, 60, 0.2);
}

/* Features Section */
.features {
  padding: 8rem 0;
  background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 50%, #F8F9FA 100%);
  position: relative;
  overflow: hidden;
}

.features::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(220, 20, 60, 0.03) 0%, transparent 70%);
  animation: float 15s ease-in-out infinite;
}

.features::after {
  content: '';
  position: absolute;
  bottom: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 102, 204, 0.03) 0%, transparent 70%);
  animation: float 20s ease-in-out infinite reverse;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  position: relative;
  z-index: 1;
}

.feature-card {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 3px solid transparent;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  transition: left 0.7s;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:nth-child(1):hover {
  border-color: var(--brand-red);
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 25px 70px rgba(220, 20, 60, 0.25);
  background: linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 100%);
}

.feature-card:nth-child(2):hover {
  border-color: var(--brand-blue);
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 25px 70px rgba(0, 102, 204, 0.25);
  background: linear-gradient(135deg, #F0F7FF 0%, #FFFFFF 100%);
}

.feature-card:nth-child(3):hover {
  border-color: var(--accent-black);
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 25px 70px rgba(26, 26, 26, 0.25);
  background: linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%);
}

.feature-icon {
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.2) rotateY(360deg);
  transition: transform 0.6s ease;
}

.feature-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  letter-spacing: 3px;
  transition: all 0.3s ease;
}

.feature-card:hover h3 {
  letter-spacing: 4px;
}

.feature-card p {
  color: #666;
  line-height: 1.8;
  font-size: 1.05rem;
  transition: color 0.3s ease;
}

.feature-card:hover p {
  color: #444;
}

/* Plans Preview */
.plans-preview {
  padding: 8rem 0;
  background: linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 50%, #FFFFFF 100%);
  position: relative;
}

.plans-preview::before {
  content: '💰';
  position: absolute;
  font-size: 15rem;
  opacity: 0.03;
  top: 10%;
  left: 5%;
  animation: float 10s ease-in-out infinite;
}

.plans-preview::after {
  content: '⚡';
  position: absolute;
  font-size: 15rem;
  opacity: 0.03;
  bottom: 10%;
  right: 5%;
  animation: float 12s ease-in-out infinite reverse;
}

/* CTA Section */
.cta {
  padding: 8rem 0;
  background: var(--gradient-red-blue);
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '📡';
  position: absolute;
  font-size: 25rem;
  opacity: 0.08;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 4s ease-in-out infinite;
}

.cta::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: float 6s ease-in-out infinite;
}

.cta-content {
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.cta-content p {
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  font-weight: 400;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-large {
  padding: 20px 50px;
  font-size: 1.2rem;
  background: white;
  color: var(--brand-red);
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  border: 3px solid white;
}

.btn-large::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--gradient-red-blue);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  z-index: -1;
}

.btn-large:hover::before {
  width: 400%;
  height: 400%;
}

.btn-large:hover {
  color: white;
  border-color: white;
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 968px) {
  .hero {
    padding: 2rem 0;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .hero-buttons .btn-primary {
    font-size: 0.9rem;
    padding: 14px 30px;
  }
  
  .hero-image {
    display: none;
  }
  
  .hero-stats {
    gap: 1rem;
  }
  
  .stat {
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .features {
    padding: 4rem 0;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .plans-preview {
    padding: 4rem 0;
  }
  
  .cta {
    padding: 4rem 0;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .cta-content p {
    font-size: 1.1rem;
  }
  
  .btn-large {
    font-size: 1rem;
    padding: 16px 35px;
  }
  
  .btn-phone {
    font-size: 1rem;
    padding: 12px 25px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-stats {
    grid-template-columns: 1fr;
  }
  
  .cta-content h2 {
    font-size: 1.8rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>
