<template>
  <section class="referral-banner">
    <div class="container">
      <div class="referral-content">
        <div class="referral-icon">🎁</div>
        <div class="referral-text">
          <h2>Refer a Friend & Get Rewarded!</h2>
          <p>Earn <strong>KSh 500</strong> credit for every friend you refer. They get a <strong>discount</strong> too!</p>
        </div>
        <button class="btn-referral">
          Start Referring
          <span class="arrow">→</span>
        </button>
      </div>
      <div class="referral-steps">
        <div class="step">
          <div class="step-number">1</div>
          <p>Share your unique link</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <p>Friend signs up</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <p>Both get rewards!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ReferralBanner'
}
</script>

<style scoped>
.referral-banner {
  padding: 4rem 0;
  background: var(--gradient-red-blue);
  position: relative;
  overflow: hidden;
}

.referral-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.referral-banner::after {
  content: '';
  position: absolute;
  bottom: -50%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite reverse;
}

.referral-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}

.referral-icon {
  font-size: 5rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.referral-text {
  flex: 1;
  color: white;
}

.referral-text h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.referral-text p {
  font-size: 1.2rem;
  opacity: 0.95;
}

.referral-text strong {
  background: white;
  color: var(--brand-red);
  padding: 0.2rem 0.6rem;
  border-radius: 5px;
  font-weight: 700;
}

.btn-referral {
  padding: 1.2rem 2.5rem;
  background: white;
  color: var(--brand-red);
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-referral:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.btn-referral:hover .arrow {
  transform: translateX(5px);
}

.referral-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.step {
  text-align: center;
  color: white;
}

.step-number {
  width: 60px;
  height: 60px;
  background: white;
  color: var(--brand-blue);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0 auto 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  font-family: 'Montserrat', sans-serif;
}

.step p {
  font-size: 1.1rem;
  font-weight: 600;
}

@media (max-width: 968px) {
  .referral-content {
    flex-direction: column;
    text-align: center;
  }
  
  .referral-text h2 {
    font-size: 2rem;
  }
  
  .referral-steps {
    grid-template-columns: 1fr;
  }
}
</style>
