<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <img src="/images/logo.png" alt="Comrades WiFi" class="footer-logo-image" />
            <span class="footer-logo-text">Comrades <span class="footer-wifi-text">WiFi</span></span>
          </div>
          <p class="footer-tagline">Connecting Kenya, One Home at a Time</p>
          <div class="social-links">
            <a href="https://facebook.com" target="_blank" class="social-icon facebook">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" alt="Facebook" class="social-icon-img" />
            </a>
            <a href="https://instagram.com" target="_blank" class="social-icon instagram">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" class="social-icon-img" />
            </a>
            <a href="https://tiktok.com" target="_blank" class="social-icon tiktok">
              <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt="TikTok" class="social-icon-img" />
            </a>
            <a href="https://wa.me/254727895108" target="_blank" class="social-icon whatsapp">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" class="social-icon-img" />
            </a>
          </div>
        </div>
        
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/plans">Our Plans</router-link></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Coverage Map</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Support</h3>
          <ul>
            <li><router-link to="/contact">Contact Us</router-link></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Network Status</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>
              <img src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=40&h=40&fit=crop" alt="Phone" class="contact-icon" />
              +254 727 895 108
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=40&h=40&fit=crop" alt="Phone" class="contact-icon" />
              +254 703 551 813
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=40&h=40&fit=crop" alt="Email" class="contact-icon" />
              info@comradeswifi.co.ke
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=40&h=40&fit=crop" alt="Location" class="contact-icon" />
              Nairobi, Kenya
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1501139083538-0139583c060f?w=40&h=40&fit=crop" alt="Support" class="contact-icon" />
              24/7 Support
            </li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 Comrades WiFi. All rights reserved. Made with ❤️ in Kenya</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: var(--dark-bg);
  color: var(--text-light);
  padding: 4rem 0 2rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h3 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  background: var(--gradient-blue-red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.footer-logo-image {
  height: 50px;
  width: auto;
  object-fit: contain;
}

.footer-logo-text {
  background: var(--gradient-red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
}

.footer-wifi-text {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-tagline {
  color: #aaa;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-red-blue);
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.social-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.social-icon:hover .social-icon-img {
  transform: scale(1.15);
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.contact-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.footer-section ul li a {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: var(--brand-red);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #aaa;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
