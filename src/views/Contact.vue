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
}
</style>
