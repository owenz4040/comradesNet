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

    <section class="faq-section">
      <div class="container">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <div class="faq-grid">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <h3>{{ faq.question }}</h3>
            <p>{{ faq.answer }}</p>
          </div>
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
      faqs: [
        {
          question: 'How long does installation take?',
          answer: 'Installation typically takes 2-3 hours. Our technicians will schedule a convenient time and ensure everything is working perfectly before they leave.'
        },
        {
          question: 'Is there a contract or can I cancel anytime?',
          answer: 'We offer flexible monthly plans with no long-term contracts. You can cancel anytime with 30 days notice.'
        },
        {
          question: 'What areas do you cover?',
          answer: 'We currently cover 50+ locations across Kenya including Nairobi, Mombasa, Kisumu, Nakuru, and surrounding areas. Contact us to check availability in your area.'
        },
        {
          question: 'Do I need to buy a router?',
          answer: 'Our Power User plan and above include a free router. For Home Basic, you can rent a router for KSh 500/month or use your own compatible device.'
        },
        {
          question: 'What happens if I experience issues?',
          answer: 'Our 24/7 support team is always ready to help. Most issues are resolved remotely within 2 hours, or we send a technician the same day.'
        },
        {
          question: 'Can I upgrade or downgrade my plan?',
          answer: 'Absolutely! You can change your plan anytime. Upgrades take effect immediately, while downgrades apply from your next billing cycle.'
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
.faq-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #FFF5F3 0%, #F3FBFF 100%);
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.faq-item {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.faq-item h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.faq-item p {
  color: #666;
  line-height: 1.6;
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
  
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>
