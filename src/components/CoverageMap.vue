<template>
  <section class="coverage-map">
    <div class="container">
      <div class="map-header">
        <h2 class="section-title">📍 Our Coverage Area</h2>
        <p class="section-subtitle">Proudly Serving Angata Rongai, Kenya & Surrounding Areas</p>
      </div>
      
      <div class="map-content">
        <div class="map-info">
          <div class="location-badge">
            <div class="badge-icon">🌍</div>
            <div class="badge-content">
              <h3>Main Location</h3>
              <p>Angata Rongai, Kajiado County</p>
            </div>
          </div>
          
          <div class="coverage-list">
            <h3>Areas We Cover:</h3>
            <ul>
              <li>
                <span class="check-icon">✓</span>
                <span>Ongata Rongai Town Center</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span>Rimpa</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span>Nkoroi</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span>Tuala</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span>Sokon Mjinga</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span>Gate Way</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span>Enkare Narok</span>
              </li>
              <li>
                <span class="check-icon">✓</span>
                <span>Magadi Road Areas</span>
              </li>
            </ul>
          </div>
          
          <div class="contact-box">
            <div class="contact-icon">📞</div>
            <div>
              <h4>Check Coverage in Your Area</h4>
              <a href="tel:+254727895108" class="contact-link">+254 727 895 108</a>
            </div>
          </div>
        </div>
        
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.234567890123!2d36.7037!3d-1.3989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f05d7e8c9c1e5%3A0x3a0b0b0b0b0b0b0b!2sOngata%20Rongai%2C%20Kenya!5e0!3m2!1sen!2ske!4v1234567890123!5m2!1sen!2ske"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="google-map"
          ></iframe>
          <div class="map-overlay">
            <div class="pulse-dot"></div>
            <div class="location-label">
              <strong>📍 Ongata Rongai</strong>
            </div>
          </div>
        </div>
      </div>
      
      <div class="coverage-stats">
        <div class="stat-card">
          <div class="stat-icon">📡</div>
          <div class="stat-value">8+</div>
          <div class="stat-label">Coverage Zones</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏘️</div>
          <div class="stat-value">100+</div>
          <div class="stat-label">Residential Areas</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-value">99.9%</div>
          <div class="stat-label">Network Uptime</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🚀</div>
          <div class="stat-value">24/7</div>
          <div class="stat-label">Support Available</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CoverageMap'
}
</script>

<style scoped>
.coverage-map {
  padding: 6rem 0;
  background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
  position: relative;
  overflow: hidden;
}

.coverage-map::before {
  content: '🗺️';
  position: absolute;
  font-size: 25rem;
  opacity: 0.02;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.map-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.map-content {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.map-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.location-badge {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 3px solid transparent;
  transition: all 0.3s ease;
}

.location-badge:hover {
  border-color: var(--brand-red);
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(220, 20, 60, 0.2);
}

.badge-icon {
  font-size: 3rem;
  animation: pulse 2s ease-in-out infinite;
}

.badge-content h3 {
  font-size: 1.2rem;
  color: var(--brand-red);
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.badge-content p {
  color: #666;
  font-size: 1.1rem;
  font-weight: 600;
}

.coverage-list {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.coverage-list h3 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: var(--brand-blue);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.coverage-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.coverage-list li {
  padding: 0.8rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.coverage-list li:last-child {
  border-bottom: none;
}

.coverage-list li:hover {
  padding-left: 0.5rem;
  color: var(--brand-blue);
}

.check-icon {
  background: var(--gradient-blue);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  flex-shrink: 0;
}

.contact-box {
  background: var(--gradient-red-blue);
  padding: 2rem;
  border-radius: 20px;
  color: white;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 10px 40px rgba(220, 20, 60, 0.3);
  transition: all 0.3s ease;
}

.contact-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(220, 20, 60, 0.4);
}

.contact-icon {
  font-size: 2.5rem;
  animation: float 3s ease-in-out infinite;
}

.contact-box h4 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-family: 'Montserrat', sans-serif;
}

.contact-link {
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  display: inline-block;
  transition: all 0.3s ease;
}

.contact-link:hover {
  transform: scale(1.1);
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.map-container {
  position: relative;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.15);
  height: 500px;
  border: 5px solid white;
}

.google-map {
  filter: grayscale(20%);
  transition: all 0.3s ease;
}

.map-container:hover .google-map {
  filter: grayscale(0%);
}

.map-overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: fadeInUp 1s ease;
}

.pulse-dot {
  width: 15px;
  height: 15px;
  background: var(--brand-red);
  border-radius: 50%;
  position: relative;
  animation: pulse 2s ease-in-out infinite;
}

.pulse-dot::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--brand-red);
  border-radius: 50%;
  animation: ripple 2s ease-out infinite;
}

.location-label {
  font-weight: 700;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
}

.coverage-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.stat-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.stat-card:nth-child(1):hover {
  border-color: var(--brand-red);
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(220, 20, 60, 0.2);
}

.stat-card:nth-child(2):hover {
  border-color: var(--brand-blue);
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 102, 204, 0.2);
}

.stat-card:nth-child(3):hover {
  border-color: var(--brand-red);
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(220, 20, 60, 0.2);
}

.stat-card:nth-child(4):hover {
  border-color: var(--brand-blue);
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 102, 204, 0.2);
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 900;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
}

.stat-label {
  color: #666;
  font-size: 1rem;
  font-weight: 600;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
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
  .map-content {
    grid-template-columns: 1fr;
  }
  
  .map-container {
    height: 400px;
  }
  
  .coverage-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .coverage-map {
    padding: 4rem 0;
  }
  
  .map-container {
    height: 300px;
  }
  
  .coverage-stats {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 2rem 1.5rem;
  }
  
  .map-overlay {
    font-size: 0.9rem;
    padding: 0.8rem 1rem;
  }
}
</style>
