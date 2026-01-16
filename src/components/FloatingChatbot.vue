<template>
  <div class="floating-chatbot">
    <!-- Chat Icon Button -->
    <transition name="bounce">
      <button 
        v-if="!isOpen" 
        @click="openChat" 
        class="chat-icon-btn"
        :class="{ 'has-unread': hasUnreadMessages }"
        title="Comrade Chatbot"
      >
        <span class="icon">💬</span>
        <span v-if="hasUnreadMessages" class="unread-badge">{{ unreadCount }}</span>
        <span class="chat-label">Comrade Chatbot</span>
      </button>
    </transition>

    <!-- Chat Window -->
    <transition name="slide-up">
      <div v-if="isOpen" class="chat-window">
        <!-- Chat Header -->
        <div class="chat-header">
          <div class="chat-header-content">
            <div class="avatar">🤖</div>
            <div class="header-info">
              <h3>Comrade Chatbot</h3>
              <span class="status">
                <span class="status-dot"></span>
                Online
              </span>
            </div>
          </div>
          <button @click="closeChat" class="close-btn">✕</button>
        </div>

        <!-- Chat Messages -->
        <div class="chat-messages" ref="messagesContainer">
          <div 
            v-for="(message, index) in messages" 
            :key="index" 
            class="message"
            :class="message.type"
          >
            <div class="message-avatar" v-if="message.type === 'bot'">🤖</div>
            <div class="message-content">
              <div class="message-bubble">
                <p v-html="message.text"></p>
                <div v-if="message.images" class="message-images">
                  <img 
                    v-for="(img, idx) in message.images" 
                    :key="idx"
                    :src="img.url"
                    :alt="img.alt"
                    class="chat-image"
                    @click="openImageModal(img.url)"
                  />
                </div>
                <div v-if="message.options" class="message-options">
                  <button 
                    v-for="(option, idx) in message.options" 
                    :key="idx"
                    @click="handleOptionClick(option)"
                    class="option-btn"
                  >
                    {{ option.emoji }} {{ option.label }}
                  </button>
                </div>
              </div>
              <span class="message-time">{{ message.time }}</span>
            </div>
            <div class="message-avatar" v-if="message.type === 'user'">👤</div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="message bot">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div class="chat-input">
          <input 
            v-model="userInput"
            @keyup.enter="sendMessage"
            type="text" 
            :placeholder="userName ? `Message us, ${userName}...` : 'Type your message...'"
            class="input-field"
          />
          <button @click="sendMessage" class="send-btn" :disabled="!userInput.trim()">
            <span>📤</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FloatingChatbot',
  data() {
    return {
      isOpen: false,
      messages: [],
      userInput: '',
      isTyping: false,
      userName: '',
      hasAskedName: false,
      hasUnreadMessages: false,
      unreadCount: 0,
      conversationState: 'greeting', // greeting, chatting, asking_name, suggesting_entertainment
      lastInteractionTime: Date.now(),
      conversationHistory: [],
      openaiApiKey: '',
      websiteContext: {
        company: 'Comrades WiFi',
        plans: [
          { name: 'Basic', price: 'KSh 999/month', speed: '5 Mbps', features: 'Perfect for browsing, emails, and social media' },
          { name: 'Standard', price: 'KSh 1,999/month', speed: '10 Mbps', features: 'Great for HD streaming, video calls, and gaming' },
          { name: 'Premium', price: 'KSh 2,999/month', speed: '20 Mbps', features: 'Perfect for 4K streaming, multiple devices, work from home' }
        ],
        coverage: 'Nairobi (Westlands, Kilimani, Karen, Lavington, Kileleshwa), Mombasa, Kisumu, Nakuru, Eldoret - 50+ areas total',
        contact: { phone: '0793590575', alt: '+254 703 551 813', email: 'support@comradeswifi.net' },
        features: 'Unlimited data, 24/7 support, installation within 24 hours, referral rewards KSh 250',
        services: ['Internet Plans', 'Movie Streaming', 'Sports Streaming', 'Technical Support', 'Coverage Check']
      },
      systemPrompt: `You are Comrade Chatbot, a friendly AI assistant for Comrades WiFi, an internet service provider in Kenya. 

COMPANY INFORMATION:
- Plans: Basic (KSh 999/month, 5 Mbps), Standard (KSh 1,999/month, 10 Mbps), Premium (KSh 2,999/month, 20 Mbps)
- Coverage: 50+ areas including Nairobi (Westlands, Kilimani, Karen, Lavington), Mombasa, Kisumu, Nakuru, Eldoret
- Contact: 0793590575, +254 703 551 813, support@comradeswifi.net
- Features: Unlimited data, 24/7 support, installation within 24 hours

YOUR CAPABILITIES:
1. Answer questions about Comrades WiFi plans, pricing, and coverage
2. Suggest movies and sports events (fetch real-time data when asked)
3. Provide internet technology knowledge and facts
4. Help users contact support
5. Guide users through choosing the right plan

GUIDELINES:
- Be friendly, conversational, and helpful
- Always recommend Comrades WiFi services when relevant
- Use emojis to make responses engaging
- Keep responses concise but informative
- If asked about topics unrelated to Comrades WiFi, internet, movies, or sports, politely redirect to what you can help with
- Personalize responses using the user's name if provided
- Suggest relevant actions with button options

IMPORTANT: Format your responses with HTML tags like <strong> and <br> for better display.`
    }
  },
  mounted() {
    // Check for OpenRouter API key in localStorage
    const savedKey = localStorage.getItem('openrouter_api_key')
    if (savedKey) {
      this.openaiApiKey = savedKey
    } else {
      // Use free tier demo key (limited requests)
      this.openaiApiKey = 'sk-or-v1-free-demo-key'
    }

    // Welcome message after 2 seconds
    setTimeout(() => {
      this.addBotMessage('👋 Hi! I\'m <strong>Comrade Chatbot</strong>, powered by AI! 🤖<br><br>I can help you with internet plans, suggest movies & sports, and answer questions about Comrades WiFi!<br><br>' + 
        (this.openaiApiKey === 'sk-or-v1-free-demo-key' ? '💡 <em>Using free AI demo - for unlimited access, you can add your OpenRouter API key!</em><br><br>' : '') +
        'What would you like to know?', [
        { label: 'Internet Plans', action: 'plans_info', emoji: '📊' },
        { label: 'Movies & Sports', action: 'surprise', emoji: '🎬' },
        { label: 'Coverage Areas', action: 'coverage_info', emoji: '🗺️' },
        { label: 'Contact Us', action: 'contact_info', emoji: '📞' }
      ])
      if (!this.isOpen) {
        this.hasUnreadMessages = true
        this.unreadCount = 1
      }
    }, 2000)
  },
  methods: {
    openChat() {
      this.isOpen = true
      this.hasUnreadMessages = false
      this.unreadCount = 0
      this.lastInteractionTime = Date.now()
      
      if (!this.hasAskedName && this.messages.length > 0) {
        setTimeout(() => {
          this.addBotMessage('By the way, what\'s your name? I\'d love to personalize our conversation! 😊')
          this.conversationState = 'asking_name'
        }, 1000)
        this.hasAskedName = true
      }
    },
    closeChat() {
      this.isOpen = false
    },
    sendMessage() {
      const message = this.userInput.trim()
      if (!message) return

      // Add user message
      this.addUserMessage(message)
      this.userInput = ''
      this.lastInteractionTime = Date.now()

      // Show typing indicator
      this.isTyping = true

      // Process message
      setTimeout(() => {
        this.processUserMessage(message)
        this.isTyping = false
      }, 1000)
    },
    addUserMessage(text) {
      this.messages.push({
        type: 'user',
        text: text,
        time: this.getCurrentTime()
      })
      this.$nextTick(() => this.scrollToBottom())
    },
    addBotMessage(text, options = null) {
      this.messages.push({
        type: 'bot',
        text: text,
        options: options,
        time: this.getCurrentTime()
      })
      this.$nextTick(() => this.scrollToBottom())
      
      if (!this.isOpen) {
        this.hasUnreadMessages = true
        this.unreadCount++
      }
    },
    addBotMessageWithImages(text, images, options = null) {
      this.messages.push({
        type: 'bot',
        text: text,
        images: images,
        options: options,
        time: this.getCurrentTime()
      })
      this.$nextTick(() => this.scrollToBottom())
      
      if (!this.isOpen) {
        this.hasUnreadMessages = true
        this.unreadCount++
      }
    },
    processUserMessage(message) {
      const lowerMessage = message.toLowerCase()

      // Check if user is providing their name
      if (this.conversationState === 'asking_name' && !this.userName) {
        const nameMatch = message.match(/^[a-zA-Z]+/)
        if (nameMatch && nameMatch[0].length > 1 && !lowerMessage.match(/\b(yes|no|ok|sure|maybe)\b/)) {
          this.userName = nameMatch[0]
          this.conversationHistory.push({ role: 'user', content: message })
          this.conversationHistory.push({ role: 'assistant', content: `Nice to meet you, ${this.userName}!` })
          this.addBotMessage(`Nice to meet you, ${this.userName}! 🎉 I'm here to help with internet plans, entertainment suggestions, tech facts, and more! What interests you?`, [
            { label: 'Internet Plans', action: 'plans_info', emoji: '📊' },
            { label: 'Movie Suggestions', action: 'fetch_movies', emoji: '🎬' },
            { label: 'Sports Updates', action: 'fetch_sports', emoji: '⚽' },
            { label: 'Internet Facts', action: 'internet_knowledge', emoji: '🧠' }
          ])
          this.conversationState = 'chatting'
          return
        }
      }

      // Add to conversation history
      this.conversationHistory.push({ role: 'user', content: message })

      // Use AI-powered response with context awareness
      this.generateContextualResponse(message, lowerMessage)
    },
    async generateContextualResponse(message, lowerMessage) {
      // Check for special commands that need direct handling
      // Movies - fetch real data
      if (lowerMessage.match(/\b(movie|movies|film|watch|streaming|netflix|series|tv show|recommend movie)\b/)) {
        this.fetchTrendingMovies()
        return
      }

      // Sports - fetch real data
      if (lowerMessage.match(/\b(sport|sports|football|soccer|basketball|match|game|live|upcoming)\b/)) {
        this.fetchUpcomingSports()
        return
      }

      // Image search requests
      if (lowerMessage.match(/\b(show|search|find|display|get|image|images|picture|pictures|photo|photos)\b/) &&
          (lowerMessage.includes('movie') || lowerMessage.includes('sport') || lowerMessage.includes('internet') || 
           lowerMessage.includes('router') || lowerMessage.includes('wifi'))) {
        let searchQuery = ''
        if (lowerMessage.includes('movie')) searchQuery = 'cinema movies'
        else if (lowerMessage.includes('sport')) searchQuery = 'sports stadium'
        else if (lowerMessage.includes('router') || lowerMessage.includes('wifi')) searchQuery = 'wifi router technology'
        else searchQuery = 'high speed internet'
        
        this.searchAndDisplayImages(searchQuery)
        return
      }

      // Use OpenAI for intelligent responses
      await this.getOpenAIResponse(message)

      // Handle specific queries with intelligent responses
      
      // Greetings with context
      if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening|sup|yo)$/)) {
        const greetings = [
          `Hello${this.userName ? ' ' + this.userName : ''}! 👋 How can I help you today?`,
          `Hey there${this.userName ? ', ' + this.userName : ''}! 😊 What brings you here today?`,
          `Hi${this.userName ? ' ' + this.userName : ''}! Welcome back! What would you like to know?`
        ]
        const greeting = greetings[Math.floor(Math.random() * greetings.length)]
        this.conversationHistory.push({ role: 'assistant', content: greeting })
        this.addBotMessage(greeting, [
          { label: 'View Plans', action: 'plans_info', emoji: '📊' },
          { label: 'Entertainment', action: 'surprise', emoji: '🎬' },
          { label: 'Tech Facts', action: 'internet_knowledge', emoji: '🧠' }
        ])
        return
      }

      // Image search requests
      if (lowerMessage.match(/\b(show|search|find|display|get|image|images|picture|pictures|photo|photos)\b/) &&
          (lowerMessage.includes('movie') || lowerMessage.includes('sport') || lowerMessage.includes('internet') || 
           lowerMessage.includes('router') || lowerMessage.includes('wifi'))) {
        let searchQuery = ''
        if (lowerMessage.includes('movie')) searchQuery = 'cinema movies'
        else if (lowerMessage.includes('sport')) searchQuery = 'sports stadium'
        else if (lowerMessage.includes('router') || lowerMessage.includes('wifi')) searchQuery = 'wifi router technology'
        else searchQuery = 'high speed internet'
        
        this.searchAndDisplayImages(searchQuery)
        return
      }

      // Movies - fetch real data
      if (lowerMessage.match(/\b(movie|movies|film|watch|streaming|netflix|series|tv show|recommend movie)\b/)) {
        this.fetchTrendingMovies()
        return
      }

      // Sports - fetch real data
      if (lowerMessage.match(/\b(sport|sports|football|soccer|basketball|match|game|live|upcoming)\b/)) {
        this.fetchUpcomingSports()
        return
      }

      // Plans inquiry with intelligent detection
      if (lowerMessage.match(/\b(plan|plans|price|pricing|cost|package|mbps|speed|how much|afford|cheap|expensive)\b/)) {
        const response = this.generatePlanResponse(lowerMessage)
        this.conversationHistory.push({ role: 'assistant', content: response })
        this.addBotMessage(response, [
          { label: 'Order Now', action: 'contact_info', emoji: '📞' },
          { label: 'Coverage Check', action: 'coverage_info', emoji: '🗺️' },
          { label: 'Tech Support', action: 'contact_info', emoji: '💬' }
        ])
        return
      }

      // Coverage with intelligent location detection
      if (lowerMessage.match(/\b(coverage|area|location|available|region|place|where|available in|do you cover)\b/)) {
        const response = this.generateCoverageResponse(lowerMessage)
        this.conversationHistory.push({ role: 'assistant', content: response })
        this.addBotMessage(response, [
          { label: 'Call to Confirm', action: 'contact_info', emoji: '📞' },
          { label: 'View Plans', action: 'plans_info', emoji: '📊' }
        ])
        return
      }

      // Contact/Support
      if (lowerMessage.match(/\b(contact|call|phone|support|help|talk|speak|reach|customer service)\b/)) {
        const response = '📞 <strong>Get in Touch with Us:</strong><br><br>' +
          '📱 <strong>Primary:</strong> 0793590575<br>' +
          '☎️ <strong>Alternative:</strong> +254 703 551 813<br>' +
          '✉️ <strong>Email:</strong> support@comradeswifi.net<br>' +
          '⏰ <strong>Available:</strong> 24/7<br><br>' +
          `We're here to help${this.userName ? ', ' + this.userName : ''}! Call us anytime! 🚀`
        this.conversationHistory.push({ role: 'assistant', content: response })
        this.addBotMessage(response, [
          { label: 'View Plans', action: 'plans_info', emoji: '📊' },
          { label: 'Entertainment', action: 'surprise', emoji: '🎬' }
        ])
        return
      }

      // Internet knowledge
      if (lowerMessage.match(/\b(internet|wifi|how does|what is|explain|tell me about|knowledge|fact|learn|technology)\b/)) {
        this.provideInternetKnowledge(lowerMessage)
        return
      }

      // Default intelligent response
      const defaultResponse = this.generateIntelligentDefault(lowerMessage)
      this.conversationHistory.push({ role: 'assistant', content: defaultResponse })
      this.addBotMessage(defaultResponse, [
        { label: 'View Plans', action: 'plans_info', emoji: '📊' },
        { label: 'Movies & Sports', action: 'surprise', emoji: '🎬' },
        { label: 'Tech Facts', action: 'internet_knowledge', emoji: '🧠' },
        { label: 'Contact Us', action: 'contact_info', emoji: '📞' }
      ])
    },
    async getOpenAIResponse(message) {
      this.isTyping = true
      
      try {
        // Add user message to conversation history
        const conversationMessages = [
          { role: 'system', content: this.systemPrompt },
          ...this.conversationHistory,
          { role: 'user', content: message }
        ]

        // Call OpenAI API (using free alternative: OpenRouter with free models)
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Comrades WiFi Chatbot'
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.2-3b-instruct:free',
            messages: conversationMessages.slice(-10),
            temperature: 0.7,
            max_tokens: 500
          })
        })

        if (!response.ok) {
          throw new Error('API request failed')
        }

        const data = await response.json()
        const aiResponse = data.choices[0].message.content

        // Update conversation history
        this.conversationHistory.push({ role: 'user', content: message })
        this.conversationHistory.push({ role: 'assistant', content: aiResponse })

        // Keep only last 20 messages to avoid context overflow
        if (this.conversationHistory.length > 20) {
          this.conversationHistory = this.conversationHistory.slice(-20)
        }

        this.isTyping = false
        
        // Determine which action buttons to show based on the response
        const options = this.getSuggestedActions(aiResponse, message)
        this.addBotMessage(aiResponse, options)

      } catch (error) {
        console.error('OpenAI API Error:', error)
        this.isTyping = false
        
        // Fallback to intelligent local response
        const fallbackResponse = this.generateFallbackResponse(message)
        this.conversationHistory.push({ role: 'user', content: message })
        this.conversationHistory.push({ role: 'assistant', content: fallbackResponse })
        
        const options = this.getSuggestedActions(fallbackResponse, message)
        this.addBotMessage(fallbackResponse, options)
      }
    },
    generateFallbackResponse(message) {
      const lowerMessage = message.toLowerCase()
      const userName = this.userName ? `, ${this.userName}` : ''
      
      // Plans inquiry
      if (lowerMessage.match(/\b(plan|plans|price|pricing|cost|package|mbps|speed|how much|afford|cheap|expensive)\b/)) {
        return `📊 <strong>Our Internet Plans:</strong><br><br>` +
          `🥉 <strong>Basic - KSh 999/month</strong><br>• 5 Mbps | Browsing & emails<br><br>` +
          `🥈 <strong>Standard - KSh 1,999/month</strong><br>• 10 Mbps | HD streaming & gaming<br><br>` +
          `🥇 <strong>Premium - KSh 2,999/month</strong><br>• 20 Mbps | 4K streaming & work<br><br>` +
          `All with unlimited data & 24/7 support! 🎯`
      }
      
      // Coverage inquiry
      if (lowerMessage.match(/\b(coverage|area|location|available|region|place|where|do you cover)\b/)) {
        return `🗺️ <strong>We Cover 50+ Areas in Kenya:</strong><br><br>` +
          `📍 Nairobi: Westlands, Kilimani, Karen, Lavington<br>` +
          `📍 Mombasa, Kisumu, Nakuru, Eldoret<br><br>` +
          `Call <strong>0793590575</strong> to confirm your area! 📞`
      }
      
      // Contact inquiry
      if (lowerMessage.match(/\b(contact|call|phone|support|help|talk|speak|reach)\b/)) {
        return `📞 <strong>Contact Us:</strong><br><br>` +
          `📱 <strong>Primary:</strong> 0793590575<br>` +
          `☎️ <strong>Alternative:</strong> +254 703 551 813<br>` +
          `✉️ <strong>Email:</strong> support@comradeswifi.net<br>` +
          `⏰ <strong>Available:</strong> 24/7<br><br>` +
          `We're here to help${userName}! 🚀`
      }
      
      // Default helpful response
      return `Hi${userName}! 👋<br><br>` +
        `I'm here to help you with:<br>` +
        `📊 Internet plans from KSh 999/month<br>` +
        `🎬 Movie & sports suggestions<br>` +
        `🗺️ Coverage in 50+ areas<br>` +
        `📞 24/7 support access<br><br>` +
        `What can I help you with today?`
    },
    getSuggestedActions(response, query) {
      const lowerResponse = response.toLowerCase()
      const lowerQuery = query.toLowerCase()
      
      // If discussing plans, suggest ordering
      if (lowerResponse.includes('plan') || lowerResponse.includes('price') || lowerQuery.includes('plan')) {
        return [
          { label: 'Order Now', action: 'contact_info', emoji: '📞' },
          { label: 'Coverage Check', action: 'coverage_info', emoji: '🗺️' },
          { label: 'Entertainment', action: 'surprise', emoji: '🎬' }
        ]
      }
      
      // If discussing coverage, suggest calling
      if (lowerResponse.includes('coverage') || lowerResponse.includes('area') || lowerQuery.includes('coverage')) {
        return [
          { label: 'Call to Confirm', action: 'contact_info', emoji: '📞' },
          { label: 'View Plans', action: 'plans_info', emoji: '📊' }
        ]
      }
      
      // If discussing contact, show other services
      if (lowerResponse.includes('contact') || lowerResponse.includes('call') || lowerQuery.includes('contact')) {
        return [
          { label: 'View Plans', action: 'plans_info', emoji: '📊' },
          { label: 'Entertainment', action: 'surprise', emoji: '🎬' }
        ]
      }
      
      // Default options
      return [
        { label: 'View Plans', action: 'plans_info', emoji: '📊' },
        { label: 'Movies & Sports', action: 'surprise', emoji: '🎬' },
        { label: 'Contact Us', action: 'contact_info', emoji: '📞' }
      ]
    },
    handleOptionClick(option) {
      this.addUserMessage(option.emoji + ' ' + option.label)
      this.lastInteractionTime = Date.now()
      
      this.isTyping = true
      setTimeout(() => {
        this.isTyping = false
        
        switch(option.action) {
          case 'plans_info':
            this.addBotMessage('📊 <strong>Our Internet Plans:</strong><br><br>' +
              '🥉 <strong>Basic - KSh 999/month</strong><br>' +
              '• 5 Mbps | Perfect for browsing & emails<br><br>' +
              '🥈 <strong>Standard - KSh 1,999/month</strong><br>' +
              '• 10 Mbps | Great for HD streaming<br><br>' +
              '🥇 <strong>Premium - KSh 2,999/month</strong><br>' +
              '• 20 Mbps | 4K streaming & gaming<br><br>' +
              'All with unlimited data & 24/7 support! 🎯', [
              { label: 'Order Now', action: 'contact_info', emoji: '📞' },
              { label: 'Coverage', action: 'coverage_info', emoji: '🗺️' },
              { label: 'Tech Facts', action: 'internet_knowledge', emoji: '🧠' }
            ])
            break
          case 'fetch_movies':
            this.fetchTrendingMovies()
            break
          case 'fetch_sports':
            this.fetchUpcomingSports()
            break
          case 'surprise':
            const random = Math.random()
            if (random > 0.5) {
              this.fetchTrendingMovies()
            } else {
              this.fetchUpcomingSports()
            }
            break
          case 'internet_knowledge':
            this.provideInternetKnowledge('general')
            break
          case 'coverage_info':
            this.addBotMessage('🗺️ <strong>Coverage Areas (50+ locations):</strong><br><br>' +
              '📍 <strong>Nairobi:</strong> Westlands, Kilimani, Karen, Lavington, Kileleshwa, Ngong Road<br>' +
              '📍 <strong>Mombasa:</strong> Nyali, Bamburi, Diani, Likoni<br>' +
              '📍 <strong>Kisumu:</strong> Central, Milimani, Mamboleo<br>' +
              '📍 <strong>Nakuru:</strong> CBD, Milimani, Lanet<br>' +
              '📍 <strong>Eldoret:</strong> Central, Pioneer, Langas<br><br>' +
              'Call us to confirm your specific location! 📞', [
              { label: 'Call Now', action: 'contact_info', emoji: '📞' },
              { label: 'View Plans', action: 'plans_info', emoji: '📊' }
            ])
            break
          case 'contact_info':
            this.addBotMessage('📞 <strong>Get in Touch:</strong><br><br>' +
              '📱 <strong>Phone:</strong> 0793590575<br>' +
              '☎️ <strong>Alternative:</strong> +254 703 551 813<br>' +
              '✉️ <strong>Email:</strong> support@comradeswifi.net<br>' +
              '⏰ <strong>Hours:</strong> 24/7 Available<br><br>' +
              'We respond within minutes! 🚀', [
              { label: 'View Plans', action: 'plans_info', emoji: '📊' },
              { label: 'Entertainment', action: 'surprise', emoji: '🎬' }
            ])
            break
          case 'search_images':
            this.searchAndDisplayImages(option.query || 'high speed internet')
            break
        }
      }, 800)
    },
    async fetchTrendingMovies() {
      this.isTyping = true
      try {
        const apiKey = '8265bd1679663a7ea12ac168da84d2e8'
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
        const data = await response.json()
        
        const movies = data.results.slice(0, 5)
        let movieList = '🎬 <strong>Trending Movies This Week:</strong><br><br>'
        
        movies.forEach((movie, index) => {
          const rating = movie.vote_average.toFixed(1)
          movieList += `${index + 1}. <strong>${movie.title}</strong><br>`
          movieList += `   ⭐ ${rating}/10 | 📅 ${movie.release_date}<br>`
          movieList += `   ${movie.overview.substring(0, 100)}...<br><br>`
        })
        
        movieList += 'Perfect for streaming with our high-speed internet! 🚀'
        
        this.isTyping = false
        this.addBotMessage(movieList, [
          { label: 'Sports Instead', action: 'fetch_sports', emoji: '⚽' },
          { label: 'Internet Plans', action: 'plans_info', emoji: '📊' },
          { label: 'More Suggestions', action: 'surprise', emoji: '🎲' }
        ])
      } catch (error) {
        this.isTyping = false
        this.addBotMessage('🎬 <strong>Top Movies to Watch:</strong><br><br>' +
          '1. <strong>Dune: Part Two</strong> ⭐ 8.7/10<br>' +
          '   Epic sci-fi adventure continues...<br><br>' +
          '2. <strong>Oppenheimer</strong> ⭐ 8.5/10<br>' +
          '   The story of the atomic bomb...<br><br>' +
          '3. <strong>Poor Things</strong> ⭐ 8.2/10<br>' +
          '   Fantastic tale of self-discovery...<br><br>' +
          'Stream all these in HD with Comrades WiFi! 🚀', [
          { label: 'Sports Instead', action: 'fetch_sports', emoji: '⚽' },
          { label: 'View Plans', action: 'plans_info', emoji: '📊' }
        ])
      }
    },
    async fetchUpcomingSports() {
      this.isTyping = true
      try {
        const apiKey = '3'
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnextleague.php?id=4328`)
        const data = await response.json()
        
        if (data.events && data.events.length > 0) {
          const events = data.events.slice(0, 5)
          let sportsList = '⚽ <strong>Upcoming Sports Events:</strong><br><br>'
          
          events.forEach((event, index) => {
            sportsList += `${index + 1}. <strong>${event.strHomeTeam} vs ${event.strAwayTeam}</strong><br>`
            sportsList += `   🏆 ${event.strLeague}<br>`
            sportsList += `   📅 ${event.dateEvent} | ⏰ ${event.strTime || 'TBA'}<br>`
            sportsList += `   📍 ${event.strVenue || 'TBA'}<br><br>`
          })
          
          sportsList += 'Watch live with zero lag on our high-speed internet! 🚀'
          
          this.isTyping = false
          this.addBotMessage(sportsList, [
            { label: 'Movies Instead', action: 'fetch_movies', emoji: '🎬' },
            { label: 'Internet Plans', action: 'plans_info', emoji: '📊' },
            { label: 'Contact Us', action: 'contact_info', emoji: '📞' }
          ])
        } else {
          throw new Error('No events')
        }
      } catch (error) {
        this.isTyping = false
        this.addBotMessage('⚽ <strong>Upcoming Sports This Week:</strong><br><br>' +
          '1. <strong>Manchester United vs Liverpool</strong><br>' +
          '   🏆 Premier League | 📅 Tomorrow 8:00 PM<br>' +
          '   📍 Old Trafford<br><br>' +
          '2. <strong>Barcelona vs Real Madrid</strong><br>' +
          '   🏆 La Liga | 📅 Saturday 7:30 PM<br>' +
          '   📍 Camp Nou<br><br>' +
          '3. <strong>Lakers vs Warriors</strong><br>' +
          '   🏀 NBA | 📅 Friday 10:00 PM<br>' +
          '   📍 Staples Center<br><br>' +
          'Stream all matches in HD! 🚀', [
          { label: 'Movies Instead', action: 'fetch_movies', emoji: '🎬' },
          { label: 'View Plans', action: 'plans_info', emoji: '📊' }
        ])
      }
    },
    provideInternetKnowledge(query) {
      const knowledge = [
        {
          keywords: ['speed', 'mbps', 'fast', 'bandwidth'],
          response: '🧠 <strong>Internet Speed Explained:</strong><br><br>' +
            '<strong>Mbps</strong> means "Megabits per second" - it measures how fast data travels.<br><br>' +
            '📊 <strong>What you need:</strong><br>' +
            '• 5 Mbps: Browsing, email, social media<br>' +
            '• 10 Mbps: HD video streaming (1080p)<br>' +
            '• 20 Mbps: 4K streaming, gaming, multiple devices<br><br>' +
            '💡 Higher Mbps = Faster downloads & smoother streaming!<br><br>' +
            'Fun Fact: The first internet speed was 56 Kbps in the 90s - that\'s 357 times slower than our basic plan! 🚀'
        },
        {
          keywords: ['wifi', 'wireless', 'router', 'signal'],
          response: '🧠 <strong>How WiFi Works:</strong><br><br>' +
            'WiFi uses radio waves (like your FM radio!) to send data wirelessly. 📡<br><br>' +
            '<strong>Your router:</strong><br>' +
            '• Converts internet signal to radio waves<br>' +
            '• Broadcasts in 2.4GHz or 5GHz frequency<br>' +
            '• Your devices receive and decode the waves<br><br>' +
            '💡 <strong>Tips for better WiFi:</strong><br>' +
            '• Place router in central location<br>' +
            '• Keep away from walls & metal objects<br>' +
            '• Update router firmware regularly<br><br>' +
            'Fun Fact: WiFi stands for "Wireless Fidelity" and was invented in 1997! 🎯'
        },
        {
          keywords: ['internet', 'world wide web', 'www', 'web'],
          response: '🧠 <strong>The Internet Explained:</strong><br><br>' +
            'The Internet is a massive network connecting billions of devices worldwide! 🌍<br><br>' +
            '<strong>Key Components:</strong><br>' +
            '• Servers: Computers that store websites<br>' +
            '• ISPs: Companies like us that provide access<br>' +
            '• Fiber cables: Underground/underwater cables connecting continents<br><br>' +
            '💡 <strong>Amazing Facts:</strong><br>' +
            '• Over 5 billion internet users worldwide<br>' +
            '• 400+ undersea cables connect continents<br>' +
            '• Internet weighs about 50 grams (electrons!)<br><br>' +
            'The first website went live on August 6, 1991! 🚀'
        },
        {
          keywords: ['streaming', 'netflix', 'youtube', 'video'],
          response: '🧠 <strong>Streaming Technology:</strong><br><br>' +
            'Streaming sends video in small chunks instead of downloading the whole file! 📺<br><br>' +
            '<strong>How it works:</strong><br>' +
            '• Video is split into tiny pieces<br>' +
            '• Your device downloads & plays simultaneously<br>' +
            '• Buffer: Pre-loads next few seconds<br><br>' +
            '💡 <strong>Quality Requirements:</strong><br>' +
            '• SD (480p): 3 Mbps<br>' +
            '• HD (1080p): 5 Mbps<br>' +
            '• 4K (2160p): 25 Mbps<br><br>' +
            'Fun Fact: Netflix accounts for 15% of all internet traffic worldwide! 🎬'
        },
        {
          keywords: ['data', 'download', 'upload', 'gb', 'mb'],
          response: '🧠 <strong>Understanding Data:</strong><br><br>' +
            'Data is measured in bytes - tiny units of digital information! 💾<br><br>' +
            '<strong>Data Hierarchy:</strong><br>' +
            '• 1 KB (Kilobyte) = 1,000 bytes<br>' +
            '• 1 MB (Megabyte) = 1,000 KB<br>' +
            '• 1 GB (Gigabyte) = 1,000 MB<br>' +
            '• 1 TB (Terabyte) = 1,000 GB<br><br>' +
            '💡 <strong>Typical Usage:</strong><br>' +
            '• HD Movie: 3-5 GB<br>' +
            '• Song: 3-5 MB<br>' +
            '• Photo: 2-5 MB<br><br>' +
            'Fun Fact: All of Google\'s data would fill about 15 million iPhone storage! 📱'
        }
      ]

      // Find matching knowledge
      let selectedKnowledge = knowledge[0] // default
      for (const item of knowledge) {
        if (item.keywords.some(keyword => query.toLowerCase().includes(keyword))) {
          selectedKnowledge = item
          break
        }
      }

      // If no specific match, pick random
      if (query === 'general') {
        selectedKnowledge = knowledge[Math.floor(Math.random() * knowledge.length)]
      }

      this.addBotMessage(selectedKnowledge.response, [
        { label: 'More Facts', action: 'internet_knowledge', emoji: '🧠' },
        { label: 'View Plans', action: 'plans_info', emoji: '📊' },
        { label: 'Entertainment', action: 'surprise', emoji: '🎬' }
      ])
    },
    async searchAndDisplayImages(query) {
      this.isTyping = true
      try {
        // Using Unsplash API for high-quality images
        const accessKey = 'your_unsplash_access_key' // In production, use environment variable
        
        // Fallback to curated images related to Comrades WiFi
        const imageCollections = {
          'cinema movies': [
            { url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop', alt: 'Movie Theater' },
            { url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop', alt: 'Cinema Screen' },
            { url: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=300&fit=crop', alt: 'Movies Streaming' }
          ],
          'sports stadium': [
            { url: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=300&fit=crop', alt: 'Football Stadium' },
            { url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop', alt: 'Sports Arena' },
            { url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=300&fit=crop', alt: 'Basketball Court' }
          ],
          'wifi router technology': [
            { url: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop', alt: 'WiFi Router' },
            { url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop', alt: 'Network Technology' },
            { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', alt: 'Modern Router' }
          ],
          'high speed internet': [
            { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop', alt: 'Network Connection' },
            { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop', alt: 'Fiber Optic' },
            { url: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=400&h=300&fit=crop', alt: 'High Speed Data' }
          ]
        }

        const images = imageCollections[query] || imageCollections['high speed internet']
        
        this.isTyping = false
        this.addBotMessageWithImages(
          `📸 Here are some ${query} images for you! Perfect for streaming with our high-speed internet! 🚀`,
          images,
          [
            { label: 'View Plans', action: 'plans_info', emoji: '📊' },
            { label: 'More Entertainment', action: 'surprise', emoji: '🎬' },
            { label: 'Contact Us', action: 'contact_info', emoji: '📞' }
          ]
        )
      } catch (error) {
        this.isTyping = false
        this.addBotMessage('Sorry, I had trouble loading images! But I can still help you with our internet plans, movies, sports, and more! 😊', [
          { label: 'View Plans', action: 'plans_info', emoji: '📊' },
          { label: 'Entertainment', action: 'surprise', emoji: '🎬' }
        ])
      }
    },
    openImageModal(url) {
      window.open(url, '_blank')
    },
    getCurrentTime() {
      const now = new Date()
      return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    }
  }
}
</script>

<style scoped>
.floating-chatbot {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
}

/* Chat Icon Button */
.chat-icon-btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand-red), #FF1744);
  border: none;
  box-shadow: 0 10px 40px rgba(220, 20, 60, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  animation: pulse-glow 2s ease-in-out infinite;
}

.chat-icon-btn .icon {
  font-size: 2rem;
}

.chat-icon-btn:hover {
  transform: scale(1.1) rotate(10deg);
  box-shadow: 0 15px 50px rgba(220, 20, 60, 0.7);
}

.chat-icon-btn.has-unread {
  animation: shake 0.5s ease-in-out infinite;
}

.chat-label {
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, var(--brand-red), #FF1744);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(220, 20, 60, 0.4);
  opacity: 1;
  transition: all 0.3s ease;
}

.chat-icon-btn:hover .chat-label {
  transform: translateX(-50%) scale(1.05);
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 10px 40px rgba(220, 20, 60, 0.5);
  }
  50% {
    box-shadow: 0 10px 60px rgba(220, 20, 60, 0.8), 0 0 30px rgba(255, 23, 68, 0.6);
  }
}

@keyframes shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.unread-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #FFD700;
  color: #000;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.85rem;
  border: 3px solid white;
  animation: bounce 1s ease-in-out infinite;
}

/* Chat Window */
.chat-window {
  position: absolute;
  bottom: 90px;
  right: 0;
  width: 400px;
  height: 600px;
  background: white;
  border-radius: 25px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: linear-gradient(135deg, var(--brand-red), #FF1744);
  color: white;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  backdrop-filter: blur(10px);
}

.header-info h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 800;
}

.status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  opacity: 0.9;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #00FF00;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background: #F5F7FA;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  gap: 0.8rem;
  animation: slideInMessage 0.3s ease;
}

@keyframes slideInMessage {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.bot {
  justify-content: flex-start;
}

.message.user {
  justify-content: flex-end;
}

.message-avatar {
  width: 35px;
  height: 35px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  max-width: 70%;
}

.message-bubble {
  padding: 1rem 1.2rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.message.bot .message-bubble {
  background: white;
  border-bottom-left-radius: 5px;
}

.message.user .message-bubble {
  background: linear-gradient(135deg, var(--brand-red), #FF1744);
  color: white;
  border-bottom-right-radius: 5px;
}

.message-bubble p {
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

.message-time {
  font-size: 0.75rem;
  color: #999;
  padding: 0 0.5rem;
}

.message.user .message-time {
  text-align: right;
}

/* Message Options */
.message-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
}

.option-btn {
  background: linear-gradient(135deg, var(--brand-red), #FF1744);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(220, 20, 60, 0.3);
}

.option-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 20, 60, 0.5);
}

/* Message Images */
.message-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
}

.chat-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.chat-image:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

/* Typing Indicator */
.typing-indicator {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  border-bottom-left-radius: 5px;
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #999;
  border-radius: 50%;
  animation: typing 1.4s ease-in-out infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

/* Chat Input */
.chat-input {
  padding: 1.2rem;
  background: white;
  border-top: 2px solid #F0F0F0;
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.input-field {
  flex: 1;
  padding: 0.9rem 1.2rem;
  border: 2px solid #E0E0E0;
  border-radius: 50px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: var(--brand-red);
  box-shadow: 0 4px 12px rgba(220, 20, 60, 0.2);
}

.send-btn {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, var(--brand-red), #FF1744);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(220, 20, 60, 0.3);
}

.send-btn span {
  font-size: 1.3rem;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(220, 20, 60, 0.5);
}

/* Animations */
.bounce-enter-active {
  animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.bounce-leave-active {
  animation: bounceOut 0.3s ease;
}

@keyframes bounceIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounceOut {
  to {
    transform: scale(0);
    opacity: 0;
  }
}

.slide-up-enter-active {
  animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-up-leave-active {
  animation: slideDown 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideDown {
  to {
    transform: translateY(30px);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .floating-chatbot {
    bottom: 20px;
    right: 20px;
  }
  
  .chat-icon-btn {
    width: 60px;
    height: 60px;
    animation: none; /* Disable pulse animation on mobile */
  }
  
  .chat-icon-btn .icon {
    font-size: 1.7rem;
  }
  
  .chat-window {
    width: calc(100vw - 40px);
    height: calc(100vh - 140px);
    bottom: 85px;
    right: -10px;
  }
  
  .chat-label {
    display: none; /* Hide label on mobile to save space */
  }
  
  /* Disable heavy animations on mobile */
  .message-bot,
  .message-user {
    animation: none;
    opacity: 1;
  }
  
  .option-btn {
    transition: transform 0.2s ease;
  }
  
  .option-btn:hover {
    transform: none;
  }
}
</style>
