<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="container">
        <h1 class="page-title">Get In Touch</h1>
        <p class="page-subtitle">We're here to help! Reach out and let's get you connected</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <h2>Send Us a Message</h2>
            <form class="contact-form" @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone" 
                  placeholder="+254 727 895 108"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="location">Your Location *</label>
                <input 
                  type="text" 
                  id="location" 
                  v-model="form.location" 
                  placeholder="e.g., Nairobi, Westlands"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="plan">Interested In</label>
                <select id="plan" v-model="form.plan">
                  <option value="">Select a plan</option>
                  <option value="home-basic">Home Basic - KSh 2,500/mo</option>
                  <option value="power-user">Power User - KSh 4,500/mo</option>
                  <option value="business-pro">Business Pro - KSh 7,500/mo</option>
                  <option value="enterprise">Enterprise - KSh 15,000/mo</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message">Message *</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  required
                ></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary btn-submit">
                Send Message 📨
              </button>
            </form>
            
            <div v-if="formSubmitted" class="success-message">
              <h3>✅ Message Sent!</h3>
              <p>Thank you for reaching out! We'll get back to you within 24 hours.</p>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <div class="info-card">
              <div class="info-icon">📞</div>
              <h3>Call Us</h3>
              <p>+254 727 895 108</p>
              <p>+254 703 551 813</p>
              <p class="info-note">Available 24/7</p>
            </div>
            
            <div class="info-card">
              <div class="info-icon">📧</div>
              <h3>Email Us</h3>
              <p>info@comradeswifi.co.ke</p>
              <p>support@comradeswifi.co.ke</p>
              <p class="info-note">Response within 2 hours</p>
            </div>
            
            <div class="info-card">
              <div class="info-icon">📍</div>
              <h3>Visit Our Office</h3>
              <p>Westlands Square, 3rd Floor</p>
              <p>Nairobi, Kenya</p>
              <p class="info-note">Mon-Sat: 8AM - 6PM</p>
            </div>
            
            <div class="info-card">
              <div class="info-icon">💬</div>
              <h3>Social Media</h3>
              <div class="social-links-contact">
                <a href="#" class="social-link">Facebook</a>
                <a href="#" class="social-link">Twitter</a>
                <a href="#" class="social-link">Instagram</a>
                <a href="#" class="social-link">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="container">
        <h2 class="section-title">Our Coverage Areas</h2>
        <div class="coverage-info">
          <div class="coverage-item">
            <h3>🏙️ Major Cities</h3>
            <p>Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika</p>
          </div>
          <div class="coverage-item">
            <h3>🏘️ Residential Areas</h3>
            <p>Westlands, Karen, Kilimani, Kileleshwa, Lavington, Parklands</p>
          </div>
          <div class="coverage-item">
            <h3>📈 Expanding Soon</h3>
            <p>Machakos, Nyeri, Meru, Kisii, Kakamega</p>
          </div>
        </div>
        <p class="coverage-note">Not sure if we cover your area? <a href="#" class="link-primary">Check availability</a></p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        location: '',
        plan: '',
        message: ''
      },
      formSubmitted: false
    }
  },
  methods: {
    submitForm() {
      // Simulate form submission
      console.log('Form submitted:', this.form)
      this.formSubmitted = true
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.form = {
          name: '',
          email: '',
          phone: '',
          location: '',
          plan: '',
          message: ''
        }
        this.formSubmitted = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.contact-hero {
  background: var(--gradient-2);
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

.contact-section {
  padding: 4rem 0;
  background: white;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
}

.contact-form-wrapper {
  background: linear-gradient(135deg, #FFF5F3 0%, #F3FBFF 100%);
  padding: 3rem;
  border-radius: 25px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.contact-form-wrapper h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-orange);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.btn-submit {
  width: 100%;
  padding: 1.2rem;
  font-size: 1.1rem;
  margin-top: 1rem;
}

.success-message {
  background: var(--gradient-2);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  margin-top: 2rem;
  animation: fadeInUp 0.5s ease;
}

.success-message h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-orange);
}

.info-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.info-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.info-card p {
  color: #666;
  margin-bottom: 0.5rem;
}

.info-note {
  color: var(--primary-orange);
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.social-links-contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-link {
  color: var(--electric-blue);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: var(--primary-orange);
}

.map-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #FFF5F3 0%, #F3FBFF 100%);
}

.coverage-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.coverage-item {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.coverage-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.coverage-item p {
  color: #666;
  line-height: 1.6;
}

.coverage-note {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.1rem;
  color: #666;
}

.link-primary {
  color: var(--primary-orange);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link-primary:hover {
  color: var(--primary-red);
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 968px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-form-wrapper {
    padding: 2rem;
  }
  
  .coverage-info {
    grid-template-columns: 1fr;
  }
}
</style>
