<template>
  <section class="testimonials-section">
    <div class="container">
      <h2 class="section-title">What Our Customers Say</h2>
      <p class="section-subtitle">Join thousands of satisfied students and professionals</p>
      
      <div class="testimonials-grid">
        <div 
          class="testimonial-card" 
          v-for="(testimonial, index) in testimonials" 
          :key="index"
        >
          <div class="quote-icon">"</div>
          <p class="testimonial-text">{{ testimonial.text }}</p>
          <div class="testimonial-author">
            <div class="author-avatar">{{ testimonial.avatar }}</div>
            <div class="author-info">
              <h4>{{ testimonial.name }}</h4>
              <p>{{ testimonial.role }}</p>
            </div>
          </div>
          <div class="rating">
            <span v-for="star in 5" :key="star">⭐</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Testimonials',
  data() {
    return {
      testimonials: [
        {
          text: "I've been using Comrades Wi-Fi for 6 months now and it's super stable! Perfect for my online classes and Netflix.",
          name: "Sarah Kamau",
          role: "University Student",
          avatar: "👩‍🎓"
        },
        {
          text: "Best internet service for the price. I can work from home without any lag. The support team is also very responsive!",
          name: "David Ochieng",
          role: "Software Developer",
          avatar: "👨‍💻"
        },
        {
          text: "Fast installation and amazing speeds! My whole family can stream and browse at the same time. Highly recommend!",
          name: "Grace Wanjiru",
          role: "Business Owner",
          avatar: "👩‍💼"
        }
      ]
    }
  }
}
</script>

<style scoped>
.testimonials-section {
  padding: 5rem 0;
  background: white;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 100%);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-color: var(--brand-blue);
}

.quote-icon {
  font-size: 5rem;
  color: var(--brand-red);
  opacity: 0.2;
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  font-family: Georgia, serif;
  line-height: 1;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-dark);
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-blue-red);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.author-info h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.3rem;
}

.author-info p {
  font-size: 0.9rem;
  color: #666;
}

.rating {
  display: flex;
  gap: 0.3rem;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
