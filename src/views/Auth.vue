<template>
  <div class="auth-page">
    <div class="auth-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
    </div>
    
    <div class="chatbot-container">
      <!-- Logo Section -->
      <div class="chatbot-header">
        <img src="/images/logo.png" alt="Comrades WiFi" class="logo-image" />
        <div class="header-text">
          <h1>Comrades <span class="wifi-text">WiFi</span></h1>
          <p>👋 Hi! I'm your virtual assistant. How can I help you get started?</p>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="chat-messages" ref="chatMessages">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
          <div class="message-avatar" v-if="message.type === 'bot'">🤖</div>
          <div class="message-content">
            <p v-html="message.text"></p>
          </div>
          <div class="message-avatar" v-if="message.type === 'user'">👤</div>
        </div>
        <div v-if="isTyping" class="message bot">
          <div class="message-avatar">🤖</div>
          <div class="message-content typing">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions" v-if="showQuickActions">
        <button @click="selectOption('plans')" class="action-btn">
          💰 View Internet Plans
        </button>
        <button @click="selectOption('coverage')" class="action-btn">
          📍 Check Coverage
        </button>
        <button @click="selectOption('contact')" class="action-btn">
          📞 Contact Support
        </button>
        <button @click="selectOption('how-to-order')" class="action-btn">
          📝 How to Order
        </button>
      </div>

      <!-- Input Area -->
      <div class="chat-input-area">
        <input 
          v-model="userInput" 
          @keypress.enter="sendMessage"
          type="text" 
          placeholder="Type your message here..."
          class="chat-input"
        />
        <button @click="sendMessage" class="send-btn" :disabled="!userInput.trim()">
          📤
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      userInput: '',
      messages: [],
      isTyping: false,
      showQuickActions: true
    }
  },
  mounted() {
    // Welcome message
    this.addBotMessage('Hello! 👋 Welcome to <strong>Comrades WiFi</strong>!<br><br>I\'m here to help you get connected with fast, affordable, and reliable internet. What would you like to know?')
  },
  methods: {
    addBotMessage(text) {
      this.messages.push({
        type: 'bot',
        text: text
      })
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    addUserMessage(text) {
      this.messages.push({
        type: 'user',
        text: text
      })
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    scrollToBottom() {
      const chatMessages = this.$refs.chatMessages
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    },
    sendMessage() {
      if (!this.userInput.trim()) return
      
      const message = this.userInput.trim()
      this.addUserMessage(message)
      this.userInput = ''
      this.showQuickActions = false
      
      // Simulate bot typing
      this.isTyping = true
      setTimeout(() => {
        this.isTyping = false
        this.respondToMessage(message)
      }, 1500)
    },
    selectOption(option) {
      this.showQuickActions = false
      this.isTyping = true
      
      setTimeout(() => {
        this.isTyping = false
        
        switch(option) {
          case 'plans':
            this.addBotMessage(`🌟 <strong>Our Internet Plans:</strong><br><br>
              📦 <strong>Starter (5 Mbps)</strong> - KSh 999/month<br>
              Perfect for browsing and social media<br><br>
              📦 <strong>Standard (10 Mbps)</strong> - KSh 1,399/month<br>
              Great for HD streaming and casual gaming<br><br>
              📦 <strong>Premium (15 Mbps)</strong> - KSh 1,799/month<br>
              Ideal for heavy streaming and gaming<br><br>
              📦 <strong>Ultra (20 Mbps)</strong> - KSh 2,199/month<br>
              Maximum speed for power users<br><br>
              All plans include:<br>
              ✓ Unlimited data<br>
              ✓ FREE installation<br>
              ✓ 24/7 support<br><br>
              Would you like to order? Type 'order' to get started!`)
            break
            
          case 'coverage':
            this.addBotMessage(`📍 <strong>Coverage Areas:</strong><br><br>
              We currently cover:<br>
              ✓ Olekasai A<br>
              ✓ Olekasasi B<br>
              ✓ Tuala<br>
              ✓ Mayor Road<br>
              ✓ Maasai Lodge<br>
              ✓ Tumaini<br>
              ✓ Gataka Road<br>
              ✓ Tuskys<br><br>
              To check if we cover your specific location, please contact us!`)
            this.showQuickActions = true
            break
            
          case 'contact':
            this.addBotMessage(`📞 <strong>Contact Us:</strong><br><br>
              <strong>Phone:</strong><br>
              📞 <a href="tel:0793590575">0793590575</a><br>
              📞 <a href="tel:+254703551813">+254 703 551 813</a><br><br>
              <strong>Email:</strong><br>
              📧 <a href="https://mail.google.com/mail/?view=cm&to=support@comradeswifi.net" target="_blank">support@comradeswifi.net</a><br><br>
              We're available 24/7 to help you! 🎉`)
            this.showQuickActions = true
            break
            
          case 'how-to-order':
            this.addBotMessage(`📝 <strong>How to Order:</strong><br><br>
              <strong>Step 1:</strong> Contact us via phone or email<br>
              📞 Call: 0793590575<br>
              📧 Email: support@comradeswifi.net<br><br>
              <strong>Step 2:</strong> Choose your internet plan<br>
              Our team will help you select the perfect plan for your needs<br><br>
              <strong>Step 3:</strong> Schedule installation<br>
              We offer FREE installation at a time convenient for you<br><br>
              <strong>Step 4:</strong> Get connected!<br>
              Our technicians will set everything up and you're ready to go! 🚀<br><br>
              <strong>Payment:</strong> Pay via M-PESA or bank transfer<br><br>
              Would you like to call us now?`)
            this.showQuickActions = true
            break
        }
      }, 1500)
    },
    respondToMessage(message) {
      const lowerMessage = message.toLowerCase()
      
      if (lowerMessage.includes('plan') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        this.selectOption('plans')
      } else if (lowerMessage.includes('coverage') || lowerMessage.includes('area') || lowerMessage.includes('location')) {
        this.selectOption('coverage')
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
        this.selectOption('contact')
      } else if (lowerMessage.includes('order') || lowerMessage.includes('buy') || lowerMessage.includes('subscribe') || lowerMessage.includes('get started')) {
        this.selectOption('how-to-order')
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        this.addBotMessage('Hello! 👋 How can I assist you today? You can ask about our plans, coverage areas, or how to order!')
        this.showQuickActions = true
      } else {
        this.addBotMessage(`I understand you're asking about "${message}". Let me help you with that!<br><br>You can ask me about:<br>
          💰 Internet plans and pricing<br>
          📍 Coverage areas<br>
          📞 Contact information<br>
          📝 How to order<br><br>
          Or use the quick action buttons below!`)
        this.showQuickActions = true
      }
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.auth-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 50%, #F8F9FA 100%);
  z-index: -1;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
  animation: float 8s ease-in-out infinite;
}

.circle-1 {
  width: 500px;
  height: 500px;
  background: var(--gradient-red);
  top: -200px;
  right: -200px;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: var(--gradient-blue);
  bottom: -150px;
  left: -150px;
  animation-delay: 2s;
}

.circle-3 {
  width: 300px;
  height: 300px;
  background: var(--gradient-red-blue);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

/* Chatbot Styles */
.chatbot-container {
  width: 100%;
  max-width: 900px;
  height: 85vh;
  background: white;
  border-radius: 30px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.chatbot-header {
  background: var(--gradient-red-blue);
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.chatbot-header .logo-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: white;
  padding: 0.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.header-text h1 {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.3rem;
}

.wifi-text {
  color: #FFD700;
}

.header-text p {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  animation: fadeInUp 0.4s ease;
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.message.bot .message-avatar {
  background: var(--gradient-blue);
}

.message.user .message-avatar {
  background: var(--gradient-red);
}

.message-content {
  max-width: 70%;
  padding: 1.2rem 1.5rem;
  border-radius: 20px;
  line-height: 1.6;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
}

.message.bot .message-content {
  background: white;
  border-bottom-left-radius: 5px;
}

.message.user .message-content {
  background: var(--gradient-red-blue);
  color: white;
  border-bottom-right-radius: 5px;
}

.message-content p {
  margin: 0;
}

.message-content a {
  color: var(--brand-blue);
  text-decoration: underline;
  font-weight: 600;
}

.message.user .message-content a {
  color: #FFD700;
}

.message-content strong {
  font-weight: 700;
}

.typing {
  background: white;
  padding: 1rem 1.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.typing span {
  width: 10px;
  height: 10px;
  background: var(--brand-blue);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.quick-actions {
  padding: 1.5rem 2rem;
  background: white;
  border-top: 2px solid #f0f0f0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-btn {
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #F8F9FA, #FFFFFF);
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.action-btn:hover {
  background: var(--gradient-red-blue);
  color: white;
  border-color: transparent;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(220, 20, 60, 0.3);
}

.chat-input-area {
  padding: 1.5rem 2rem;
  background: white;
  border-top: 2px solid #f0f0f0;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.chat-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  outline: none;
}

.chat-input:focus {
  border-color: var(--brand-blue);
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.send-btn {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: var(--gradient-red-blue);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(220, 20, 60, 0.3);
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.1) rotate(15deg);
  box-shadow: 0 8px 20px rgba(220, 20, 60, 0.4);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Scrollbar */
.chat-messages::-webkit-scrollbar {
  width: 8px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: var(--gradient-blue);
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: var(--gradient-red);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .chatbot-container {
    height: 90vh;
    border-radius: 20px;
  }

  .chatbot-header {
    padding: 1.5rem;
  }

  .chatbot-header .logo-image {
    width: 50px;
    height: 50px;
  }

  .header-text h1 {
    font-size: 1.5rem;
  }

  .header-text p {
    font-size: 0.9rem;
  }

  .chat-messages {
    padding: 1rem;
  }

  .message-content {
    max-width: 85%;
  }

  .quick-actions {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .chat-input-area {
    padding: 1rem;
  }
}
</style>
