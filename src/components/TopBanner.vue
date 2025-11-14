<template>
  <div class="top-banner" @mouseenter="handleHover" @mouseleave="handleLeave">
    <div class="banner-overlay"></div>
    <img 
      src="/images/INTERNET1.jpg" 
      alt="Comrades WiFi Banner" 
      class="banner-image"
      :class="{ 'hovered': isHovered }"
    />
    <div class="banner-flash" :class="{ 'active': isHovered }"></div>
  </div>
</template>

<script>
export default {
  name: 'TopBanner',
  data() {
    return {
      isHovered: false
    }
  },
  methods: {
    handleHover() {
      this.isHovered = true
    },
    handleLeave() {
      this.isHovered = false
    }
  }
}
</script>

<style scoped>
.top-banner {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s ease;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.85;
  display: block;
}

.banner-image.hovered {
  transform: scale(1.05);
  opacity: 1;
  filter: brightness(1.1);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 102, 204, 0.3), rgba(220, 20, 60, 0.3));
  z-index: 1;
  transition: all 0.5s ease;
  pointer-events: none;
}

.top-banner:hover .banner-overlay {
  background: linear-gradient(135deg, rgba(0, 102, 204, 0.1), rgba(220, 20, 60, 0.1));
}

.banner-flash {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  z-index: 3;
  pointer-events: none;
  transition: left 0.8s ease;
}

.banner-flash.active {
  left: 150%;
}

/* Pulse animation on edges */
.top-banner::before,
.top-banner::after {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  z-index: 0;
  opacity: 0;
  transition: all 0.5s ease;
}

.top-banner::before {
  top: 20px;
  left: 20px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent);
}

.top-banner::after {
  bottom: 20px;
  right: 20px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent);
}

.top-banner:hover::before,
.top-banner:hover::after {
  opacity: 1;
  transform: scale(1.5);
}

/* Animations */
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

/* Responsive */
@media (max-width: 968px) {
  .top-banner {
    height: 300px;
  }
  
  .banner-title {
    font-size: 2.5rem;
  }
  
  .banner-content.hovered .banner-title {
    font-size: 2.7rem;
  }
  
  .banner-subtitle {
    font-size: 1.2rem;
  }
  
}

@media (max-width: 480px) {
  .top-banner {
    height: 450px;
  }
}
</style>
