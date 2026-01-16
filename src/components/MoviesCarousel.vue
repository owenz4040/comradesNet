<template>
  <section class="movies-section">
    <div class="container">
      <div class="section-header">
        <div>
          <h2 class="section-title">Trending Movies & Series 🎬</h2>
          <p class="section-subtitle">Stream in HD with our ultra-fast internet</p>
        </div>
        <div class="last-update" v-if="lastUpdateTime">
          <span class="update-icon">🔄</span>
          Updated: {{ formatTime(lastUpdateTime) }}
        </div>
      </div>
      
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading trending content...</p>
      </div>
      
      <div v-else class="movies-carousel">
        <button class="carousel-btn prev" @click="prevSlide" :disabled="currentIndex === 0">
          ‹
        </button>
        
        <div class="carousel-wrapper">
          <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }">
            <div class="movie-card" v-for="(item, index) in trendingItems" :key="item.id || index">
              <div class="movie-poster">
                <img :src="item.poster" :alt="item.title" @error="handleImageError" />
                <div class="movie-overlay">
                  <div class="movie-rating">
                    <span class="star">⭐</span>
                    <span>{{ item.rating }}/10</span>
                  </div>
                  <div class="movie-type">{{ item.type }}</div>
                </div>
              </div>
              <div class="movie-info">
                <h3>{{ item.title }}</h3>
                <p class="movie-year">{{ item.year }} • {{ item.genre }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <button class="carousel-btn next" @click="nextSlide" :disabled="currentIndex >= maxIndex">
          ›
        </button>
      </div>
      
      <div class="carousel-dots">
        <span 
          v-for="(dot, index) in totalDots" 
          :key="index"
          :class="['dot', { active: index === Math.floor(currentIndex / itemsPerView) }]"
          @click="goToSlide(index)"
        ></span>
      </div>
      
      <div class="update-badge" v-if="showUpdateBadge">
        <span class="pulse-dot"></span>
        New content added!
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MoviesCarousel',
  data() {
    return {
      currentIndex: 0,
      itemsPerView: 4,
      autoPlayInterval: null,
      updateCheckInterval: null,
      showUpdateBadge: false,
      trendingItems: [],
      lastUpdateTime: null,
      isLoading: true,
      apiKey: 'YOUR_TMDB_API_KEY' // Users can get free key from themoviedb.org
    }
  },
  computed: {
    maxIndex() {
      return Math.max(0, this.trendingItems.length - this.itemsPerView)
    },
    totalDots() {
      return Math.ceil(this.trendingItems.length / this.itemsPerView)
    }
  },
  mounted() {
    this.fetchTrendingContent()
    this.startAutoPlay()
    this.updateResponsiveView()
    window.addEventListener('resize', this.updateResponsiveView)
    
    // Check for new content every 8 seconds for real-time updates
    this.updateCheckInterval = setInterval(() => {
      this.fetchTrendingContent(true)
    }, 8000)
  },
  beforeUnmount() {
    this.stopAutoPlay()
    if (this.updateCheckInterval) {
      clearInterval(this.updateCheckInterval)
    }
    window.removeEventListener('resize', this.updateResponsiveView)
  },
  methods: {
    async fetchTrendingContent(isUpdate = false) {
      try {
        // Fetch from multiple endpoints for variety
        const endpoints = [
          'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
          'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
          'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
          'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1'
        ]
        
        // Free TMDB API key for demo (you can get your own at themoviedb.org)
        const apiKey = '8265bd1679663a7ea12ac168da84d2e8'
        
        const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)]
        const response = await fetch(`${randomEndpoint}&api_key=${apiKey}`)
        
        if (!response.ok) throw new Error('API request failed')
        
        const data = await response.json()
        
        // Process and map the results with HD images
        const newItems = data.results.slice(0, 12).map(item => ({
          id: item.id,
          title: item.title || item.name,
          poster: item.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : this.getRandomPlaceholder(),
          backdrop: item.backdrop_path 
            ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
            : null,
          rating: item.vote_average ? item.vote_average.toFixed(1) : '8.0',
          year: (item.release_date || item.first_air_date || '2024').split('-')[0],
          genre: this.getGenreName(item.genre_ids?.[0] || 18),
          type: item.title ? 'Movie' : 'Series',
          overview: item.overview
        }))
        
        if (isUpdate && this.trendingItems.length > 0) {
          // Check if there are new items
          const newItemIds = newItems.map(item => item.id)
          const oldItemIds = this.trendingItems.map(item => item.id)
          const hasNewContent = newItemIds.some(id => !oldItemIds.includes(id))
          
          if (hasNewContent) {
            this.trendingItems = newItems
            this.showUpdateBadge = true
            this.lastUpdateTime = new Date()
            
            setTimeout(() => {
              this.showUpdateBadge = false
            }, 5000)
          }
        } else {
          this.trendingItems = newItems
          this.lastUpdateTime = new Date()
        }
        
        this.isLoading = false
      } catch (error) {
        console.error('Error fetching content:', error)
        // Retry with fallback
        if (!this.trendingItems.length) {
          this.loadMockData()
        }
        this.isLoading = false
      }
    },
    
    getRandomPlaceholder() {
      const placeholders = [
        'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop',
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=750&fit=crop',
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
        'https://images.unsplash.com/photo-1574267432644-f74f8ec781da?w=500&h=750&fit=crop'
      ]
      return placeholders[Math.floor(Math.random() * placeholders.length)]
    },
    
    loadMockData() {
      // Real movie/series data as fallback
      const mockMovies = [
        { title: 'Deadpool & Wolverine', poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', rating: 7.8, year: '2024', genre: 'Action', type: 'Movie', id: 533535 },
        { title: 'Inside Out 2', poster: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg', rating: 7.7, year: '2024', genre: 'Animation', type: 'Movie', id: 1022789 },
        { title: 'Wicked', poster: 'https://image.tmdb.org/t/p/w500/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg', rating: 7.6, year: '2024', genre: 'Fantasy', type: 'Movie', id: 402431 },
        { title: 'Gladiator II', poster: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg', rating: 7.1, year: '2024', genre: 'Action', type: 'Movie', id: 558449 },
        { title: 'Moana 2', poster: 'https://image.tmdb.org/t/p/w500/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg', rating: 7.0, year: '2024', genre: 'Animation', type: 'Movie', id: 1241982 },
        { title: 'Red One', poster: 'https://image.tmdb.org/t/p/w500/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg', rating: 7.0, year: '2024', genre: 'Action', type: 'Movie', id: 748783 },
        { title: 'The Substance', poster: 'https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6qzt349fB4o.jpg', rating: 7.3, year: '2024', genre: 'Horror', type: 'Movie', id: 933260 },
        { title: 'Venom: The Last Dance', poster: 'https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', rating: 6.8, year: '2024', genre: 'Action', type: 'Movie', id: 912649 },
        { title: 'Sonic 3', poster: 'https://image.tmdb.org/t/p/w500/d8Ryb8AunYAuHd51WWvcswvHRCU.jpg', rating: 7.8, year: '2024', genre: 'Adventure', type: 'Movie', id: 939335 },
        { title: 'Mufasa: The Lion King', poster: 'https://image.tmdb.org/t/p/w500/lurEK87kukWNaHd0zYnsi3yzJrs.jpg', rating: 7.2, year: '2024', genre: 'Adventure', type: 'Movie', id: 762509 },
        { title: 'Squid Game', poster: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg', rating: 8.0, year: '2024', genre: 'Drama', type: 'Series', id: 93405 },
        { title: 'Wednesday', poster: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg', rating: 8.5, year: '2024', genre: 'Comedy', type: 'Series', id: 119051 }
      ]
      
      this.trendingItems = mockMovies
    },
    
    getGenreName(genreId) {
      const genres = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
        80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
        14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
        9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV',
        53: 'Thriller', 10752: 'War', 37: 'Western'
      }
      return genres[genreId] || 'Drama'
    },
    nextSlide() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    goToSlide(index) {
      this.currentIndex = index * this.itemsPerView
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval)
      }
    },
    updateResponsiveView() {
      const width = window.innerWidth
      if (width < 768) {
        this.itemsPerView = 1
      } else if (width < 1024) {
        this.itemsPerView = 2
      } else if (width < 1280) {
        this.itemsPerView = 3
      } else {
        this.itemsPerView = 4
      }
    },
    
    formatTime(date) {
      const now = new Date()
      const diff = Math.floor((now - date) / 1000) // seconds
      
      if (diff < 10) return 'Just now'
      if (diff < 60) return `${diff}s ago`
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
      
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    
    handleImageError(event) {
      event.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop'
    }
  }
}
</script>

<style scoped>
.movies-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #0A0E27 0%, #1A1A2E 50%, #0A0E27 100%);
  position: relative;
  overflow: hidden;
}

.movies-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.1), transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(0, 102, 204, 0.1), transparent 50%);
  pointer-events: none;
}

.movies-section .section-title {
  color: white;
  margin-bottom: 0.5rem;
}

.movies-section .section-subtitle {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.last-update {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.update-icon {
  animation: rotate 3s linear infinite;
}

.loading-state {
  text-align: center;
  padding: 4rem 0;
  color: white;
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: var(--brand-red);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
}

.movies-carousel {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.carousel-wrapper {
  flex: 1;
  overflow: hidden;
  border-radius: 20px;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  gap: 1.5rem;
}

.movie-card {
  flex: 0 0 calc(25% - 1.125rem);
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.movie-card:hover {
  transform: translateY(-15px) scale(1.05);
  z-index: 10;
}

.movie-poster {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  aspect-ratio: 2/3;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  background: linear-gradient(135deg, #1a1a2e 0%, #0a0e27 100%);
}

.movie-card:hover .movie-poster img {
  transform: scale(1.15);
}

.movie-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-card:hover .movie-overlay {
  opacity: 1;
}

.movie-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 0.8rem;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  width: fit-content;
}

.star {
  font-size: 1.2rem;
}

.movie-type {
  align-self: flex-end;
  background: var(--gradient-red-blue);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.movie-info {
  padding: 1rem 0;
  color: white;
}

.movie-info h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-year {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.carousel-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.carousel-btn:hover:not(:disabled) {
  background: var(--gradient-red-blue);
  transform: scale(1.1);
  box-shadow: 0 10px 30px rgba(220, 20, 60, 0.5);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 2rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}

.dot.active {
  background: var(--gradient-red-blue);
  width: 30px;
  border-radius: 10px;
}

.update-badge {
  position: fixed;
  top: 100px;
  right: 2rem;
  background: rgba(220, 20, 60, 0.95);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 25px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  animation: slideInRight 0.5s ease, pulse 2s ease-in-out infinite;
  box-shadow: 0 10px 30px rgba(220, 20, 60, 0.5);
  z-index: 1001;
}

@keyframes slideInRight {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.pulse-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  animation: pulse 1.5s ease-in-out infinite;
}

/* Responsive */
@media (max-width: 1280px) {
  .movie-card {
    flex: 0 0 calc(33.333% - 1rem);
  }
}

@media (max-width: 1024px) {
  .movie-card {
    flex: 0 0 calc(50% - 0.75rem);
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .movies-section {
    padding: 4rem 0;
  }
  
  .movie-card {
    flex: 0 0 100%;
  }
  
  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
  
  .update-badge {
    top: 80px;
    right: 1rem;
    font-size: 0.85rem;
    padding: 0.6rem 1rem;
  }
  
  .last-update {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
}
</style>
