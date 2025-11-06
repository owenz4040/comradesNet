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
              <div class="plan-icon-large">{{ plan.icon }}</div>
              <div class="featured-badge" v-if="plan.featured">⭐ Best Value</div>
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
                  <span class="check-icon">✓</span>
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
                <th>Home Basic</th>
                <th class="featured-col">Power User</th>
                <th>Business Pro</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Download Speed</td>
                <td>10 Mbps</td>
                <td class="featured-col">50 Mbps</td>
                <td>100 Mbps</td>
                <td>500 Mbps</td>
              </tr>
              <tr>
                <td>Upload Speed</td>
                <td>5 Mbps</td>
                <td class="featured-col">25 Mbps</td>
                <td>50 Mbps</td>
                <td>250 Mbps</td>
              </tr>
              <tr>
                <td>Data Limit</td>
                <td>Unlimited</td>
                <td class="featured-col">Unlimited</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Devices</td>
                <td>5 devices</td>
                <td class="featured-col">10 devices</td>
                <td>20 devices</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Support</td>
                <td>Standard</td>
                <td class="featured-col">Priority</td>
                <td>Dedicated</td>
                <td>24/7 Premium</td>
              </tr>
              <tr>
                <td>Installation</td>
                <td>Free</td>
                <td class="featured-col">Free + Router</td>
                <td>Free + Premium Router</td>
                <td>Free + Enterprise Setup</td>
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
          icon: '🏠',
          name: 'Home Basic',
          description: 'Perfect for casual browsing and social media',
          price: '2,500',
          speed: '10 Mbps',
          features: [
            'Unlimited data usage',
            'Connect up to 5 devices',
            'Perfect for browsing & email',
            'Free installation included',
            '24/7 customer support',
            'No hidden charges'
          ]
        },
        {
          icon: '🚀',
          name: 'Power User',
          description: 'Ideal for streaming and gaming',
          price: '4,500',
          speed: '50 Mbps',
          featured: true,
          features: [
            'Unlimited data usage',
            'Connect up to 10 devices',
            'HD streaming on multiple devices',
            'Online gaming ready',
            'Priority customer support',
            'Free router included',
            'Free installation',
            'No throttling or caps'
          ]
        },
        {
          icon: '💼',
          name: 'Business Pro',
          description: 'For small businesses and remote work',
          price: '7,500',
          speed: '100 Mbps',
          features: [
            'Unlimited data usage',
            'Connect up to 20 devices',
            '4K streaming capability',
            'Video conferencing ready',
            'Dedicated support line',
            'Premium router included',
            'Static IP address',
            'Service level agreement (SLA)'
          ]
        },
        {
          icon: '🏢',
          name: 'Enterprise',
          description: 'Custom solutions for large organizations',
          price: '15,000',
          speed: '500 Mbps',
          features: [
            'Unlimited data usage',
            'Unlimited devices',
            'Ultra-fast speeds',
            'Custom bandwidth options',
            '24/7 premium support',
            'Enterprise-grade equipment',
            'Multiple static IPs',
            '99.9% uptime guarantee',
            'Dedicated account manager'
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
  }
}
</script>

<style scoped>
.plans-hero {
  background: var(--gradient-1);
  color: white;
  padding: 6rem 0 4rem;
  text-align: center;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
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
  font-size: 5rem;
  margin-bottom: 1rem;
}

.featured-badge {
  display: inline-block;
  background: var(--gradient-4);
  color: var(--text-dark);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 1rem;
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
  color: #666;
}

.amount {
  font-size: 3.5rem;
  font-weight: 800;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0.3rem;
}

.period {
  font-size: 1.1rem;
  color: #666;
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
  color: var(--vibrant-green);
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
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
