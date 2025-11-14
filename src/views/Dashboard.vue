<template>
  <div class="dashboard">
    <!-- Notification Popup -->
    <transition name="notification-slide">
      <div v-if="notification.show" :class="['notification-popup', notification.type]">
        <div class="notification-icon">
          <svg v-if="notification.type === 'success'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <svg v-else-if="notification.type === 'error'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
        <span class="notification-message">{{ notification.message }}</span>
      </div>
    </transition>
    
    <!-- Dashboard Navbar -->
    <nav class="dashboard-navbar">
      <div class="container">
        <div class="nav-content">
          <button @click="drawerOpen = !drawerOpen" class="menu-toggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <div class="logo">
            <img src="/images/logo.png" alt="Comrades WiFi" class="logo-image" />
            <span class="logo-text">Comrades <span class="wifi-text">WiFi</span></span>
          </div>
          
          <div class="nav-actions">
            <div class="user-menu">
              <button class="user-btn" @click="toggleUserMenu">
                <div class="user-avatar">{{ userInitial }}</div>
                <span class="user-name">{{ userName }}</span>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <div v-if="userMenuOpen" class="user-dropdown">
                <div class="dropdown-item user-info">
                  <div class="user-avatar-large">{{ userInitial }}</div>
                  <div>
                    <div class="user-name-large">{{ userName }}</div>
                    <div class="user-email">{{ userEmail }}</div>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
                <button @click="updateProfile" class="dropdown-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Edit Profile</span>
                </button>
                <button @click="logout" class="dropdown-item logout-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Left Navigation Drawer -->
    <div class="drawer-overlay" v-if="drawerOpen" @click="drawerOpen = false"></div>
    <div class="navigation-drawer" :class="{ open: drawerOpen }">
      <div class="drawer-header">
        <div class="drawer-logo">
          <img src="/images/logo.png" alt="Comrades Logo" class="drawer-logo-img">
          <span class="drawer-logo-text">Comrades<span class="wifi-text">WiFi</span></span>
        </div>
        <button @click="drawerOpen = false" class="drawer-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="drawer-menu">
        <button @click="activeSection = 'overview'; drawerOpen = false" 
                class="drawer-item" :class="{ active: activeSection === 'overview' }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Dashboard Overview
        </button>

        <button @click="activeSection = 'profile'; drawerOpen = false" 
                class="drawer-item" :class="{ active: activeSection === 'profile' }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          My Profile
        </button>

        <button @click="activeSection = 'plan'; drawerOpen = false" 
                class="drawer-item" :class="{ active: activeSection === 'plan' }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Current Plan
        </button>

        <button @click="activeSection = 'billing'; drawerOpen = false" 
                class="drawer-item" :class="{ active: activeSection === 'billing' }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
          Billing History
        </button>

        <button @click="activeSection = 'support'; drawerOpen = false" 
                class="drawer-item" :class="{ active: activeSection === 'support' }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          Support
        </button>

        <button @click="activeSection = 'settings'; drawerOpen = false" 
                class="drawer-item" :class="{ active: activeSection === 'settings' }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m6-11.5l-4 4m-4 4l-4 4m11.5-6h-6m-6 0h-6m11.5 6l-4-4m-4-4l-4-4"></path>
          </svg>
          WiFi Settings
        </button>
      </div>
    </div>

    <!-- Dashboard Header -->
    <section class="dashboard-header" v-if="activeSection === 'overview'">
      <div class="container">
        <div class="welcome-section">
          <div class="welcome-text">
            <div class="welcome-greeting">
              <div class="user-welcome-avatar">
                <div class="avatar-gradient">
                  <div class="avatar-shine"></div>
                  <span class="avatar-text">{{ userInitial }}</span>
                </div>
              </div>
              <div class="greeting-text">
                <h3 class="greeting-hello">Welcome back,</h3>
                <h1 class="user-name-highlight">{{ displayUserName }}!</h1>
                <p class="greeting-subtext">Here's what's happening with your account today</p>
              </div>
            </div>
          </div>
          <div class="quick-actions">
            <button class="action-btn speed-test-btn" @click="showSpeedTest = true">
              <div class="action-icon-wrapper">
                <div class="icon-circle pulse-circle"></div>
                <div class="icon-circle pulse-circle delay-1"></div>
                <div class="icon-circle pulse-circle delay-2"></div>
                <svg class="action-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span class="action-label">Speed Test</span>
              <span class="action-sublabel">Check connection</span>
            </button>
            
            <button class="action-btn payment-btn" @click="showPayBill = true">
              <div class="action-icon-wrapper">
                <svg class="action-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <rect x="2" y="5" width="20" height="14" rx="2"/>
                  <line x1="2" y1="10" x2="22" y2="10"/>
                  <circle cx="7" cy="15" r="1"/>
                </svg>
                <div class="icon-badge">M-PESA</div>
              </div>
              <span class="action-label">Pay Bill</span>
              <span class="action-sublabel">Quick payment</span>
            </button>
            
            <button class="action-btn support-btn" @click="activeSection = 'support'; drawerOpen = false">
              <div class="action-icon-wrapper">
                <svg class="action-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M3 11c0-3.771 0-5.657 1.172-6.828C5.343 3 7.229 3 11 3h2c3.771 0 5.657 0 6.828 1.172C21 5.343 21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828C18.657 21 16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172C3 18.657 3 16.771 3 13v-2z"/>
                  <path d="M8 10h8"/>
                  <path d="M8 14h5"/>
                </svg>
                <div class="icon-notification">24/7</div>
              </div>
              <span class="action-label">Get Support</span>
              <span class="action-sublabel">We're here to help</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Cards -->
    <section class="stats-section" v-if="activeSection === 'overview'">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-image-wrapper">
              <img src="/images/fast.png" alt="Network" class="stat-image" />
              <div class="stat-overlay"></div>
            </div>
            <div class="stat-content">
              <h3>{{ currentPlan }}</h3>
              <p>Current Plan</p>
              <router-link to="/plans" class="stat-link">Upgrade Plan →</router-link>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-image-wrapper">
              <img src="/images/affordable.jpg" alt="Balance" class="stat-image" />
              <div class="stat-overlay"></div>
            </div>
            <div class="stat-content">
              <h3>KSh {{ balance }}</h3>
              <p>Account Balance</p>
              <a href="#" class="stat-link" @click.prevent="topUp">Top Up →</a>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-image-wrapper">
              <img src="/images/reliable.jpg" alt="Data Usage" class="stat-image" />
              <div class="stat-overlay"></div>
            </div>
            <div class="stat-content">
              <h3>{{ dataUsed }}GB / {{ dataCap }}GB</h3>
              <p>Data Used This Month</p>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: dataPercentage + '%' }"></div>
              </div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-image-wrapper">
              <img src="/images/INTERNET1.jpg" alt="Billing" class="stat-image" />
              <div class="stat-overlay"></div>
            </div>
            <div class="stat-content">
              <h3>{{ daysLeft }} Days</h3>
              <p>Until Next Billing</p>
              <span class="stat-link">Due: {{ nextBillingDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Grid -->
    <section class="main-content" v-if="activeSection === 'overview'">
      <div class="container">
        <div class="content-grid">
          <!-- Usage Chart -->
          <div class="dashboard-card chart-card">
            <div class="card-header">
              <h2>Data Usage Trend</h2>
              <select v-model="selectedPeriod" class="period-selector">
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 3 Months</option>
              </select>
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <div class="chart-bars">
                  <div v-for="(day, index) in usageData" :key="index" class="bar-wrapper">
                    <div class="bar" :style="{ height: (day.usage / 5) * 100 + '%' }"></div>
                    <span class="bar-label">{{ day.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="dashboard-card links-card">
            <div class="card-header">
              <h2>Quick Links</h2>
            </div>
            <div class="links-list">
              <router-link to="/plans" class="link-item">
                <div class="link-icon-wrapper link-gradient-1">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <div>
                  <h3>Upgrade Plan</h3>
                  <p>Get faster speeds</p>
                </div>
                <span class="arrow">→</span>
              </router-link>
              <a href="#" @click.prevent="viewBills" class="link-item">
                <div class="link-icon-wrapper link-gradient-2">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div>
                  <h3>View Bills</h3>
                  <p>Payment history</p>
                </div>
                <span class="arrow">→</span>
              </a>
              <router-link to="/contact" class="link-item">
                <div class="link-icon-wrapper link-gradient-3">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h3>Contact Support</h3>
                  <p>Get help 24/7</p>
                </div>
                <span class="arrow">→</span>
              </router-link>
              <a href="#" @click.prevent="updateProfile" class="link-item">
                <div class="link-icon-wrapper link-gradient-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m6-11.5l-4 4m-4 4l-4 4m11.5-6h-6m-6 0h-6m11.5 6l-4-4m-4-4l-4-4"/>
                  </svg>
                </div>
                <div>
                  <h3>Settings</h3>
                  <p>Manage account</p>
                </div>
                <span class="arrow">→</span>
              </a>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="dashboard-card activity-card">
            <div class="card-header">
              <h2>Recent Activity</h2>
              <a href="#" class="view-all">View All</a>
            </div>
            <div class="activity-list">
              <div v-if="recentActivity.length === 0" class="activity-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>No recent activity</p>
              </div>
              <div v-for="(activity, index) in recentActivity" :key="index" class="activity-item">
                <div class="activity-icon-wrapper" :class="'activity-' + activity.icon">
                  <!-- Payment Icon -->
                  <svg v-if="activity.icon === 'payment'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                    <path d="M12 18V6"/>
                  </svg>
                  <!-- Login Icon -->
                  <svg v-if="activity.icon === 'login'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  <!-- Logout Icon -->
                  <svg v-if="activity.icon === 'logout'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <!-- Profile Icon -->
                  <svg v-if="activity.icon === 'profile'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <!-- Upgrade/Plan Icon -->
                  <svg v-if="activity.icon === 'upgrade'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <line x1="12" y1="19" x2="12" y2="5"/>
                    <polyline points="5 12 12 5 19 12"/>
                  </svg>
                  <!-- Data Icon -->
                  <svg v-if="activity.icon === 'data'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <line x1="12" y1="20" x2="12" y2="10"/>
                    <line x1="18" y1="20" x2="18" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="16"/>
                  </svg>
                  <!-- Support Icon -->
                  <svg v-if="activity.icon === 'support'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <!-- Security Icon -->
                  <svg v-if="activity.icon === 'security'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <!-- Email Icon -->
                  <svg v-if="activity.icon === 'email'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <!-- Default Icon -->
                  <svg v-if="!['payment', 'login', 'logout', 'profile', 'upgrade', 'data', 'support', 'security', 'email'].includes(activity.icon)" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div class="activity-content">
                  <h3>{{ activity.title }}</h3>
                  <p>{{ activity.description }}</p>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Entertainment Hub -->
          <div class="dashboard-card entertainment-card">
            <div class="card-header">
              <h2>Your #1 Entertainment</h2>
              <span class="entertainment-badge">Unlimited Streaming</span>
            </div>
            <div class="entertainment-content">
              
              <!-- Entertainment Categories -->
              <div class="entertainment-grid">
                <div class="entertainment-item movies" @click="handleEntertainmentClick('movies')">
                  <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop" alt="Movies" class="entertainment-bg">
                  <div class="entertainment-overlay"></div>
                  <div class="entertainment-info">
                    <h3>Movies</h3>
                    <p>Watch blockbusters & classics</p>
                    <div class="entertainment-badge-small">4K Ultra HD</div>
                  </div>
                </div>

                <div class="entertainment-item sports" @click="handleEntertainmentClick('sports')">
                  <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop" alt="Sports" class="entertainment-bg">
                  <div class="entertainment-overlay"></div>
                  <div class="entertainment-info">
                    <h3>Sports</h3>
                    <p>Live games & highlights</p>
                    <div class="entertainment-badge-small">Live Streaming</div>
                  </div>
                </div>

                <div class="entertainment-item football" @click="handleEntertainmentClick('football')">
                  <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop" alt="Premier League" class="entertainment-bg">
                  <div class="entertainment-overlay"></div>
                  <div class="entertainment-info">
                    <h3>Premier League</h3>
                    <p>All matches live & exclusive</p>
                    <div class="entertainment-badge-small">HD Quality</div>
                  </div>
                </div>

                <div class="entertainment-item news" @click="handleEntertainmentClick('news')">
                  <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop" alt="News" class="entertainment-bg">
                  <div class="entertainment-overlay"></div>
                  <div class="entertainment-info">
                    <h3>Breaking News</h3>
                    <p>Stay informed 24/7</p>
                    <div class="entertainment-badge-small">Live Updates</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Promotions Banner -->
    <section class="promotions-section" v-if="activeSection === 'overview'">
      <div class="container">
        <div class="promo-banner">
          <div class="promo-content">
            <span class="promo-badge">SPECIAL OFFER</span>
            <h2>Refer and Earn - Get Rewarded for Every Friend!</h2>
            <p>Share your referral code and earn bonuses when friends sign up.</p>
          </div>
          <router-link to="/plans" class="promo-btn">Start Referring</router-link>
        </div>
      </div>
    </section>
    
    <!-- WiFi Settings Section -->
    <section class="wifi-settings-section" v-if="activeSection === 'settings'">
      <div class="container">
        <div class="settings-header">
          <h1>WiFi Router Settings</h1>
          <p class="settings-subtitle">Manage your WiFi network name and password</p>
        </div>

        <!-- Router Admin Interface -->
        <div class="router-interface-card">
          <div class="interface-header">
            <div class="header-left">
              <div class="card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <div>
                <h2>Router Admin Panel</h2>
                <p class="interface-subtitle">Access your router settings to change WiFi name and password</p>
              </div>
            </div>
          </div>
          
          <div class="router-credentials">
            <div class="credential-item">
              <span class="credential-label">Router IP:</span>
              <div class="credential-value-group">
                <span class="credential-value">192.168.0.1</span>
                <button @click="copyToClipboard('192.168.0.1')" class="mini-copy-btn" title="Copy">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="credential-item">
              <span class="credential-label">Username:</span>
              <div class="credential-value-group">
                <span class="credential-value">admin</span>
                <button @click="copyToClipboard('admin')" class="mini-copy-btn" title="Copy">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="credential-item">
              <span class="credential-label">Password:</span>
              <div class="credential-value-group">
                <span class="credential-value">uSERADMIN</span>
                <button @click="copyToClipboard('uSERADMIN')" class="mini-copy-btn" title="Copy">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="router-access-content">
            <div class="access-message">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <h3>Click below to access your router settings</h3>
              <p>A new window will open with your router admin panel where you can change your WiFi name and password.</p>
              
              <a href="http://192.168.0.1" target="_blank" class="open-router-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Open Router Admin Panel
              </a>
              
              <div class="access-steps">
                <div class="step-mini">
                  <div class="step-mini-number">1</div>
                  <span>Click the button above to open router settings</span>
                </div>
                <div class="step-mini">
                  <div class="step-mini-number">2</div>
                  <span>Login with credentials shown above</span>
                </div>
                <div class="step-mini">
                  <div class="step-mini-number">3</div>
                  <span>Navigate to Wireless/WiFi settings</span>
                </div>
                <div class="step-mini">
                  <div class="step-mini-number">4</div>
                  <span>Update your WiFi name and password</span>
                </div>
              </div>
              
              <div class="security-note">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <p><strong>Note:</strong> Make sure you're connected to your Comrades WiFi network before accessing the router.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="settings-grid">


          <!-- Instructions Card -->
          <div class="settings-card instructions-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h2>How to Change WiFi Settings</h2>
            </div>
            <div class="instructions-content">
              <div class="instruction-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Connect to Your WiFi Network</h3>
                  <p>Make sure your device is connected to your Comrades WiFi network.</p>
                </div>
              </div>
              <div class="instruction-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Access Router Admin Panel</h3>
                  <p>Click the "Open Router Admin Panel" button above or manually navigate to <strong>192.168.0.1</strong> in your web browser.</p>
                </div>
              </div>
              <div class="instruction-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Login to Router</h3>
                  <p>Enter username: <strong>admin</strong> and password: <strong>uSERADMIN</strong></p>
                </div>
              </div>
              <div class="instruction-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Navigate to WiFi Settings</h3>
                  <p>Look for "Wireless Settings", "WiFi Settings", or "WLAN" in the router menu.</p>
                </div>
              </div>
              <div class="instruction-step">
                <div class="step-number">5</div>
                <div class="step-content">
                  <h3>Update Network Name (SSID)</h3>
                  <p>Find the "Network Name" or "SSID" field and enter your desired WiFi name.</p>
                </div>
              </div>
              <div class="instruction-step">
                <div class="step-number">6</div>
                <div class="step-content">
                  <h3>Update WiFi Password</h3>
                  <p>Find the "Password" or "Pre-Shared Key" field and enter your new password (minimum 8 characters).</p>
                </div>
              </div>
              <div class="instruction-step">
                <div class="step-number">7</div>
                <div class="step-content">
                  <h3>Save Changes</h3>
                  <p>Click "Save" or "Apply" to save your new settings. The router may reboot.</p>
                </div>
              </div>
              <div class="instruction-step">
                <div class="step-number">8</div>
                <div class="step-content">
                  <h3>Reconnect Your Devices</h3>
                  <p>After the router reboots, reconnect all your devices using the new WiFi name and password.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Supported Routers Card -->
          <div class="settings-card routers-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                  <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                  <line x1="12" y1="20" x2="12.01" y2="20"></line>
                </svg>
              </div>
              <h2>Supported Router Brands</h2>
            </div>
            <div class="routers-grid">
              <div class="router-brand">
                <div class="brand-icon">TP</div>
                <span>TP-Link</span>
              </div>
              <div class="router-brand">
                <div class="brand-icon">TD</div>
                <span>Tenda</span>
              </div>
              <div class="router-brand">
                <div class="brand-icon">DL</div>
                <span>D-Link</span>
              </div>
              <div class="router-brand">
                <div class="brand-icon">ZT</div>
                <span>ZTE</span>
              </div>
              <div class="router-brand">
                <div class="brand-icon">HW</div>
                <span>Huawei</span>
              </div>
              <div class="router-brand">
                <div class="brand-icon">NT</div>
                <span>Netgear</span>
              </div>
            </div>
            <div class="router-note">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <p>All routers use the same login credentials: <strong>admin / uSERADMIN</strong></p>
            </div>
          </div>

          <!-- Tips Card -->
          <div class="settings-card tips-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h2>Security Tips</h2>
            </div>
            <div class="tips-content">
              <div class="tip-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <p>Use a strong password with at least 12 characters, including uppercase, lowercase, numbers, and symbols.</p>
              </div>
              <div class="tip-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <p>Avoid using common words, personal information, or easily guessable patterns in your WiFi password.</p>
              </div>
              <div class="tip-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <p>Change your WiFi password regularly (every 3-6 months) for better security.</p>
              </div>
              <div class="tip-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <p>Don't share your WiFi password publicly or with unauthorized users.</p>
              </div>
              <div class="tip-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <p>Keep your router's admin password (uSERADMIN) confidential and secure.</p>
              </div>
            </div>
          </div>

          <!-- Need Help Card -->
          <div class="settings-card help-card">
            <div class="help-content">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h2>Need Help?</h2>
              <p>If you're having trouble accessing your router or changing your WiFi settings, our support team is here to help.</p>
              <router-link to="/contact" class="help-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Contact Support
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Support Section -->
    <section class="support-section" v-if="activeSection === 'support'">
      <div class="container">
        <div class="settings-header">
          <h1>Get Support</h1>
          <p class="settings-subtitle">We're here to help you 24/7</p>
        </div>

        <div class="support-grid">
          <!-- Contact Methods -->
          <div class="support-card contact-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h2>Contact Methods</h2>
            </div>
            <div class="contact-methods">
              <a href="tel:+254793590575" class="contact-method">
                <div class="method-icon phone">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div class="method-info">
                  <h3>Call Us</h3>
                  <p>0793 590 575</p>
                  <span class="method-label">Available 24/7</span>
                </div>
              </a>

              <a href="tel:+254703551813" class="contact-method">
                <div class="method-icon phone">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div class="method-info">
                  <h3>Technical Support</h3>
                  <p>0703 551 813</p>
                  <span class="method-label">Available 24/7</span>
                </div>
              </a>

              <a href="tel:+254740588951" class="contact-method">
                <div class="method-icon phone">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div class="method-info">
                  <h3>Customer Service</h3>
                  <p>0740 588 951</p>
                  <span class="method-label">Available 24/7</span>
                </div>
              </a>

              <a href="mailto:support@comrades.net" class="contact-method">
                <div class="method-icon email">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div class="method-info">
                  <h3>Email Support</h3>
                  <p>support@comrades.net</p>
                  <span class="method-label">Response within 24 hours</span>
                </div>
              </a>

              <a href="https://wa.me/254793590575" target="_blank" class="contact-method">
                <div class="method-icon whatsapp">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <div class="method-info">
                  <h3>WhatsApp</h3>
                  <p>0793 590 575</p>
                  <span class="method-label">Chat with us instantly</span>
                </div>
              </a>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="support-card faq-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div class="faq-list">
              <div class="faq-item">
                <h3>How do I change my WiFi password?</h3>
                <p>Go to Settings section, enter the admin password (uSERADMIN), and update your WiFi password.</p>
              </div>
              <div class="faq-item">
                <h3>How do I pay my bill?</h3>
                <p>Click "Pay Bill" button, select or enter amount, and follow M-PESA payment instructions.</p>
              </div>
              <div class="faq-item">
                <h3>How do I upgrade my plan?</h3>
                <p>Visit the Plans page or click "Upgrade Plan" from your dashboard to see available options.</p>
              </div>
              <div class="faq-item">
                <h3>What if I forget my admin password?</h3>
                <p>Contact our support team via phone, email, or WhatsApp for password reset assistance.</p>
              </div>
              <div class="faq-item">
                <h3>How do I check my data usage?</h3>
                <p>Your current data usage is displayed on the dashboard overview section with a progress bar.</p>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="support-card actions-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <h2>Quick Actions</h2>
            </div>
            <div class="actions-list">
              <button class="action-item" @click="activeSection = 'settings'">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m-3 3l-4.2 4.2m8.4-8.4l4.2 4.2m-3 3l4.2 4.2"></path>
                </svg>
                <span>WiFi Settings</span>
              </button>
              <button class="action-item" @click="showPayBill = true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                  <path d="M12 18V6"></path>
                </svg>
                <span>Pay Bill</span>
              </button>
              <router-link to="/plans" class="action-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                <span>View Plans</span>
              </router-link>
              <button class="action-item" @click="showProfile = true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- My Profile Section -->
    <section class="profile-section" v-if="activeSection === 'profile'">
      <div class="container profile-container">
        <div class="settings-header">
          <h1>My Profile</h1>
          <p class="settings-subtitle">Manage your account information</p>
        </div>

        <div class="profile-content-wrapper">
          <div class="card-header profile-section-header">
            <div class="card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2>Personal Information</h2>
          </div>
          
          <form class="profile-form" @submit.prevent>
            <div class="form-grid">
              <div class="form-group">
                <label for="profile-name">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="profile-name" 
                  :value="userName" 
                  readonly
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="profile-email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="m2 7 10 5 10-5"></path>
                  </svg>
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="profile-email" 
                  :value="userEmail" 
                  readonly
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="profile-phone">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                  Mobile Number
                </label>
                <input 
                  type="tel" 
                  id="profile-phone" 
                  :value="userPhone" 
                  readonly
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="profile-plan">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  Current Plan
                </label>
                <input 
                  type="text" 
                  id="profile-plan" 
                  :value="currentPlan" 
                  readonly
                  class="form-input plan-input"
                />
              </div>

              <div class="form-group">
                <label for="profile-created">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Account Created
                </label>
                <input 
                  type="text" 
                  id="profile-created" 
                  :value="createdAt" 
                  readonly
                  class="form-input"
                />
              </div>
            </div>
          </form>
          
          <div class="profile-actions-row">
            <button class="edit-profile-btn" @click="showProfile = true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit Profile
            </button>
          </div>
        </div>

        <!-- Quick Actions Below Profile -->
        <div class="profile-actions-footer">
          <button class="profile-action-btn" @click="showPayBill = true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
              <path d="M12 18V6"/>
            </svg>
            <span>Pay Bill</span>
          </button>
          <router-link to="/plans" class="profile-action-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <span>View Plans</span>
          </router-link>
          <button class="profile-action-btn" @click="activeSection = 'billing'">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <span>Billing History</span>
          </button>
          <button class="profile-action-btn" @click="activeSection = 'support'">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>Get Support</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Billing History Section -->
    <section class="billing-section" v-if="activeSection === 'billing'">
      <div class="container">
        <div class="settings-header">
          <h1>Billing History</h1>
          <p class="settings-subtitle">View your payment transactions and invoices</p>
        </div>

        <div class="billing-grid">
          <!-- Billing Summary -->
          <div class="billing-card summary-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="5" width="20" height="14" rx="2"/>
                  <line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
              </div>
              <h2>Billing Summary</h2>
            </div>
            <div class="summary-details">
              <div class="summary-item">
                <span class="summary-label">Current Balance</span>
                <span class="summary-value balance">KSh {{ balance }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Current Plan</span>
                <span class="summary-value">{{ currentPlan }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Next Billing Date</span>
                <span class="summary-value">{{ nextBillingDate }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Days Remaining</span>
                <span class="summary-value">{{ daysLeft }} days</span>
              </div>
            </div>
            <button class="pay-now-btn" @click="showPayBill = true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Pay Now
            </button>
          </div>

          <!-- Transaction History -->
          <div class="billing-card transactions-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h2>Recent Transactions</h2>
            </div>
            <div class="transactions-list">
              <div class="transaction-item">
                <div class="transaction-icon success">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div class="transaction-info">
                  <h3>Payment Received</h3>
                  <p>M-PESA • Nov 10, 2025</p>
                </div>
                <span class="transaction-amount success">+KSh 1,399</span>
              </div>
              <div class="transaction-item">
                <div class="transaction-icon pending">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div class="transaction-info">
                  <h3>Plan Subscription</h3>
                  <p>Auto-debit • Nov 1, 2025</p>
                </div>
                <span class="transaction-amount debit">-KSh 999</span>
              </div>
              <div class="transaction-item">
                <div class="transaction-icon success">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div class="transaction-info">
                  <h3>Payment Received</h3>
                  <p>M-PESA • Oct 25, 2025</p>
                </div>
                <span class="transaction-amount success">+KSh 999</span>
              </div>
              <div class="transaction-item">
                <div class="transaction-icon pending">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div class="transaction-info">
                  <h3>Plan Subscription</h3>
                  <p>Auto-debit • Oct 1, 2025</p>
                </div>
                <span class="transaction-amount debit">-KSh 999</span>
              </div>
            </div>
            <button class="view-all-btn">View All Transactions</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Current Plan Section -->
    <section class="current-plan-section" v-if="activeSection === 'plan'">
      <div class="container">
        <div class="settings-header">
          <h1>Current Plan</h1>
          <p class="settings-subtitle">Manage your subscription and usage</p>
        </div>

        <div class="plan-grid">
          <!-- Plan Details -->
          <div class="plan-card details-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h2>Plan Details</h2>
            </div>
            <div class="plan-details">
              <div class="plan-name">
                <h3>{{ currentPlan }}</h3>
                <span class="plan-badge active">Active</span>
              </div>
              <div class="plan-features">
                <div class="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Unlimited Data</span>
                </div>
                <div class="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>24/7 Customer Support</span>
                </div>
                <div class="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Free WiFi Router</span>
                </div>
                <div class="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>No Installation Fee</span>
                </div>
              </div>
              <div class="plan-pricing">
                <span class="price-label">Monthly Price</span>
                <span class="price-value">KSh 999/month</span>
              </div>
            </div>
            <router-link to="/plans" class="upgrade-plan-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <polyline points="19 12 12 19 5 12"/>
              </svg>
              Upgrade Plan
            </router-link>
          </div>

          <!-- Data Usage -->
          <div class="plan-card usage-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                </svg>
              </div>
              <h2>Data Usage</h2>
            </div>
            <div class="usage-details">
              <div class="usage-chart">
                <div class="usage-circle">
                  <svg viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#E5E7EB" stroke-width="20"/>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#667eea" stroke-width="20" 
                            :stroke-dasharray="`${(dataUsed / dataCap) * 502.4} 502.4`"
                            transform="rotate(-90 100 100)"/>
                  </svg>
                  <div class="usage-text">
                    <h3>{{ dataPercentage }}%</h3>
                    <p>Used</p>
                  </div>
                </div>
              </div>
              <div class="usage-stats">
                <div class="usage-stat">
                  <span class="stat-label">Data Used</span>
                  <span class="stat-value">{{ dataUsed }}GB</span>
                </div>
                <div class="usage-stat">
                  <span class="stat-label">Data Remaining</span>
                  <span class="stat-value">{{ dataCap - dataUsed }}GB</span>
                </div>
                <div class="usage-stat">
                  <span class="stat-label">Total Allocation</span>
                  <span class="stat-value">{{ dataCap }}GB</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Billing Info -->
          <div class="plan-card billing-info-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              </div>
              <h2>Billing Information</h2>
            </div>
            <div class="billing-info">
              <div class="billing-item">
                <span class="billing-label">Next Billing Date</span>
                <span class="billing-value">{{ nextBillingDate }}</span>
              </div>
              <div class="billing-item">
                <span class="billing-label">Days Remaining</span>
                <span class="billing-value">{{ daysLeft }} days</span>
              </div>
              <div class="billing-item">
                <span class="billing-label">Current Balance</span>
                <span class="billing-value balance">KSh {{ balance }}</span>
              </div>
              <div class="billing-item">
                <span class="billing-label">Auto-Renewal</span>
                <span class="billing-value status">Enabled</span>
              </div>
            </div>
            <button class="manage-billing-btn" @click="activeSection = 'billing'">
              View Billing History
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Pay Bill Modal -->
    <div v-if="showPayBill" class="modal-overlay" @click="showPayBill = false">
      <div class="modal-content payment-modal" @click.stop>
        <button class="modal-close" @click="showPayBill = false">✕</button>
        <div class="payment-content">
          <div class="payment-header">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
            <h2>Pay Your Bill</h2>
            <p class="payment-subtitle">Quick and secure M-PESA payment</p>
          </div>

          <div class="payment-info">
            <div class="info-card balance-card">
              <div class="info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <div>
                <span class="info-label">Current Balance</span>
                <span class="info-value">KSh {{ balance }}</span>
              </div>
            </div>
            <div class="info-card plan-card">
              <div class="info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <span class="info-label">Current Plan</span>
                <span class="info-value">{{ currentPlan }}</span>
              </div>
            </div>
          </div>

          <div class="payment-form">
            <h3>Payment Amount</h3>
            <div class="amount-options">
              <button v-for="amount in [999, 1399, 1799, 2199]" :key="amount"
                      @click="selectedAmount = amount"
                      class="amount-btn"
                      :class="{ active: selectedAmount === amount }">
                KSh {{ amount }}
              </button>
            </div>
            <div class="custom-amount">
              <label>Or enter custom amount</label>
              <input v-model="customAmount" type="number" class="amount-input" placeholder="Enter amount">
            </div>

            <div class="mpesa-info">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <p>Payment will be sent to your registered M-PESA number: <strong>{{ userPhone || 'Not set' }}</strong></p>
            </div>

            <button @click="initiatePayment" class="pay-btn" :disabled="!selectedAmount && !customAmount">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Initiate M-PESA Payment
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Speed Test Modal -->
    <div v-if="showSpeedTest" class="modal-overlay" @click="showSpeedTest = false">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="showSpeedTest = false">✕</button>
        <SpeedTestWidget />
      </div>
    </div>

    <!-- Profile Modal -->
    <div v-if="showProfile" class="modal-overlay" @click="showProfile = false">
      <div class="modal-content profile-modal" @click.stop>
        <button class="modal-close" @click="showProfile = false">✕</button>
        <div class="profile-content">
          <h2>Edit Profile</h2>
          <p class="profile-subtitle">Update your account information</p>
          
          <div class="profile-form">
            <div class="form-group">
              <label>Full Name</label>
              <input v-model="editForm.fullName" type="text" class="form-input" placeholder="Enter your name" disabled />
              <small class="form-hint">🔒 Name cannot be changed. Contact support if you need to update it.</small>
            </div>
            
            <div class="form-group">
              <label>Email Address</label>
              <input v-model="editForm.email" type="email" class="form-input" placeholder="Enter your email" />
            </div>
            
            <div class="form-group">
              <label>Mobile Number</label>
              <input v-model="editForm.phone" type="tel" class="form-input" placeholder="+254 XXX XXX XXX" />
              <small class="form-hint">💡 This number will be used for M-PESA payments. Update here whenever you want to change your payment number.</small>
            </div>
            
            <div class="form-group">
              <label>National ID Number</label>
              <input v-model="editForm.nationalId" type="text" class="form-input" placeholder="Enter ID number" />
            </div>
            
            <div class="form-group">
              <label>Physical Address</label>
              <textarea v-model="editForm.address" class="form-input" rows="3" placeholder="Enter your address"></textarea>
            </div>
            
            <div class="form-group">
              <label>Current Plan</label>
              <div class="plan-display">
                <div class="plan-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {{ currentPlan }}
                </div>
                <span class="plan-note">Plan management coming soon</span>
              </div>
            </div>
            
            <div class="form-actions">
              <button @click="saveProfile" class="btn btn-save">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Save Changes
              </button>
              <button @click="showProfile = false" class="btn btn-cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/services/api.js'
import SpeedTestWidget from '@/components/SpeedTestWidget.vue'

export default {
  name: 'Dashboard',
  components: {
    SpeedTestWidget
  },
  data() {
    return {
      showSpeedTest: false,
      showProfile: false,
      showPayBill: false,
      userMenuOpen: false,
      drawerOpen: false,
      activeSection: 'overview',
      selectedAmount: null,
      customAmount: '',
      userName: 'User',
      userEmail: '',
      userPhone: '',
      userId: null,
      createdAt: '',
      editForm: {
        fullName: '',
        email: '',
        phone: '',
        nationalId: '',
        address: ''
      },
      currentPlan: '10 Mbps',
      balance: '2,500',
      dataUsed: 45,
      dataCap: 100,
      daysLeft: 12,
      nextBillingDate: 'Nov 23, 2025',
      downloadSpeed: '9.8',
      uploadSpeed: '8.5',
      latency: '12',
      selectedPeriod: '7',
      usageData: [
        { label: 'Mon', usage: 3.2 },
        { label: 'Tue', usage: 4.1 },
        { label: 'Wed', usage: 2.8 },
        { label: 'Thu', usage: 4.5 },
        { label: 'Fri', usage: 3.9 },
        { label: 'Sat', usage: 4.8 },
        { label: 'Sun', usage: 3.5 }
      ],
      recentActivity: [],
      activityPolling: null,
      sessionTimeout: null,
      lastActivityTime: Date.now(),
      sessionDuration: 30 * 60 * 1000, // 30 minutes in milliseconds
      notification: {
        show: false,
        message: '',
        type: 'success' // 'success', 'error', 'info'
      }
    }
  },
  computed: {
    dataPercentage() {
      return (this.dataUsed / this.dataCap) * 100
    },
    userInitial() {
      return this.userName.charAt(0).toUpperCase()
    },
    displayUserName() {
      // Check if userName is an email, if so capitalize first letter nicely
      if (this.userName && !this.userName.includes('@')) {
        return this.userName
      }
      // If it's an email prefix, format it nicely (capitalize first letter)
      const name = this.userName.split('@')[0]
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
    speedAngle() {
      // Convert speed (0-100 Mbps) to angle (-90 to 90 degrees)
      // Max speed is 100 Mbps, angle range is 180 degrees
      const maxSpeed = 100
      const speed = parseFloat(this.downloadSpeed) || 0
      const normalizedSpeed = Math.min(speed / maxSpeed, 1)
      return -90 + (normalizedSpeed * 180)
    }
  },
  async mounted() {
    await this.fetchUserData()
    await this.fetchRecentActivities()
    // Poll for new activities every 30 seconds
    this.activityPolling = setInterval(() => {
      this.fetchRecentActivities()
    }, 30000)
    
    // Initialize session timeout
    this.startSessionTimeout()
    this.setupActivityListeners()
    
    // Show login success notification
    this.showNotification('Login successful! Welcome back.', 'success')
  },
  beforeUnmount() {
    // Clean up polling interval
    if (this.activityPolling) {
      clearInterval(this.activityPolling)
    }
    // Clean up session timeout
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout)
    }
    // Remove activity listeners
    this.removeActivityListeners()
  },
  methods: {
    handleEntertainmentClick(category) {
      console.log(`Opening ${category} entertainment`)
      // Future implementation: Navigate to entertainment section or open modal
    },
    getActivityIcon(activityType) {
      const iconMap = {
        'login': 'login',
        'logout': 'logout',
        'payment': 'payment',
        'profile_update': 'profile',
        'plan_change': 'upgrade',
        'support_ticket': 'support',
        'data_alert': 'data',
        'password_change': 'security',
        'email_change': 'email'
      }
      return iconMap[activityType] || 'default'
    },
    async fetchRecentActivities() {
      try {
        const { getRecentActivities } = await import('@/services/api')
        const activities = await getRecentActivities(this.userId, 10)
        
        this.recentActivity = activities.map(activity => ({
          icon: this.getActivityIcon(activity.activity_type),
          title: activity.title,
          description: activity.description,
          time: activity.time_ago || this.formatTimeAgo(activity.created_at)
        }))
      } catch (error) {
        console.error('Error fetching activities:', error)
      }
    },
    formatTimeAgo(timestamp) {
      const now = new Date()
      const activityDate = new Date(timestamp)
      const diffMs = now - activityDate
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)
      
      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
      if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
      if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
      return activityDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    },
    async fetchUserData() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        
        if (user) {
          this.userId = user.id
          this.userEmail = user.email
          
          // Fetch user profile from database (correct table: profiles)
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('full_name, phone, plan, balance, created_at')
            .eq('id', user.id)
            .single()
          
          console.log('✅ Fetched profile from Supabase:', profile)
          console.log('❌ Profile fetch error:', profileError)
          
          if (!profileError && profile) {
            this.userName = profile.full_name || user.email.split('@')[0]
            this.userPhone = profile.phone || 'Not set'
            this.currentPlan = profile.plan || '10 Mbps'
            this.createdAt = profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Not available'
            
            console.log('📝 Set userName to:', this.userName)
            console.log('📱 Set userPhone to:', this.userPhone)
            
            // Populate edit form
            this.editForm = {
              fullName: profile.full_name || '',
              email: user.email || '',
              phone: profile.phone || '',
              nationalId: '',
              address: ''
            }
          } else {
            this.userName = user.email.split('@')[0]
            this.editForm.email = user.email
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        // If not authenticated, redirect to auth page
        this.$router.push('/auth')
      }
    },
    async logout() {
      try {
        // Log logout activity before signing out
        const { logLogout } = await import('@/services/api')
        await logLogout(this.userId)
        
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        
        // Clear all stored session data
        localStorage.removeItem('rememberMe')
        sessionStorage.clear()
        
        // Redirect to auth page with clearForm flag
        this.$router.push({ path: '/auth', query: { clearForm: 'true' } })
      } catch (error) {
        console.error('Error logging out:', error)
        this.showNotification('Failed to logout. Please try again.', 'error')
      }
    },
    startSessionTimeout() {
      // Clear existing timeout
      if (this.sessionTimeout) {
        clearTimeout(this.sessionTimeout)
      }
      
      // Set new timeout
      this.sessionTimeout = setTimeout(() => {
        this.handleSessionExpired()
      }, this.sessionDuration)
    },
    resetSessionTimeout() {
      this.lastActivityTime = Date.now()
      this.startSessionTimeout()
    },
    setupActivityListeners() {
      // Listen for user activity to reset timeout
      const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']
      events.forEach(event => {
        document.addEventListener(event, this.handleUserActivity)
      })
    },
    removeActivityListeners() {
      const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']
      events.forEach(event => {
        document.removeEventListener(event, this.handleUserActivity)
      })
    },
    handleUserActivity() {
      // Only reset if more than 1 minute has passed since last activity
      const now = Date.now()
      if (now - this.lastActivityTime > 60000) {
        this.resetSessionTimeout()
      }
    },
    async handleSessionExpired() {
      this.showNotification('Your session has expired. Please login again.', 'info')
      
      // Wait for notification to be visible
      setTimeout(async () => {
        try {
          const { logLogout } = await import('@/services/api')
          await logLogout(this.userId)
          await supabase.auth.signOut()
          
          // Clear all stored session data
          localStorage.removeItem('rememberMe')
          sessionStorage.clear()
          
          this.$router.push('/auth')
        } catch (error) {
          console.error('Error during session expiry:', error)
          this.$router.push('/auth')
        }
      }, 2000)
    },
    showNotification(message, type = 'success') {
      this.notification.message = message
      this.notification.type = type
      this.notification.show = true
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        this.notification.show = false
      }, 3000)
    },
    toggleUserMenu() {
      this.userMenuOpen = !this.userMenuOpen
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert(`Copied: ${text}`)
      }).catch(err => {
        console.error('Failed to copy:', err)
      })
    },
    async initiatePayment() {
      const amount = this.customAmount || this.selectedAmount
      if (!amount) {
        alert('Please select or enter an amount')
        return
      }
      if (!this.userPhone) {
        alert('Please update your phone number in profile settings first')
        return
      }
      
      // Log payment activity
      try {
        const { logPayment } = await import('@/services/api')
        await logPayment(this.userId, amount, this.currentPlan)
        await this.fetchRecentActivities()
      } catch (error) {
        console.error('Error logging payment:', error)
      }
      
      alert(`M-PESA payment request will be sent to ${this.userPhone} for KSh ${amount}. This feature will be fully implemented soon!`)
      this.showPayBill = false
      this.selectedAmount = null
      this.customAmount = ''
    },
    topUp() {
      alert('Top up feature coming soon!')
    },
    viewBills() {
      alert('Bills page coming soon!')
    },
    updateProfile() {
      // Populate form with current data
      this.editForm = {
        fullName: this.userName,
        email: this.userEmail,
        phone: this.userPhone,
        nationalId: this.editForm.nationalId,
        address: this.editForm.address
      }
      this.showProfile = true
    },
    async saveProfile() {
      // Ask for confirmation before saving
      const confirmed = confirm('Are you sure you want to save these changes to your profile?')
      if (!confirmed) {
        return
      }
      
      try {
        const changes = {}
        const oldProfile = {
          fullName: this.userName,
          email: this.userEmail,
          phone: this.userPhone
        }
        
        // Track what changed (excluding fullName as it cannot be changed)
        if (this.editForm.phone !== oldProfile.phone) changes.phone = this.editForm.phone
        if (this.editForm.email !== oldProfile.email) changes.email = this.editForm.email
        
        // Update user profile in database (correct table: profiles)
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            phone: this.editForm.phone
          })
          .eq('id', this.userId)
        
        if (profileError) throw profileError
        
        // Update email if changed
        if (this.editForm.email !== this.userEmail) {
          const { error: emailError } = await supabase.auth.updateUser({
            email: this.editForm.email
          })
          if (emailError) throw emailError
          this.showNotification('Profile updated! Please check your new email for verification.', 'info')
        } else {
          this.showNotification('Profile updated successfully!', 'success')
        }
        
        // Log profile update activity
        if (Object.keys(changes).length > 0) {
          const { logProfileUpdate } = await import('@/services/api')
          await logProfileUpdate(this.userId, changes)
        }
        
        // Update local state
        this.userEmail = this.editForm.email
        this.userPhone = this.editForm.phone
        
        this.showProfile = false
        
        // Refresh user data and activities to reflect changes
        await this.fetchUserData()
        await this.fetchRecentActivities()
      } catch (error) {
        console.error('Error updating profile:', error)
        this.showNotification('Failed to update profile: ' + error.message, 'error')
      }
    }
  }
}
</script>

<style scoped>
/* Notification Popup */
.notification-popup {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  font-weight: 600;
  min-width: 300px;
  max-width: 500px;
  animation: slideIn 0.3s ease;
}

.notification-popup.success {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
}

.notification-popup.error {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
}

.notification-popup.info {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: white;
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  flex-shrink: 0;
}

.notification-message {
  flex: 1;
  font-size: 0.95rem;
}

.notification-slide-enter-active,
.notification-slide-leave-active {
  transition: all 0.3s ease;
}

.notification-slide-enter-from {
  transform: translateX(400px);
  opacity: 0;
}

.notification-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 50%, #F8F9FA 100%);
  padding-bottom: 4rem;
}

/* Dashboard Navbar */
.dashboard-navbar {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(220, 20, 60, 0.1);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(0, 102, 204, 0.1));
  border: 2px solid rgba(220, 20, 60, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--brand-red);
}

.menu-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: var(--brand-red);
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.15), rgba(0, 102, 204, 0.15));
}

.menu-toggle svg {
  transition: transform 0.3s ease;
}

.menu-toggle:hover svg {
  transform: scale(1.1);
}

/* Navigation Drawer */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1100;
  animation: fadeIn 0.3s ease;
}

.navigation-drawer {
  position: fixed;
  top: 0;
  left: -320px;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: 10px 0 40px rgba(0, 0, 0, 0.1);
  z-index: 1200;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.navigation-drawer.open {
  left: 0;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #F1F3F5;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.05), rgba(0, 102, 204, 0.05));
}

.drawer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.drawer-logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.drawer-logo-text {
  background: var(--gradient-red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.drawer-close {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F3F4F6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.drawer-close:hover {
  background: #E5E7EB;
  color: var(--brand-red);
  transform: rotate(90deg);
}

.drawer-menu {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.drawer-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: white;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: var(--text-dark);
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  text-align: left;
}

.drawer-item:hover {
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.08), rgba(0, 102, 204, 0.08));
  border-color: rgba(220, 20, 60, 0.2);
  transform: translateX(5px);
}

.drawer-item.active {
  background: var(--gradient-red-blue);
  color: white;
  border-color: transparent;
}

.drawer-item.active svg {
  stroke: white;
}

.drawer-item svg {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.drawer-item:hover svg {
  transform: scale(1.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-image {
  height: 50px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
}

.logo-text {
  background: var(--gradient-red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.wifi-text {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-menu {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 10px 20px;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(0, 102, 204, 0.1));
  border: 2px solid rgba(220, 20, 60, 0.2);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: var(--text-dark);
  font-family: 'Poppins', sans-serif;
}

.user-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: var(--brand-red);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gradient-red-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
}

.user-name {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  overflow: hidden;
  animation: slideDown 0.3s ease;
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 14px 20px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: var(--text-dark);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(0, 102, 204, 0.1));
}

.dropdown-item svg {
  flex-shrink: 0;
}

.user-info {
  padding: 20px;
  cursor: default;
}

.user-info:hover {
  background: none;
}

.user-avatar-large {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient-red-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.3rem;
  margin-right: 12px;
}

.user-name-large {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.user-email {
  font-size: 0.85rem;
  color: #666;
  font-weight: 400;
}

.dropdown-divider {
  height: 1px;
  background: #E5E7EB;
  margin: 8px 0;
}

.logout-btn {
  color: var(--brand-red);
}

.logout-btn:hover {
  background: rgba(220, 20, 60, 0.1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dashboard Header */
.dashboard-header {
  background: var(--gradient-red-blue);
  padding: 3rem 0 4rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.dashboard-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: float 6s ease-in-out infinite;
}

.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.welcome-greeting {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.user-welcome-avatar {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.avatar-gradient {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  animation: avatarPulse 3s ease-in-out infinite;
}

@keyframes avatarPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 48px rgba(102, 126, 234, 0.6);
  }
}

.avatar-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  animation: avatarShine 3s ease-in-out infinite;
}

@keyframes avatarShine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.avatar-text {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1;
  font-family: 'Montserrat', sans-serif;
}

.greeting-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.greeting-hello {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  letter-spacing: 0.5px;
  font-family: 'Montserrat', sans-serif;
}

.user-name-highlight {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B6B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
  animation: nameShimmer 3s ease-in-out infinite;
  filter: drop-shadow(0 2px 8px rgba(255, 215, 0, 0.3));
}

@keyframes nameShimmer {
  0%, 100% {
    filter: drop-shadow(0 2px 8px rgba(255, 215, 0, 0.3)) brightness(1);
  }
  50% {
    filter: drop-shadow(0 4px 16px rgba(255, 215, 0, 0.5)) brightness(1.2);
  }
}

.greeting-subtext {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-weight: 400;
}

.user-welcome-avatar svg {
  stroke: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.welcome-text h1 {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.user-name-highlight {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

.welcome-subtitle {
  font-size: 1.1rem;
  opacity: 0.95;
}

.quick-actions {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.action-btn {
  background: white;
  border: none;
  border-radius: 24px;
  padding: 2rem 2.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: visible;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  min-width: 160px;
}

.action-btn:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.action-icon-wrapper {
  width: 80px;
  height: 80px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.speed-test-btn .action-icon-wrapper {
  animation: speedPulse 2s ease-in-out infinite;
}

@keyframes speedPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #DC143C;
  opacity: 0;
  animation: pulsate 2s ease-out infinite;
}

.pulse-circle.delay-1 {
  animation-delay: 0.5s;
}

.pulse-circle.delay-2 {
  animation-delay: 1s;
}

@keyframes pulsate {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

.action-icon {
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.speed-test-btn .action-icon {
  stroke: #DC143C;
}

.payment-btn .action-icon {
  stroke: #0066CC;
}

.support-btn .action-icon {
  stroke: #10B981;
}

.speed-test-btn:hover .action-icon {
  stroke: #FF1744;
  filter: drop-shadow(0 4px 8px rgba(220, 20, 60, 0.4));
}

.payment-btn:hover .action-icon {
  stroke: #2196F3;
  filter: drop-shadow(0 4px 8px rgba(0, 102, 204, 0.4));
}

.support-btn:hover .action-icon {
  stroke: #34D399;
  filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.4));
}

.icon-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #10B981, #34D399);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
  z-index: 3;
  letter-spacing: 0.5px;
}

.icon-notification {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #F59E0B, #F97316);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
  z-index: 3;
  animation: notificationPulse 2s ease-in-out infinite;
}

@keyframes notificationPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.action-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
}

.action-sublabel {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.speed-test-btn {
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.05), rgba(255, 23, 68, 0.1));
}

.payment-btn {
  background: linear-gradient(135deg, rgba(0, 102, 204, 0.05), rgba(33, 150, 243, 0.1));
}

.support-btn {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(52, 211, 153, 0.1));
}

.speed-test-btn:hover {
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(255, 23, 68, 0.15));
}

.payment-btn:hover {
  background: linear-gradient(135deg, rgba(0, 102, 204, 0.1), rgba(33, 150, 243, 0.15));
}

.support-btn:hover {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.15));
}

/* Stats Section */
.stats-section {
  margin-top: -2rem;
  position: relative;
  z-index: 2;
  padding: 0 0 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  border-color: var(--brand-red);
}

.stat-image-wrapper {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.stat-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.stat-card:hover .stat-image {
  transform: scale(1.1);
}

.stat-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%);
}

.stat-content {
  padding: 1.5rem;
}

.stat-content h3 {
  font-size: 1.8rem;
  font-weight: 900;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.3rem;
  font-family: 'Montserrat', sans-serif;
}

.stat-content p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.stat-link {
  color: var(--brand-blue);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.stat-link:hover {
  color: var(--brand-red);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.8rem;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-blue);
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* Main Content */
.main-content {
  padding: 0 0 3rem;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.dashboard-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.dashboard-card:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
}

.period-selector {
  padding: 8px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  font-weight: 600;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.3s ease;
}

.period-selector:hover {
  border-color: var(--brand-blue);
}

.chart-card {
  grid-column: span 2;
}

.chart-container {
  height: 300px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  gap: 1rem;
  padding: 1rem 0;
}

.bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.bar {
  width: 100%;
  max-width: 60px;
  background: var(--gradient-blue);
  border-radius: 8px 8px 0 0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.bar:hover {
  background: var(--gradient-red);
  transform: scaleY(1.05);
}

.bar-label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  font-weight: 600;
}

/* Links Card */
.links-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 15px;
  background: #F8F9FA;
  text-decoration: none;
  color: var(--text-dark);
  transition: all 0.3s ease;
}

.link-item:hover {
  background: var(--gradient-red-blue);
  color: white;
  transform: translateX(5px);
}

.link-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.link-gradient-1 {
  background: linear-gradient(135deg, #DC143C 0%, #FF6B6B 100%);
}

.link-gradient-2 {
  background: linear-gradient(135deg, #0066CC 0%, #4A9EFF 100%);
}

.link-gradient-3 {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
}

.link-gradient-4 {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
}

.link-icon-wrapper svg {
  transition: transform 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.link-item:hover .link-icon-wrapper svg {
  transform: scale(1.2) rotate(5deg);
}

.link-item:hover .link-icon-wrapper {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
}

.link-item h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.link-item p {
  font-size: 0.85rem;
  opacity: 0.8;
}

.arrow {
  margin-left: auto;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Activity Card */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 15px;
  background: white;
  border: 2px solid #F1F3F5;
  transition: all 0.3s ease;
  overflow: hidden;
}

.activity-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--brand-red);
}

.activity-icon-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.activity-payment {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
}

.activity-login {
  background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
}

.activity-logout {
  background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
}

.activity-profile {
  background: linear-gradient(135deg, #EC4899 0%, #F472B6 100%);
}

.activity-upgrade {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
}

.activity-data {
  background: linear-gradient(135deg, #EF4444 0%, #F87171 100%);
}

.activity-support {
  background: linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%);
}

.activity-security {
  background: linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%);
}

.activity-email {
  background: linear-gradient(135deg, #6366F1 0%, #818CF8 100%);
}

.activity-default {
  background: linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%);
}

.activity-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: #9CA3AF;
}

.activity-empty svg {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.activity-empty p {
  font-size: 1rem;
  font-weight: 500;
}

.activity-icon-wrapper svg {
  transition: transform 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.activity-item:hover .activity-icon-wrapper svg {
  transform: scale(1.15) rotate(5deg);
}

.activity-item:hover {
  background: #E5E7EB;
  transform: translateX(5px);
}

.activity-content h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.activity-content p {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.3rem;
}

.activity-time {
  font-size: 0.75rem;
  color: #999;
  font-weight: 600;
}

.view-all {
  color: var(--brand-blue);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
}

/* Status Card */
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  background: #10b981;
  color: white;
  font-size: 0.85rem;
  font-weight: 700;
}

.status-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
}

/* Entertainment Card Styles */
.entertainment-card {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  overflow: hidden;
  padding: 2.5rem !important;
  grid-column: 1 / -1;
  max-width: none !important;
  width: 100% !important;
}

.entertainment-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.entertainment-card .card-header h2 {
  color: white;
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.entertainment-badge {
  padding: 8px 16px;
  background: linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.entertainment-intro {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: center;
}

.entertainment-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.entertainment-item {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  height: 340px;
  cursor: pointer;
  overflow: hidden;
  border: 3px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.entertainment-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.entertainment-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.9) 100%);
  z-index: 1;
  transition: background 0.4s ease;
}

.entertainment-item:hover .entertainment-overlay {
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.85) 100%);
}

.entertainment-item:hover .entertainment-bg {
  transform: scale(1.1);
}

.entertainment-item.movies {
  border-color: rgba(231, 76, 60, 0.5);
}

.entertainment-item.movies:hover {
  border-color: #E74C3C;
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(231, 76, 60, 0.5);
}

.entertainment-item.sports {
  border-color: rgba(46, 204, 113, 0.5);
}

.entertainment-item.sports:hover {
  border-color: #2ECC71;
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(46, 204, 113, 0.5);
}

.entertainment-item.football {
  border-color: rgba(52, 152, 219, 0.5);
}

.entertainment-item.football:hover {
  border-color: #3498DB;
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(52, 152, 219, 0.5);
}

.entertainment-item.news {
  border-color: rgba(241, 196, 15, 0.5);
}

.entertainment-item.news:hover {
  border-color: #F1C40F;
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(241, 196, 15, 0.5);
}

.entertainment-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  text-align: center;
  z-index: 2;
  transform: translateY(0);
  transition: transform 0.4s ease;
}

.entertainment-item:hover .entertainment-info {
  transform: translateY(-8px);
}

.entertainment-info h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
}

.entertainment-info p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
}

.entertainment-badge-small {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.entertainment-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 1rem;
}

.speed-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.speed-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-radius: 50%;
  color: white;
  animation: pulse 2s ease-in-out infinite;
}

.speed-icon svg {
  width: 28px;
  height: 28px;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px 10px rgba(255, 215, 0, 0);
  }
}

.speed-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.speed-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.speed-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
}

.test-connection-btn {
  padding: 1.125rem 2.25rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.test-connection-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.test-connection-btn:hover::before {
  left: 100%;
}

.test-connection-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.test-connection-btn svg {
  transition: transform 0.3s ease;
}

.test-connection-btn:hover svg {
  transform: translateX(3px);
}

  @media (max-width: 768px) {
  .entertainment-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .entertainment-card {
    padding: 1.5rem !important;
  }
  
  .entertainment-item {
    height: 280px;
  }
  
  .entertainment-info {
    padding: 1.5rem;
  }
  
  .entertainment-info h3 {
    font-size: 1.25rem;
  }
  
  .entertainment-info p {
    font-size: 0.9rem;
  }
  
  .entertainment-footer {
    flex-direction: column;
    gap: 1rem;
  }
  
  .test-connection-btn {
    width: 100%;
    justify-content: center;
  }
  
  .entertainment-card .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}/* Speed Gauge */
.speed-gauge-container {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.speed-gauge {
  position: relative;
  width: 240px;
  height: 140px;
}

.gauge-svg {
  width: 100%;
  height: 100%;
}

.gauge-needle {
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.gauge-center {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.gauge-value {
  font-size: 2.5rem;
  font-weight: 900;
  color: #1F2937;
  line-height: 1;
  font-family: 'Montserrat', sans-serif;
}

.gauge-unit {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6B7280;
  margin-top: 0.25rem;
}

.gauge-label {
  font-size: 0.75rem;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
}

/* Connection Details Grid */
.connection-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.detail-card {
  background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.detail-card:hover {
  border-color: #E5E7EB;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.detail-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-card.download .detail-icon {
  background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
  color: white;
}

.detail-card.upload .detail-icon {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
  color: white;
}

.detail-card.latency .detail-icon {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
  color: white;
}

.detail-card.status .detail-icon {
  background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
  color: white;
}

.detail-content {
  flex: 1;
}

.detail-label {
  font-size: 0.8rem;
  color: #6B7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1F2937;
  font-family: 'Montserrat', sans-serif;
}

.detail-value span {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6B7280;
  margin-left: 0.25rem;
}

.detail-value.status-excellent {
  background: linear-gradient(135deg, #10B981, #34D399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Speed Test Button */
.speed-test-action-btn {
  padding: 1.25rem 2rem;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #DC143C 0%, #FF1744 100%);
  color: white;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-shadow: 0 8px 24px rgba(220, 20, 60, 0.3);
  position: relative;
  overflow: hidden;
}

.speed-test-action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.speed-test-action-btn:hover::before {
  left: 100%;
}

.speed-test-action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(220, 20, 60, 0.4);
}

.btn-icon-wrapper {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.speed-test-action-btn:hover .btn-icon-wrapper {
  transform: rotate(180deg) scale(1.1);
  background: rgba(255, 255, 255, 0.3);
}

.btn-arrow {
  font-size: 1.5rem;
  font-weight: 700;
  transition: transform 0.3s ease;
}

.speed-test-action-btn:hover .btn-arrow {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .connection-details {
    grid-template-columns: 1fr;
  }
  
  .speed-gauge {
    width: 200px;
    height: 120px;
  }
  
  .gauge-value {
    font-size: 2rem;
  }
}

/* Promotions */
.promotions-section {
  padding: 3rem 0;
}

.promo-banner {
  background: var(--gradient-red-blue);
  border-radius: 25px;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.promo-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.promo-content,
.promo-cta {
  position: relative;
  z-index: 1;
}

.promo-badge {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.promo-content h2 {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
}

.promo-content p {
  opacity: 0.9;
}

.promo-btn {
  padding: 15px 35px;
  background: white;
  color: var(--brand-red);
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.promo-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 968px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-card {
    grid-column: span 1;
  }
  
  .welcome-section {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .welcome-text h1 {
    font-size: 2rem;
  }
  
  .promo-banner {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .promo-content h2 {
    font-size: 1.5rem;
  }
}

/* Speed Test Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;
  overflow-y: auto;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 25px;
  max-width: 900px;
  width: 100%;
  position: relative;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
  animation: slideInUp 0.4s ease;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: #F3F4F6;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal-close:hover {
  background: #E5E7EB;
  transform: rotate(90deg);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Profile Modal */
.profile-modal {
  padding: 0;
  max-width: 600px;
}

.profile-content {
  padding: 2.5rem;
}

.profile-content h2 {
  font-size: 2rem;
  font-weight: 800;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
}

.profile-subtitle {
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--text-dark);
  font-size: 0.95rem;
}

.form-input {
  padding: 12px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.form-input:focus {
  outline: none;
  border-color: var(--brand-blue);
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.form-input:disabled {
  background: #F3F4F6;
  cursor: not-allowed;
  color: #9CA3AF;
  border-color: #D1D5DB;
}

.form-hint {
  font-size: 0.85rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.plan-display {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.05), rgba(0, 102, 204, 0.05));
  border-radius: 10px;
  border: 2px solid rgba(220, 20, 60, 0.1);
}

.plan-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 16px;
  background: var(--gradient-red-blue);
  color: white;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  width: fit-content;
}

.plan-note {
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-save {
  background: var(--gradient-blue);
  color: white;
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 102, 204, 0.3);
}

.btn-cancel {
  background: #E5E7EB;
  color: var(--text-dark);
}

.btn-cancel:hover {
  background: #D1D5DB;
}

/* Payment Modal */
.payment-modal {
  max-width: 600px;
  padding: 0;
}

.payment-content {
  padding: 0;
}

.payment-header {
  padding: 2.5rem;
  background: var(--gradient-red-blue);
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.payment-header svg {
  stroke: white;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.payment-header h2 {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.payment-subtitle {
  margin: 0;
  opacity: 0.95;
  font-size: 1rem;
}

.payment-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  background: #F8F9FA;
  border-bottom: 2px solid #E5E7EB;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.info-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.balance-card .info-icon {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
}

.balance-card .info-icon svg {
  stroke: white;
}

.plan-card .info-icon {
  background: linear-gradient(135deg, #6366F1 0%, #818CF8 100%);
}

.plan-card .info-icon svg {
  stroke: white;
}

.info-label {
  display: block;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.info-value {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.payment-form {
  padding: 2rem;
}

.payment-form h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
}

.amount-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.amount-btn {
  padding: 1rem;
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.amount-btn:hover {
  border-color: var(--brand-blue);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 102, 204, 0.2);
}

.amount-btn.active {
  background: var(--gradient-red-blue);
  border-color: transparent;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(220, 20, 60, 0.3);
}

.custom-amount {
  margin-bottom: 1.5rem;
}

.custom-amount label {
  display: block;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.amount-input {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.amount-input:focus {
  outline: none;
  border-color: var(--brand-blue);
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.mpesa-info {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(52, 211, 153, 0.08));
  border-radius: 12px;
  border-left: 4px solid #10B981;
  margin-bottom: 1.5rem;
}

.mpesa-info svg {
  flex-shrink: 0;
  color: #10B981;
  margin-top: 2px;
}

.mpesa-info p {
  margin: 0;
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

.mpesa-info strong {
  color: var(--brand-red);
  font-weight: 600;
}

.pay-btn {
  width: 100%;
  padding: 16px 24px;
  background: var(--gradient-red-blue);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.pay-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(220, 20, 60, 0.3);
}

.pay-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* WiFi Settings Section */
.wifi-settings-section {
  padding: 3rem 0;
  min-height: calc(100vh - 100px);
}

/* Support Section Styles */
.support-section {
  padding: 3rem 0;
  min-height: calc(100vh - 100px);
}

.support-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.support-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.support-card:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  transform: translateY(-5px);
}

.support-card .card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.support-card .card-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.support-card .card-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 16px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  text-decoration: none;
}

.contact-method:hover {
  border-color: #667eea;
  transform: translateX(5px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}

.method-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.method-icon.phone {
  background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
}

.method-icon.email {
  background: linear-gradient(135deg, #EF4444 0%, #F87171 100%);
}

.method-icon.whatsapp {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
}

.method-info {
  flex: 1;
}

.method-info h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.method-info p {
  font-size: 1rem;
  color: #6B7280;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.method-label {
  font-size: 0.875rem;
  color: #9CA3AF;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.faq-item {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
}

.faq-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.faq-item h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.75rem;
}

.faq-item p {
  font-size: 0.95rem;
  color: #6B7280;
  line-height: 1.6;
}

.actions-card {
  grid-column: 1 / -1;
}

.actions-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 16px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: var(--text-dark);
}

.action-item:hover {
  border-color: #667eea;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}

.action-item svg {
  color: #667eea;
}

.action-item span {
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

@media (max-width: 768px) {
  .support-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-list {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .profile-grid,
  .billing-grid,
  .plan-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-actions-footer {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .profile-info-grid {
    grid-template-columns: 1fr;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-container {
    padding: 0 1rem;
  }
  
  .profile-content-wrapper {
    padding: 1.5rem;
  }
  
  .profile-actions-row {
    justify-content: center;
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .profile-info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Profile Section Styles */
.profile-section,
.billing-section,
.current-plan-section {
  padding: 2rem 0;
  min-height: calc(100vh - 100px);
}

.profile-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.profile-content-wrapper {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.profile-section-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #F3F4F6;
}

.profile-form {
  margin: 2rem 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group label svg {
  color: #667eea;
}

.form-input {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  background: #F9FAFB;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input[readonly] {
  cursor: default;
  background: #F3F4F6;
}

.form-input.plan-input {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  border-color: #667eea;
  font-weight: 700;
}

.profile-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.profile-info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  min-width: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.profile-info-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
}

.info-icon {
  width: 44px;
  height: 44px;
  min-width: 44px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  flex-shrink: 0;
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  overflow: hidden;
}

.info-label {
  font-size: 0.8rem;
  color: #6B7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 1.05rem;
  color: #000000 !important;
  font-weight: 700;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.plan-badge {
  display: inline-flex;
  padding: 0.4rem 0.9rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  align-self: flex-start;
  white-space: nowrap;
}

.profile-actions-row {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 2px solid #F3F4F6;
}

.profile-grid,
.billing-grid,
.plan-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.profile-card,
.billing-card,
.plan-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

/* Full width card for profile */
.profile-card.full-width {
  grid-column: 1 / -1;
}

.profile-actions-footer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.profile-card:hover,
.billing-card:hover,
.plan-card:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  transform: translateY(-5px);
}

.info-details,
.status-details {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 1.5rem 0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
  border-left: 4px solid #667eea;
  gap: 1rem;
}

.info-label {
  font-size: 0.85rem;
  color: #6B7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.info-value {
  font-size: 1.1rem;
  color: var(--text-dark);
  font-weight: 700;
  text-align: right;
  word-break: break-word;
}

.edit-profile-btn,
.pay-now-btn,
.upgrade-plan-btn,
.manage-billing-btn {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.edit-profile-btn:hover,
.pay-now-btn:hover,
.upgrade-plan-btn:hover,
.manage-billing-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.status-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.status-item:hover {
  border-color: #667eea;
  transform: translateX(5px);
}

.status-item.active {
  border-color: #10B981;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, #ffffff 100%);
}

.status-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.status-icon.balance {
  background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
}

.status-icon.plan {
  background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
}

.status-icon.billing {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
}

.status-item h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.status-item p {
  font-size: 0.9rem;
  color: #6B7280;
}

.profile-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.profile-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: var(--text-dark);
}

.profile-action-btn:hover {
  border-color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}

.profile-action-btn svg {
  color: #667eea;
}

.profile-action-btn span {
  font-size: 0.95rem;
  font-weight: 600;
}

/* Billing Section Styles */
.summary-details {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 1.5rem 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
}

.summary-label {
  font-size: 0.95rem;
  color: #6B7280;
  font-weight: 600;
}

.summary-value {
  font-size: 1.125rem;
  color: var(--text-dark);
  font-weight: 700;
}

.summary-value.balance {
  color: #10B981;
  font-size: 1.5rem;
}

.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.transaction-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.transaction-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.transaction-icon.success {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
}

.transaction-icon.pending {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
}

.transaction-info {
  flex: 1;
}

.transaction-info h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.transaction-info p {
  font-size: 0.875rem;
  color: #6B7280;
}

.transaction-amount {
  font-size: 1.125rem;
  font-weight: 700;
}

.transaction-amount.success {
  color: #10B981;
}

.transaction-amount.debit {
  color: #EF4444;
}

.view-all-btn {
  width: 100%;
  padding: 0.875rem;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  background: #667eea;
  color: white;
}

/* Current Plan Section Styles */
.plan-details {
  padding: 1.5rem 0;
}

.plan-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.plan-name h3 {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
}

.plan-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.plan-badge.active {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.1) 100%);
  color: #10B981;
  border: 1px solid #10B981;
}

.plan-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 10px;
}

.feature-item svg {
  color: #10B981;
}

.feature-item span {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-dark);
}

.plan-pricing {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  text-align: center;
  margin: 1.5rem 0;
}

.price-label {
  font-size: 0.95rem;
  opacity: 0.9;
}

.price-value {
  font-size: 1.75rem;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
}

.usage-chart {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.usage-circle {
  position: relative;
  width: 200px;
  height: 200px;
}

.usage-circle svg {
  transform: rotate(-90deg);
}

.usage-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.usage-text h3 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.25rem;
  font-family: 'Montserrat', sans-serif;
}

.usage-text p {
  font-size: 1rem;
  color: #6B7280;
}

.usage-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.usage-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 10px;
}

.stat-label {
  font-size: 0.95rem;
  color: #6B7280;
  font-weight: 600;
}

.stat-value {
  font-size: 1.125rem;
  color: var(--text-dark);
  font-weight: 700;
}

.billing-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.billing-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 10px;
}

.billing-label {
  font-size: 0.95rem;
  color: #6B7280;
  font-weight: 600;
}

.billing-value {
  font-size: 1rem;
  color: var(--text-dark);
  font-weight: 700;
}

.billing-value.balance {
  color: #10B981;
}

.billing-value.status {
  color: #10B981;
  padding: 0.25rem 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 12px;
  font-size: 0.875rem;
}

.settings-header {
  margin-bottom: 3rem;
  text-align: center;
}

.settings-header h1 {
  font-size: 2.5rem;
  font-weight: 900;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
}

.settings-subtitle {
  font-size: 1.1rem;
  color: #666;
}

/* Router Interface Card */
.router-interface-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 2rem;
  border: 2px solid rgba(220, 20, 60, 0.1);
}

.interface-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.05), rgba(0, 102, 204, 0.05));
  border-bottom: 2px solid #F1F3F5;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.interface-header .card-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: var(--gradient-red-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.interface-header .card-icon svg {
  stroke: white;
}

.interface-header h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
  margin: 0;
}

.interface-subtitle {
  font-size: 0.9rem;
  color: #666;
  margin: 0.25rem 0 0 0;
}

/* Router Credentials Bar */
.router-credentials {
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  background: #F8F9FA;
  border-bottom: 2px solid #E5E7EB;
  flex-wrap: wrap;
}

.credential-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.credential-label {
  font-weight: 600;
  color: #666;
  font-size: 0.85rem;
}

.credential-value-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.credential-value {
  padding: 6px 12px;
  background: white;
  border: 2px solid rgba(220, 20, 60, 0.2);
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--brand-red);
}

.mini-copy-btn {
  width: 28px;
  height: 28px;
  border: 2px solid #E5E7EB;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
  padding: 0;
}

.mini-copy-btn:hover {
  background: var(--brand-blue);
  border-color: var(--brand-blue);
  color: white;
  transform: scale(1.1);
}

/* Router Access Content */
.router-access-content {
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
}

.access-message {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.access-message svg {
  color: var(--brand-blue);
  opacity: 0.8;
}

.access-message h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
}

.access-message p {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.open-router-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 18px 32px;
  background: var(--gradient-red-blue);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.open-router-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(220, 20, 60, 0.3);
}

.access-steps {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
}

.step-mini {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 2px solid #E5E7EB;
  text-align: left;
  transition: all 0.3s ease;
}

.step-mini:hover {
  border-color: var(--brand-blue);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.step-mini-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gradient-red-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.step-mini span {
  font-size: 0.9rem;
  color: var(--text-dark);
  font-weight: 500;
}

.security-note {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.08), rgba(0, 102, 204, 0.08));
  border-radius: 12px;
  border-left: 4px solid var(--brand-blue);
  margin-top: 2rem;
  text-align: left;
  width: 100%;
}

.security-note svg {
  flex-shrink: 0;
  color: var(--brand-blue);
  margin-top: 2px;
}

.security-note p {
  color: #666;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

.security-note strong {
  color: var(--brand-red);
  font-weight: 600;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.settings-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.settings-card:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  border-color: rgba(220, 20, 60, 0.2);
  transform: translateY(-5px);
}

.settings-card .card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #F1F3F5;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: var(--gradient-red-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon svg {
  stroke: white;
}

.settings-card .card-header h2 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
}

/* Router Access Card */
.router-access-card {
  grid-column: span 2;
}

.router-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
}

.info-value-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-value {
  padding: 12px 20px;
  background: #F8F9FA;
  border-radius: 10px;
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  flex: 1;
}

.info-value.highlight {
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(0, 102, 204, 0.1));
  border: 2px solid rgba(220, 20, 60, 0.2);
}

.copy-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #E5E7EB;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.copy-btn:hover {
  background: var(--brand-blue);
  border-color: var(--brand-blue);
  color: white;
  transform: scale(1.1);
}

.access-router-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 16px 24px;
  background: var(--gradient-red-blue);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.05rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.access-router-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(220, 20, 60, 0.3);
}

/* Instructions Card */
.instructions-card {
  grid-column: span 2;
}

.instructions-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.instruction-step {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gradient-red-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.3rem;
}

.step-content p {
  color: #666;
  line-height: 1.6;
}

.step-content strong {
  color: var(--brand-red);
  font-weight: 600;
}

/* Routers Card */
.routers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.router-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #F8F9FA;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.router-brand:hover {
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.08), rgba(0, 102, 204, 0.08));
  border-color: rgba(220, 20, 60, 0.2);
  transform: translateY(-3px);
}

.brand-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: var(--gradient-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
}

.router-brand span {
  font-weight: 600;
  color: var(--text-dark);
  font-size: 0.9rem;
}

.router-note {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.05), rgba(0, 102, 204, 0.05));
  border-radius: 10px;
  border-left: 4px solid var(--brand-blue);
}

.router-note svg {
  flex-shrink: 0;
  color: var(--brand-blue);
  margin-top: 2px;
}

.router-note p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.router-note strong {
  color: var(--brand-red);
  font-weight: 600;
}

/* Tips Card */
.tips-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tip-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  background: #F8F9FA;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.tip-item:hover {
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.05), rgba(0, 102, 204, 0.05));
  transform: translateX(5px);
}

.tip-item svg {
  flex-shrink: 0;
  color: #10b981;
  stroke-width: 2.5;
}

.tip-item p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Help Card */
.help-card {
  grid-column: span 2;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.05), rgba(0, 102, 204, 0.05));
}

.help-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.help-content svg {
  color: var(--brand-blue);
}

.help-content h2 {
  font-size: 1.8rem;
  font-weight: 800;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
}

.help-content p {
  color: #666;
  max-width: 600px;
  line-height: 1.6;
}

.help-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 14px 28px;
  background: var(--gradient-red-blue);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.help-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(220, 20, 60, 0.3);
}

/* Responsive Settings */
@media (max-width: 968px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .router-access-card,
  .instructions-card,
  .help-card {
    grid-column: span 1;
  }
  
  .routers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .settings-header h1 {
    font-size: 2rem;
  }
  
  .router-credentials {
    flex-direction: column;
    gap: 1rem;
  }
  
  .interface-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .access-steps {
    grid-template-columns: 1fr;
  }
  
  .access-message h3 {
    font-size: 1.2rem;
  }
  
  .open-router-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Enhanced Mobile Responsiveness */
@media (max-width: 768px) {
  /* Dashboard Navbar */
  .dashboard-navbar {
    padding: 0.75rem 0;
  }
  
  .logo-text {
    font-size: 1.1rem;
  }
  
  .user-name {
    display: none;
  }
  
  .user-avatar {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
  
  /* Welcome Section */
  .welcome-section {
    padding: 1.5rem 0;
  }
  
  .user-name-highlight {
    font-size: 1.75rem;
  }
  
  .greeting-hello {
    font-size: 0.9rem;
  }
  
  .greeting-subtext {
    font-size: 0.8rem;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .action-btn {
    padding: 1.5rem;
  }
  
  /* Stats Grid */
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-card {
    min-height: 200px;
  }
  
  /* Content Grid */
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  /* Activity List */
  .activity-item {
    padding: 1rem;
  }
  
  .activity-icon-wrapper {
    width: 40px;
    height: 40px;
  }
  
  .activity-icon-wrapper svg {
    width: 20px;
    height: 20px;
  }
  
  .activity-content h3 {
    font-size: 0.95rem;
  }
  
  .activity-content p {
    font-size: 0.8rem;
  }
  
  /* Modal Improvements */
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-content {
    max-height: 85vh;
    border-radius: 16px;
  }
  
  .payment-modal,
  .profile-modal {
    max-width: 100%;
  }
  
  .payment-info {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .amount-options {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* User Menu Dropdown */
  .user-dropdown {
    right: 0;
    left: auto;
    min-width: 250px;
  }
  
  /* Chart */
  .chart-bars {
    overflow-x: auto;
    padding-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  /* Extra small devices */
  .container {
    padding: 0 1rem;
  }
  
  .user-name-highlight {
    font-size: 1.5rem;
  }
  
  .quick-actions {
    gap: 0.75rem;
  }
  
  .action-btn {
    padding: 1.25rem;
  }
  
  .action-label {
    font-size: 0.95rem;
  }
  
  .action-sublabel {
    font-size: 0.75rem;
  }
  
  .stat-card h3 {
    font-size: 1.25rem;
  }
  
  .amount-options {
    grid-template-columns: 1fr;
  }
  
  .amount-btn {
    width: 100%;
  }
  
  .dashboard-card {
    padding: 1.25rem;
  }
  
  .card-header h2 {
    font-size: 1.1rem;
  }
}

</style>
