<template>
  <section class="support-section">
    <div class="container">
      <div class="support-content">
        <div class="support-image">
          <img src="/images/owen.jpg" alt="Customer Support - Owen" />
          <div class="support-badge">
            <div class="badge-icon">💬</div>
            <div class="badge-text">
              <strong>24/7 Support</strong>
              <span>Always Here to Help</span>
            </div>
          </div>
        </div>
        
        <div class="support-info">
          <h2 class="section-title">Need Help? We're Here for You!</h2>
          <p class="section-subtitle">Our dedicated support team is available 24/7 to assist you with any questions or issues.</p>
          
          <div class="support-features">
            <div class="feature-item">
              <div class="feature-icon">📞</div>
              <div class="feature-content">
                <h3>Call Us Anytime</h3>
                <a href="tel:+254727895108" class="support-link">+254 727 895 108</a>
                <p>Available 24 hours a day, 7 days a week</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">💬</div>
              <div class="feature-content">
                <h3>Live Chat Support</h3>
                <p>Get instant help from our support team via live chat</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">📧</div>
              <div class="feature-content">
                <h3>Email Support</h3>
                <a href="mailto:support@comradeswifi.co.ke" class="support-link">support@comradeswifi.co.ke</a>
                <p>We respond within 1 hour during business hours</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">🏠</div>
              <div class="feature-content">
                <h3>Home Installation</h3>
                <p>Free professional installation and setup included</p>
              </div>
            </div>
          </div>
          
          <div class="support-cta">
            <router-link to="/contact" class="btn btn-primary">Contact Support</router-link>
            <a href="#plans" class="btn btn-secondary">View Plans</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SupportSection'
}
</script>

<style scoped>
.support-section {
  padding: 6rem 0;
  background: white;
  position: relative;
  overflow: hidden;
}

.support-section::before {
  content: '🎧';
  position: absolute;
  font-size: 30rem;
  opacity: 0.02;
  top: 50%;
  right: -5%;
  transform: translateY(-50%);
  z-index: 0;
}

.support-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.support-image {
  position: relative;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.support-image:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
}

.support-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.3s ease;
}

.support-image:hover img {
  transform: scale(1.05);
}

.support-badge {
  position: absolute;
  bottom: 30px;
  left: 30px;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: float 3s ease-in-out infinite;
}

.badge-icon {
  font-size: 2.5rem;
}

.badge-text {
  display: flex;
  flex-direction: column;
}

.badge-text strong {
  font-size: 1.1rem;
  color: var(--brand-red);
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 0.2rem;
}

.badge-text span {
  font-size: 0.9rem;
  color: #666;
}

.support-info {
  padding: 2rem 0;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  line-height: 1.8;
}

.support-features {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #F8F9FA;
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.feature-item:hover {
  background: white;
  border-color: var(--brand-blue);
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(0, 102, 204, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.feature-content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.feature-content p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
}

.support-link {
  display: inline-block;
  color: var(--brand-blue);
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  transition: all 0.3s ease;
}

.support-link:hover {
  color: var(--brand-red);
  transform: translateX(5px);
}

.support-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-secondary {
  background: white;
  color: var(--brand-blue);
  border: 3px solid var(--brand-blue);
}

.btn-secondary:hover {
  background: var(--brand-blue);
  color: white;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive */
@media (max-width: 968px) {
  .support-content {
    grid-template-columns: 1fr;
  }
  
  .support-image {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .support-section {
    padding: 4rem 0;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .support-badge {
    bottom: 20px;
    left: 20px;
    padding: 1rem 1.5rem;
  }
  
  .badge-icon {
    font-size: 2rem;
  }
  
  .badge-text strong {
    font-size: 1rem;
  }
  
  .badge-text span {
    font-size: 0.8rem;
  }
  
  .feature-item {
    flex-direction: column;
    text-align: center;
  }
  
  .support-cta {
    flex-direction: column;
  }
  
  .support-cta .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
