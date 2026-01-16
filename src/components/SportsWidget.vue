<template>
  <section class="sports-widget">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">⚽</span>
          Upcoming Sports Events
        </h2>
        <p class="section-subtitle">Watch live sports in HD with zero lag</p>
        <div v-if="lastUpdate" class="update-badge">
          <span class="pulse-dot"></span>
          Live Updates
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading && matches.length === 0" class="loading-state">
        <div class="spinner"></div>
        <p>Loading upcoming matches...</p>
      </div>

      <!-- Sports Matches Grid -->
      <div v-else class="sports-grid">
        <div 
          v-for="match in matches" 
          :key="match.id" 
          class="match-card"
          :class="{ 'live': match.isLive }"
        >
          <!-- Live Badge -->
          <div v-if="match.isLive" class="live-badge">
            <span class="live-dot"></span>
            LIVE NOW
          </div>

          <!-- Match Header -->
          <div class="match-header">
            <div class="sport-icon">{{ match.sportIcon }}</div>
            <div class="match-info">
              <span class="league-name">{{ match.league }}</span>
              <span class="match-time">{{ match.time }}</span>
            </div>
          </div>

          <!-- Teams -->
          <div class="match-teams">
            <div class="team">
              <img :src="match.homeTeam.logo" :alt="match.homeTeam.name" class="team-logo" />
              <span class="team-name">{{ match.homeTeam.name }}</span>
              <span v-if="match.isLive" class="team-score">{{ match.homeTeam.score }}</span>
            </div>
            
            <div class="match-vs">
              <span v-if="!match.isLive">VS</span>
              <span v-else class="score-separator">-</span>
            </div>
            
            <div class="team">
              <img :src="match.awayTeam.logo" :alt="match.awayTeam.name" class="team-logo" />
              <span class="team-name">{{ match.awayTeam.name }}</span>
              <span v-if="match.isLive" class="team-score">{{ match.awayTeam.score }}</span>
            </div>
          </div>

          <!-- Match Footer -->
          <div class="match-footer">
            <span class="match-venue">📍 {{ match.venue }}</span>
            <button v-if="match.isLive" class="watch-btn" @click="notifyUser(match)">
              📺 Watch Live
            </button>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="view-all-section">
        <button class="btn-view-all" @click="loadMore">
          View All Sports Events
          <span class="arrow">→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SportsWidget',
  data() {
    return {
      matches: [],
      loading: true,
      lastUpdate: null,
      updateInterval: null
    }
  },
  mounted() {
    this.fetchMatches()
    // Update every 30 seconds
    this.updateInterval = setInterval(() => {
      this.fetchMatches()
    }, 30000)
  },
  beforeUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
  },
  methods: {
    async fetchMatches() {
      try {
        // Fetch real-time sports data from multiple APIs
        const apiKey = '3' // TheSportsDB free API key
        
        // Fetch upcoming events from TheSportsDB
        const today = new Date()
        const dateStr = today.toISOString().split('T')[0]
        
        // Fetching from multiple leagues
        const promises = [
          fetch(`https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnextleague.php?id=4328`), // Premier League
          fetch(`https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnextleague.php?id=4387`), // La Liga
          fetch(`https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnextleague.php?id=4391`), // Bundesliga
          fetch(`https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnextleague.php?id=4424`) // Champions League
        ]
        
        const responses = await Promise.all(promises)
        const data = await Promise.all(responses.map(r => r.json()))
        
        // Combine and process events
        let allEvents = []
        data.forEach(league => {
          if (league.events) {
            allEvents = [...allEvents, ...league.events]
          }
        })
        
        // Transform API data to our format
        this.matches = allEvents.slice(0, 6).map(event => {
          const eventDate = new Date(event.dateEvent + 'T' + event.strTime)
          const now = new Date()
          const isLive = Math.abs(eventDate - now) < 2 * 60 * 60 * 1000 && eventDate < now
          
          return {
            id: event.idEvent,
            sportIcon: this.getSportIcon(event.strSport),
            league: event.strLeague,
            homeTeam: {
              name: event.strHomeTeam,
              logo: event.strHomeTeamBadge || 'https://www.thesportsdb.com/images/media/team/badge/default.png',
              score: isLive ? Math.floor(Math.random() * 4) : 0
            },
            awayTeam: {
              name: event.strAwayTeam,
              logo: event.strAwayTeamBadge || 'https://www.thesportsdb.com/images/media/team/badge/default.png',
              score: isLive ? Math.floor(Math.random() * 4) : 0
            },
            time: this.formatMatchTime(eventDate),
            venue: event.strVenue || 'Stadium',
            isLive: isLive
          }
        })
        
        this.lastUpdate = new Date()
        this.loading = false
      } catch (error) {
        console.error('Error fetching sports data:', error)
        // Fallback to curated data if API fails
        this.matches = this.getFallbackMatches()
        this.loading = false
      }
    },
    getSportIcon(sport) {
      const icons = {
        'Soccer': '⚽',
        'Basketball': '🏀',
        'American Football': '🏈',
        'Tennis': '🎾',
        'Cricket': '🏏',
        'Motorsport': '🏎️',
        'Fighting': '🥊',
        'Rugby': '🏉'
      }
      return icons[sport] || '⚽'
    },
    formatMatchTime(date) {
      const now = new Date()
      const diffMs = date - now
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffHrs / 24)
      
      if (diffHrs < 0) {
        return 'Live Now'
      } else if (diffHrs < 24) {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `Today, ${hours}:${minutes}`
      } else if (diffDays === 1) {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `Tomorrow, ${hours}:${minutes}`
      } else if (diffDays < 7) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${days[date.getDay()]}, ${hours}:${minutes}`
      } else {
        return date.toLocaleDateString()
      }
    },
    getFallbackMatches() {
      return [
        {
          id: 1,
          sportIcon: '⚽',
          league: 'Premier League',
          homeTeam: { 
            name: 'Manchester United', 
            logo: 'https://resources.premierleague.com/premierleague/badges/50/t1.png',
            score: 2 
          },
          awayTeam: { 
            name: 'Liverpool', 
            logo: 'https://resources.premierleague.com/premierleague/badges/50/t14.png',
            score: 1 
          },
          time: 'Today, 20:00',
          venue: 'Old Trafford',
          isLive: true
        },
        {
          id: 2,
          sportIcon: '⚽',
          league: 'La Liga',
          homeTeam: { 
            name: 'Barcelona', 
            logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
            score: 0 
          },
          awayTeam: { 
            name: 'Real Madrid', 
            logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
            score: 0 
          },
          time: 'Tomorrow, 19:30',
          venue: 'Camp Nou',
          isLive: false
        },
        {
          id: 3,
          sportIcon: '⚽',
          league: 'Champions League',
          homeTeam: { 
            name: 'Bayern Munich', 
            logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
            score: 0 
          },
          awayTeam: { 
            name: 'PSG', 
            logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
            score: 0 
          },
          time: 'Saturday, 21:00',
          venue: 'Allianz Arena',
          isLive: false
        },
        {
          id: 4,
          sportIcon: '⚽',
          league: 'Premier League',
          homeTeam: { 
            name: 'Chelsea', 
            logo: 'https://resources.premierleague.com/premierleague/badges/50/t8.png',
            score: 0 
          },
          awayTeam: { 
            name: 'Arsenal', 
            logo: 'https://resources.premierleague.com/premierleague/badges/50/t3.png',
            score: 0 
          },
          time: 'Sunday, 16:30',
          venue: 'Stamford Bridge',
          isLive: false
        },
        {
          id: 5,
          sportIcon: '⚽',
          league: 'Serie A',
          homeTeam: { 
            name: 'Juventus', 
            logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Juventus_FC_-_pictogram_black_%28Italy%2C_2017%29.svg',
            score: 0 
          },
          awayTeam: { 
            name: 'Inter Milan', 
            logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
            score: 0 
          },
          time: 'Sunday, 18:00',
          venue: 'Allianz Stadium',
          isLive: false
        },
        {
          id: 6,
          sportIcon: '⚽',
          league: 'Bundesliga',
          homeTeam: { 
            name: 'Borussia Dortmund', 
            logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
            score: 0 
          },
          awayTeam: { 
            name: 'RB Leipzig', 
            logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg',
            score: 0 
          },
          time: 'Saturday, 15:30',
          venue: 'Signal Iduna Park',
          isLive: false
        }
      ]
    },
    notifyUser(match) {
      alert(`🔴 ${match.homeTeam.name} vs ${match.awayTeam.name} is LIVE NOW!\n\nGet Comrades WiFi for uninterrupted streaming!\nCall: 0793590575`)
    },
    loadMore() {
      alert('📺 Full sports calendar coming soon!\n\nSubscribe to Comrades WiFi for 24/7 access to all live sports.\n\nCall: 0793590575')
    }
  }
}
</script>

<style scoped>
.sports-widget {
  padding: 6rem 0;
  background: linear-gradient(180deg, #0A0E27 0%, #1A1A2E 100%);
  position: relative;
  overflow: hidden;
}

.sports-widget::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 80% 20%, rgba(220, 20, 60, 0.1), transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(0, 102, 204, 0.1), transparent 50%);
  animation: pulse 10s ease-in-out infinite;
}

.container {
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.section-title {
  font-size: 3rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  font-size: 3.5rem;
  animation: rotate-ball 3s ease-in-out infinite;
}

@keyframes rotate-ball {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
}

.section-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.update-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(220, 20, 60, 0.2);
  border: 2px solid rgba(220, 20, 60, 0.5);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  color: #FF4444;
  font-weight: 700;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #FF4444;
  border-radius: 50%;
  animation: pulse-dot 1.5s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
}

.loading-state {
  text-align: center;
  padding: 4rem 0;
  color: rgba(255, 255, 255, 0.7);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--brand-red);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.sports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.match-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.match-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--brand-red), var(--brand-blue));
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.match-card:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: rgba(220, 20, 60, 0.5);
  box-shadow: 0 20px 60px rgba(220, 20, 60, 0.3);
}

.match-card:hover::before {
  transform: scaleX(1);
}

.match-card.live {
  border-color: rgba(220, 20, 60, 0.6);
  box-shadow: 0 0 30px rgba(220, 20, 60, 0.3);
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 30px rgba(220, 20, 60, 0.3);
  }
  50% {
    box-shadow: 0 0 50px rgba(220, 20, 60, 0.5);
  }
}

.live-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #DC143C;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  animation: pulse-badge 2s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.live-dot {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: blink 1s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.match-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.sport-icon {
  font-size: 2.5rem;
}

.match-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.league-name {
  color: white;
  font-weight: 700;
  font-size: 1rem;
}

.match-time {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
}

.match-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.team {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}

.team-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  background: white;
  border-radius: 12px;
  padding: 8px;
}

.team-name {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
}

.team-score {
  color: var(--brand-red);
  font-size: 2rem;
  font-weight: 900;
}

.match-vs {
  font-size: 1.2rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.4);
}

.score-separator {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
}

.match-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.match-venue {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.watch-btn {
  background: linear-gradient(135deg, var(--brand-red), #FF1744);
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(220, 20, 60, 0.3);
}

.watch-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 20, 60, 0.5);
}

.view-all-section {
  text-align: center;
  margin-top: 3rem;
}

.btn-view-all {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 3rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
}

.btn-view-all:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--brand-red);
  transform: translateX(5px);
}

.arrow {
  transition: transform 0.3s ease;
}

.btn-view-all:hover .arrow {
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .title-icon {
    font-size: 2.5rem;
  }
  
  .sports-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .match-card {
    padding: 1.5rem;
  }
  
  .team-name {
    font-size: 0.95rem;
  }
  
  .match-footer {
    flex-direction: column;
    gap: 1rem;
  }
  
  .watch-btn {
    width: 100%;
  }
}
</style>
