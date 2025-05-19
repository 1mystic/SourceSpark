<template>
  <div id="app" :class="{ 'dark-mode': darkMode }">
    <header class="navbar">
      <div class="container">
        <div class="header-content">
          <router-link to="/" class="logo">
            <svg width="36" height="36" viewBox="0 0 100 100" class="logo-icon">
              <rect width="100" height="100" rx="20" fill="#204343"/>
              <path d="M75 40 C75 25 60 20 50 20 C35 20 25 30 25 40 L25 48 L55 48 C65 48 75 45 75 40Z" fill="#68E1B9"/>
              <path d="M25 60 C25 75 40 80 50 80 C65 80 75 70 75 60 L75 52 L45 52 C35 52 25 55 25 60Z" fill="#FFFFFF"/>
            </svg>
            <span>SourceSpark</span>
          </router-link>
          <nav class="main-nav">
            <router-link to="/projects" class="nav-link">Projects</router-link>
            <router-link to="/community" class="nav-link">Community</router-link>
            <router-link to="/mentorship" class="nav-link">Mentorship</router-link>
            <router-link to="/hackathons" class="nav-link">Hackathons</router-link>
            <router-link to="/about" class="nav-link">About</router-link>
          </nav>
          <div class="nav-actions">
            <button @click="toggleDarkMode" class="theme-toggle">
              <span v-if="darkMode" class="light-icon">☀️</span>
              <span v-else class="dark-icon">🌙</span>
            </button>
            <template v-if="isLoggedIn">
              <div class="user-menu" @click="toggleUserMenu">
                <img :src="userAvatar" alt="User Avatar" class="user-avatar">
                <div class="user-menu-dropdown" v-if="showUserMenu">
                  <router-link to="/profile/username" class="dropdown-item">My Profile</router-link>
                  <router-link to="/profile/username/portfolio" class="dropdown-item">Portfolio</router-link>
                  <router-link to="/projects/create" class="dropdown-item">Create Project</router-link>
                  <div class="dropdown-divider"/>
                  <button @click="handleLogout" class="dropdown-item logout-btn">Log Out</button>
                </div>
              </div>
            </template>
            <template v-else>
              <router-link to="/login" class="btn btn-outline">Log In</router-link>
              <router-link to="/signup" class="btn btn-primary">Sign Up</router-link>
            </template>
          </div>
          <button class="mobile-nav-toggle" @click="toggleMobileMenu" aria-label="Toggle navigation">
            <span class="menu-icon"></span>
          </button>
        </div>
      </div>
      <!-- Mobile menu -->
      <div class="mobile-menu" v-if="showMobileMenu">
        <router-link to="/projects" class="mobile-nav-link">Projects</router-link>
        <router-link to="/community" class="mobile-nav-link">Community</router-link>
        <router-link to="/mentorship" class="mobile-nav-link">Mentorship</router-link>
        <router-link to="/hackathons" class="mobile-nav-link">Hackathons</router-link>
        <router-link to="/about" class="mobile-nav-link">About</router-link>
        <template v-if="isLoggedIn">
          <div class="mobile-divider"/>
          <router-link to="/profile/username" class="mobile-nav-link">My Profile</router-link>
          <router-link to="/profile/username/portfolio" class="mobile-nav-link">Portfolio</router-link>
          <router-link to="/projects/create" class="mobile-nav-link">Create Project</router-link>
          <button @click="handleLogout" class="mobile-nav-link logout-btn">Log Out</button>
        </template>
        <template v-else>
          <div class="mobile-divider"/>
          <router-link to="/login" class="mobile-nav-link">Log In</router-link>
          <router-link to="/signup" class="mobile-nav-link">Sign Up</router-link>
        </template>
      </div>
    </header>

    <main>
      <router-view/>
    </main>

    <AiAssistPane v-if="showAiPane" :isLoggedIn="isLoggedIn" />
    <button class="ai-fab" @click="toggleAiPane">
      <span v-if="showAiPane">✖</span>
      <span v-else>🤖</span>
    </button>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-statement">
            <p>Building great projects together.</p>
            <div class="social-links">
              <a href="https://t.me/profilaunch" class="social-link" title="Telegram">
                <span class="social-icon telegram"/>
              </a>
              <a href="https://twitter.com/profilaunch" class="social-link" title="Twitter">
                <span class="social-icon twitter"/>
              </a>
              <a href="https://discord.gg/profilaunch" class="social-link" title="Discord">
                <span class="social-icon discord"/>
              </a>
              <a href="https://github.com/profilaunch" class="social-link" title="Github">
                <span class="social-icon github"/>
              </a>
              <a href="https://www.linkedin.com/company/profilaunch/" class="social-link" title="LinkedIn">
                <span class="social-icon linkedin"/>
              </a>
            </div>
          </div>
          <div class="footer-links">
            <div class="footer-section">
              <h3>Features</h3>
              <ul>
                <li><router-link to="/projects">Browse Projects</router-link></li>
                <li><router-link to="/projects/create">Create Project</router-link></li>
                <li><router-link to="/community">Community</router-link></li>
                <li><router-link to="/mentorship">Mentorship</router-link></li>
              </ul>
            </div>
            <div class="footer-section">
              <h3>About</h3>
              <ul>
                <li><router-link to="/about">About Us</router-link></li>
                <li><router-link to="/blog">Blog</router-link></li>
                <li><a href="mailto:info@profilaunch.com">Contact</a></li>
                <li><router-link to="/faq">FAQ</router-link></li>
              </ul>
            </div>
            <div class="footer-section">
              <h3>Legal</h3>
              <ul>
                <li><router-link to="/terms">Terms of Service</router-link></li>
                <li><router-link to="/privacy">Privacy Policy</router-link></li>
                <li><router-link to="/code-of-conduct">Code of Conduct</router-link></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-logo">
            <router-link to="/">
              <svg width="36" height="36" viewBox="0 0 100 100" class="logo-icon">
                <rect width="100" height="100" rx="20" fill="#204343"/>
                <path d="M75 40 C75 25 60 20 50 20 C35 20 25 30 25 40 L25 48 L55 48 C65 48 75 45 75 40Z" fill="#68E1B9"/>
                <path d="M25 60 C25 75 40 80 50 80 C65 80 75 70 75 60 L75 52 L45 52 C35 52 25 55 25 60Z" fill="#FFFFFF"/>
              </svg>
              <span>SourceSpark</span>
            </router-link>
          </div>
          <div class="copyright">
            © 2024 SourceSpark. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import AiAssistPane from './components/AiAssistPane.vue';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'App',
  components: { AiAssistPane },
  data() {
    return {
      darkMode: false,
      isLoggedIn: false,
      userAvatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      showUserMenu: false,
      showMobileMenu: false,
      showAiPane: true
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    async handleLogout() {
      // Placeholder for logout logic
      await signOut(auth);
      this.isLoggedIn = false;
      this.showUserMenu = false;
      this.showMobileMenu = false;
      this.$router.push('/login');
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    toggleAiPane() {
      this.showAiPane = !this.showAiPane;
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user;
      this.userAvatar = user?.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
      // Optionally, fetch more user info from Firestore here
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Space+Mono&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Nunito Sans', sans-serif;
  color: #333;
  background-color: #f9f8f7;
  line-height: 1.5;
}

.dark-mode,
body.dark-mode {
  background-color: #181a1b !important;
  color: #f9f8f7 !important;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Navbar Styles */
.navbar {
  background-color: var(--white);
  box-shadow: var(--card-shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--primary-dark);
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-icon {
  margin-right: 0.5rem;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-dark);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.5rem;
}

.user-menu {
  position: relative;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-menu-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 0.5rem 0;
  min-width: 200px;
  margin-top: 0.5rem;
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-dark);
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: var(--light-bg);
}

.dropdown-divider {
  height: 1px;
  background-color: var(--light-bg);
  margin: 0.5rem 0;
}

.mobile-nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--text-dark);
  position: relative;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--text-dark);
  transition: transform 0.3s ease;
}

.menu-icon::before {
  top: -6px;
}

.menu-icon::after {
  bottom: -6px;
}

.mobile-menu {
  display: none;
  background-color: var(--white);
  padding: 1rem;
  box-shadow: var(--card-shadow);
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-dark);
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.mobile-nav-link:hover {
  background-color: var(--light-bg);
}

.mobile-divider {
  height: 1px;
  background-color: var(--light-bg);
  margin: 0.5rem 0;
}

/* Footer Styles */
.footer {
  background-color: var(--light-bg);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

.footer-statement {
  max-width: 300px;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-link {
  color: var(--text-dark);
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: var(--primary-dark);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-section h3 {
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.75rem;
}

.footer-section ul li a {
  color: var(--text-dark);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: var(--primary-dark);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--light-bg);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.copyright {
  color: var(--text-dark);
  font-size: 0.875rem;
}

/* AI Assistant Styles */
.ai-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-dark);
  color: var(--white);
  border: none;
  cursor: pointer;
  box-shadow: var(--card-shadow);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.ai-fab:hover {
  transform: scale(1.1);
}

/* Dark Mode Styles */
.dark-mode .navbar {
  background-color: #23272a;
}

.dark-mode .nav-link {
  color: var(--text-light);
}

.dark-mode .nav-link:hover,
.dark-mode .nav-link.router-link-active {
  color: var(--accent-mint);
}

.dark-mode .user-menu-dropdown {
  background-color: #23272a;
}

.dark-mode .dropdown-item {
  color: var(--text-light);
}

.dark-mode .dropdown-item:hover {
  background-color: #2c3136;
}

.dark-mode .mobile-menu {
  background-color: #23272a;
}

.dark-mode .mobile-nav-link {
  color: var(--text-light);
}

.dark-mode .mobile-nav-link:hover {
  background-color: #2c3136;
}

.dark-mode .footer {
  background-color: #23272a;
}

.dark-mode .footer-section ul li a {
  color: var(--text-light);
}

.dark-mode .footer-section ul li a:hover {
  color: var(--accent-mint);
}

.dark-mode .copyright {
  color: var(--text-light);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .main-nav {
    display: none;
  }

  .mobile-nav-toggle {
    display: block;
  }

  .mobile-menu {
    display: block;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
