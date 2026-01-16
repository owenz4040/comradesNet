<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="container">
        <h1 class="page-title">Contact Support</h1>
        <p class="page-subtitle">We're here to help you get connected!</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-simple">
          <div class="contact-card">
            <div class="contact-icon-large">📧</div>
            <h2>Email Support</h2>
            <a href="https://mail.google.com/mail/?view=cm&to=support@comradeswifi.net" target="_blank" class="contact-link">
              support@comradeswifi.net
            </a>
            <p class="contact-description">We respond within 2 hours</p>
          </div>

          <div class="contact-card">
            <div class="contact-icon-large">📞</div>
            <h2>Call Us</h2>
            <a href="tel:0793590575" class="contact-link">0793590575</a>
            <a href="tel:+254703551813" class="contact-link secondary">+254 703 551 813</a>
            <p class="contact-description">Available 24/7</p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-section">
          <div class="form-container">
            <h2>Send Us a Message</h2>
            <p class="form-subtitle">Fill out the form below and we'll get back to you within 2 hours</p>
            
            <form @submit.prevent="submitForm" class="contact-form">
              <div v-if="formSubmitted" class="success-message">
                ✅ Message sent successfully! We'll contact you soon.
              </div>
              
              <div v-if="formError" class="error-message">
                ❌ {{ formError }}
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    required 
                    placeholder="John Doe"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    required 
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="form.phone" 
                    required 
                    placeholder="0712345678"
                  />
                </div>

                <div class="form-group">
                  <label for="location">Location</label>
                  <input 
                    type="text" 
                    id="location" 
                    v-model="form.location" 
                    placeholder="Nairobi, Westlands"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="plan">Interested In</label>
                <select id="plan" v-model="form.plan">
                  <option value="">Select a plan...</option>
                  <option value="basic">Basic Plan - KSh 999/month</option>
                  <option value="standard">Standard Plan - KSh 1,999/month</option>
                  <option value="premium">Premium Plan - KSh 2,999/month</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required 
                  rows="5"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <!-- Cloudflare Turnstile -->
              <div class="form-group">
                <div 
                  class="cf-turnstile" 
                  data-sitekey="0x4AAAAAACM08WCEjH7OZ_Cm"
                  data-callback="onTurnstileSuccess"
                ></div>
              </div>

              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">📩 Send Message</span>
                <span v-else>⏳ Sending...</span>
              </button>
            </form>
          </div>
        </div>
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
      formSubmitted: false,
      formError: '',
      isSubmitting: false,
      turnstileToken: ''
    }
  },
  mounted() {
    // Set up Turnstile callback
    window.onTurnstileSuccess = (token) => {
      this.turnstileToken = token
    }
  },
  methods: {
    async submitForm() {
      // Check if Turnstile was completed
      if (!this.turnstileToken) {
        this.formError = 'Please complete the security check'
        return
      }

      this.isSubmitting = true
      this.formError = ''

      try {
        // Send to Supabase Edge Function for verification
        const response = await fetch('https://higyzdmedyacpiupxecm.supabase.co/functions/v1/submit-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...this.form,
            'cf-turnstile-response': this.turnstileToken
          })
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Submission failed')
        }

        // Success
        this.formSubmitted = true
        
        // Reset form after 5 seconds
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
          this.turnstileToken = ''
          // Reset Turnstile widget
          if (window.turnstile) {
            window.turnstile.reset()
          }
        }, 5000)
      } catch (error) {
        console.error('Form submission error:', error)
        this.formError = error.message || 'Failed to send message. Please try again or contact us directly.'
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.contact-hero {
  background: var(--gradient-red-blue);
  padding: 6rem 0 4rem;
  text-align: center;
  color: white;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.page-subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
}

.contact-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
}

.contact-simple {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;
}

.contact-card {
  background: white;
  padding: 4rem 3rem;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 3px solid transparent;
  position: relative;
  overflow: hidden;
}

.contact-card::before {
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

.contact-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 30px 80px rgba(220, 20, 60, 0.3);
  border-color: var(--brand-red);
}

.contact-card:hover::before {
  opacity: 0.03;
}

.contact-card > * {
  position: relative;
  z-index: 1;
}

.contact-icon-large {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: bounce 2s ease-in-out infinite;
}

.contact-card h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: var(--gradient-red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-link {
  display: block;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--brand-blue);
  text-decoration: none;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 15px;
  background: rgba(0, 102, 204, 0.05);
  transition: all 0.3s ease;
}

.contact-link:hover {
  background: var(--brand-blue);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 102, 204, 0.3);
}

.contact-link.secondary {
  font-size: 1.2rem;
  color: #666;
  background: rgba(0, 0, 0, 0.03);
}

.contact-link.secondary:hover {
  background: var(--brand-red);
  color: white;
}

.contact-description {
  font-size: 1.1rem;
  color: #666;
  margin-top: 1.5rem;
  font-weight: 500;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* Contact Form Styles */
.contact-form-section {
  margin-top: 5rem;
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  background: var(--gradient-red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.form-subtitle {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 1rem;
  border: 2px solid #E0E0E0;
  border-radius: 15px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  background: #F8F9FA;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--brand-red);
  background: white;
  box-shadow: 0 4px 20px rgba(220, 20, 60, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.success-message {
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  padding: 1.2rem;
  border-radius: 15px;
  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;
  animation: slideIn 0.5s ease;
}

.error-message {
  background: linear-gradient(135deg, #EF4444, #DC2626);
  color: white;
  padding: 1.2rem;
  border-radius: 15px;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submit-btn {
  background: var(--gradient-red-blue);
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(220, 20, 60, 0.3);
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(220, 20, 60, 0.5);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cf-turnstile {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .contact-simple {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-card {
    padding: 3rem 2rem;
  }

  .contact-icon-large {
    font-size: 4rem;
  }

  .form-container {
    padding: 2rem 1.5rem;
  }

  .form-container h2 {
    font-size: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
