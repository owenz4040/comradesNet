<template>
  <div class="plans-page">
    <section class="plans-hero">
      <div class="container">
        <h1 class="page-title">Choose Your Perfect Plan</h1>
        <p class="page-subtitle">Flexible, affordable, and lightning-fast internet for everyone</p>
      </div>
    </section>

    <section class="plans-section">
      <div class="container">
        <div class="plans-grid-full">
          <div 
            class="plan-card-full" 
            v-for="(plan, index) in allPlans" 
            :key="index"
            :class="{ featured: plan.featured }"
          >
            <div class="plan-header">
              <div class="plan-icon-large">
                <img :src="plan.icon" :alt="plan.name" class="plan-icon-img" />
              </div>
              <div class="featured-badge" v-if="plan.featured">
                <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=80&h=80&fit=crop" alt="Best Value" class="badge-icon" />
                <span>Best Value</span>
              </div>
              <h2 class="plan-title">{{ plan.name }}</h2>
              <p class="plan-description">{{ plan.description }}</p>
            </div>
            
            <div class="plan-pricing">
              <div class="price-main">
                <span class="currency">KSh</span>
                <span class="amount">{{ plan.price }}</span>
                <span class="period">/month</span>
              </div>
              <div class="speed-badge">{{ plan.speed }}</div>
            </div>
            
            <div class="plan-features-section">
              <h3>What's Included:</h3>
              <ul class="features-list">
                <li v-for="(feature, i) in plan.features" :key="i">
                  <div class="check-icon-emoji">
                    {{ getFeatureIcon(feature) }}
                  </div>
                  {{ feature }}
                </li>
              </ul>
            </div>
            
            <router-link to="/auth" class="btn btn-primary btn-full">Get This Plan</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="comparison-section">
      <div class="container">
        <h2 class="section-title">Compare All Plans</h2>
        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Starter</th>
                <th class="featured-col">Standard</th>
                <th>Premium</th>
                <th>Ultra</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monthly Price</td>
                <td>KSh 999</td>
                <td class="featured-col">KSh 1,399</td>
                <td>KSh 1,799</td>
                <td>KSh 2,199</td>
              </tr>
              <tr>
                <td>Download Speed</td>
                <td>5 Mbps</td>
                <td class="featured-col">10 Mbps</td>
                <td>15 Mbps</td>
                <td>20 Mbps</td>
              </tr>
              <tr>
                <td>Data Limit</td>
                <td>Unlimited</td>
                <td class="featured-col">Unlimited</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Connected Devices</td>
                <td>Unlimited</td>
                <td class="featured-col">Unlimited</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Installation</td>
                <td>FREE</td>
                <td class="featured-col">FREE</td>
                <td>FREE</td>
                <td>FREE</td>
              </tr>
              <tr>
                <td>Router</td>
                <td>KSh 1,500</td>
                <td class="featured-col">KSh 1,500</td>
                <td>KSh 1,500</td>
                <td>KSh 1,500</td>
              </tr>
              <tr>
                <td>Support</td>
                <td>24/7</td>
                <td class="featured-col">24/7</td>
                <td>24/7 Priority</td>
                <td>24/7 Priority</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="animated-features-section">
      <div class="container">
        <h2 class="section-title">Why Choose Comrades WiFi?</h2>
        <div class="animated-features-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index" :style="{animationDelay: index * 0.1 + 's'}">
            <div class="feature-icon-wrapper">
              <span class="feature-icon">{{ feature.icon }}</span>
              <div class="pulse-ring"></div>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
        
        <div class="floating-elements">
          <div class="float-element element-1">🚀</div>
          <div class="float-element element-2">⚡</div>
          <div class="float-element element-3">🌟</div>
          <div class="float-element element-4">💎</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Plans',
  data() {
    return {
      allPlans: [
        {
          icon: '/images/fast.png',
          name: 'Starter',
          description: 'Perfect for light browsing and social media',
          price: '999',
          speed: '5 Mbps',
          features: [
            'Unlimited data usage',
            'Unlimited devices',
            'Perfect for browsing & email',
            'FREE installation',
            'Router available @ KSh 1,500',
            '24/7 customer support'
          ]
        },
        {
          icon: '/images/affordable.jpg',
          name: 'Standard',
          description: 'Great for streaming and casual gaming',
          price: '1,399',
          speed: '10 Mbps',
          featured: true,
          features: [
            'Unlimited data usage',
            'Unlimited devices',
            'HD streaming ready',
            'Online gaming capable',
            'FREE installation',
            'Router available @ KSh 1,500',
            '24/7 customer support'
          ]
        },
        {
          icon: '/images/reliable.jpg',
          name: 'Premium',
          description: 'Ideal for heavy streaming and gaming',
          price: '1,799',
          speed: '15 Mbps',
          features: [
            'Unlimited data usage',
            'Unlimited devices',
            'HD+ streaming on multiple devices',
            'Online gaming optimized',
            'FREE installation',
            'Router available @ KSh 1,500',
            'Priority customer support'
          ]
        },
        {
          icon: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=150&h=150&fit=crop',
          name: 'Ultra',
          description: 'Maximum speed for power users',
          price: '2,199',
          speed: '20 Mbps',
          features: [
            'Unlimited data usage',
            'Unlimited devices',
            '4K streaming capability',
            'Ultra-fast downloads',
            'FREE installation',
            'Router available @ KSh 1,500',
            'Priority customer support',
            'Best value for families'
          ]
        }
      ],
      features: [
        {
          icon: '🚀',
          title: 'Lightning Fast',
          description: 'Experience blazing-fast internet speeds up to 20 Mbps for seamless streaming and gaming'
        },
        {
          icon: '💰',
          title: 'Affordable Plans',
          description: 'Starting from just KSh 999/month with unlimited data and no hidden fees'
        },
        {
          icon: '🔧',
          title: 'FREE Installation',
          description: 'Professional installation at no extra cost, scheduled at your convenience'
        },
        {
          icon: '📍',
          title: 'Wide Coverage',
          description: 'Available in Olekasai, Tuala, Mayor Road, Maasai Lodge, Tumaini, and more'
        },
        {
          icon: '⚡',
          title: 'Unlimited Data',
          description: 'All plans come with unlimited data - browse, stream, and download without limits'
        },
        {
          icon: '🎯',
          title: '24/7 Support',
          description: 'Our dedicated team is always available to help you - call us anytime!'
        }
      ]
    }
  },
  methods: {
    getFeatureIcon(feature) {
      const featureLower = feature.toLowerCase();
      
      // Data/Unlimited usage - Database icon
      if (featureLower.includes('unlimited data') || featureLower.includes('data usage')) {
        return '📊';
      }
      // Devices - Devices icon
      if (featureLower.includes('devices') || featureLower.includes('connect')) {
        return '📱';
      }
      // Browsing/Email/Streaming - Monitor icon
      if (featureLower.includes('browsing') || featureLower.includes('email') || featureLower.includes('streaming') || featureLower.includes('gaming')) {
        return '💻';
      }
      // Installation - Tools icon
      if (featureLower.includes('installation') || featureLower.includes('free')) {
        return '🔧';
      }
      // Router - WiFi icon
      if (featureLower.includes('router')) {
        return '📡';
      }
      // Support - Support icon
      if (featureLower.includes('support') || featureLower.includes('24/7')) {
        return '💬';
      }
      // Default check icon
      return '✓';
    }
  }
}
</script>

<style scoped>
.plans-hero {
  background: var(--gradient-red-blue);
  color: white;
  padding: 6rem 0 4rem;
  text-align: center;
  position: relative;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.page-subtitle {
  font-size: 1.3rem;
  opacity: 1;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.plans-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #FFF5F3 0%, #F3FBFF 100%);
}

.plans-grid-full {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.plan-card-full {
  background: white;
  border-radius: 25px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 3px solid transparent;
  display: flex;
  flex-direction: column;
}

.plan-card-full:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.plan-card-full.featured {
  border-color: var(--primary-orange);
  transform: scale(1.05);
  position: relative;
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-icon-large {
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.plan-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.plan-card-full:hover .plan-icon-img {
  transform: scale(1.1);
}

.featured-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gradient-4);
  color: var(--text-dark);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.featured-badge .badge-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.plan-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.plan-description {
  color: #666;
  font-size: 1rem;
}

.plan-pricing {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem 0;
  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;
}

.price-main {
  margin-bottom: 1rem;
}

.currency {
  font-size: 1.2rem;
  color: var(--text-dark);
  font-weight: 600;
}

.amount {
  font-size: 3.5rem;
  font-weight: 800;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0.3rem;
  color: var(--brand-red);
}

.period {
  font-size: 1.1rem;
  color: var(--text-dark);
  font-weight: 600;
}

.speed-badge {
  display: inline-block;
  background: var(--gradient-2);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
}

.plan-features-section {
  flex-grow: 1;
  margin-bottom: 2rem;
}

.plan-features-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.features-list {
  list-style: none;
}

.features-list li {
  padding: 0.8rem 0;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.check-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.check-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.check-icon-emoji {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFF5F3 0%, #F3FBFF 100%);
  border-radius: 50%;
  font-size: 1.2rem;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-full {
  width: 100%;
  margin-top: auto;
}

/* Comparison Section */
.comparison-section {
  padding: 4rem 0;
  background: white;
}

.comparison-table-wrapper {
  overflow-x: auto;
  margin-top: 2rem;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.comparison-table th {
  background: var(--gradient-1);
  color: white;
  padding: 1.5rem;
  font-weight: 700;
  text-align: center;
}

.comparison-table th.featured-col {
  background: var(--gradient-4);
  color: var(--text-dark);
  position: relative;
}

.comparison-table td {
  padding: 1.2rem;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}

.comparison-table td:first-child {
  font-weight: 600;
  text-align: left;
  background: #f8f9fa;
}

.comparison-table td.featured-col {
  background: #FFF9E6;
  font-weight: 600;
}

.comparison-table tr:hover {
  background: #f8f9fa;
}

/* FAQ Section */
.animated-features-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #FFF5F3 0%, #F3FBFF 100%);
  position: relative;
  overflow: hidden;
}

.animated-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.feature-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: fadeInUp 0.6s ease backwards;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-red-blue);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.feature-card:hover::before {
  opacity: 0.05;
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(220, 20, 60, 0.15);
}

.feature-icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.feature-icon {
  font-size: 4rem;
  display: block;
  animation: bounce 2s infinite;
  position: relative;
  z-index: 2;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border: 3px solid var(--brand-red);
  border-radius: 50%;
  animation: pulse 2s infinite;
  z-index: 1;
}

.feature-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
  font-weight: 700;
  position: relative;
  z-index: 2;
}

.feature-card p {
  color: #666;
  line-height: 1.8;
  font-size: 1rem;
  position: relative;
  z-index: 2;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.float-element {
  position: absolute;
  font-size: 3rem;
  opacity: 0.15;
  animation: float 6s infinite ease-in-out;
}

.element-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.element-2 {
  top: 20%;
  right: 15%;
  animation-delay: 1s;
}

.element-3 {
  bottom: 20%;
  left: 15%;
  animation-delay: 2s;
}

.element-4 {
  bottom: 15%;
  right: 10%;
  animation-delay: 3s;
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

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  50% {
    transform: translateY(-40px) rotate(-5deg);
  }
  75% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .plans-grid-full {
    grid-template-columns: 1fr;
  }
  
  .plan-card-full.featured {
    transform: scale(1);
  }
  
  .comparison-table {
    font-size: 0.9rem;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 0.8rem;
  }
  
  .animated-features-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-card {
    padding: 2rem;
  }
  
  .float-element {
    font-size: 2rem;
  }
}
</style>
