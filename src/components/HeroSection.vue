<template>
  <div class="hero-wrapper">
    <!-- Main hero section -->
    <div class="container hero-container">
      <div class="hero-flex">
        <!-- Hero content -->
        <div class="hero-content">
          <h1 class="hero-title">
            Redefining economic opportunities for 
            <span class="highlight-text">builders</span> with 
            <span class="highlight-text">hackathons</span>
          </h1>
          
          <p class="hero-subtitle">
            Connect with a global community of innovators and unlock new pathways 
            to success through our curated hackathon platform
          </p>
          
          <div class="hero-buttons">
            <button class="btn btn-primary get-started-btn">
              Get Started
              <span class="icon-arrow">→</span>
            </button>
            
            <button class="btn btn-outline learn-more-btn">
              Learn More
            </button>
          </div>
          
          <!-- Partner logos -->
          <div class="partners-section">
            <p class="partners-label">Trusted by innovative teams</p>
            <div class="partners-logos">
              <div class="partner-logo" v-for="n in 5" :key="n">
                <span class="partner-icon">●</span>
                <span>Partner {{ n }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Hero image -->
        <div class="hero-visual">
          <div class="dashboard-preview">
            <div class="dashboard-inner">
              <div class="dashboard-header">
                <div class="header-dots">
                  <span class="dot dot-1"></span>
                  <span class="dot dot-2"></span>
                  <span class="dot dot-3"></span>
                </div>
              </div>
              <div class="dashboard-content">
                <div class="chart-section">
                  <div class="chart-circle">
                    <div class="chart-circle-inner">
                      <span class="chart-percentage">65%</span>
                    </div>
                  </div>
                  <div class="chart-bars">
                    <div class="bar bar-1"></div>
                    <div class="bar bar-2"></div>
                    <div class="bar bar-3"></div>
                    <div class="bar bar-4"></div>
                  </div>
                </div>
                <div class="stats-section">
                  <div class="stat-item stat-item-1"></div>
                  <div class="stat-item stat-item-2"></div>
                  <div class="stat-item stat-item-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Stats section -->
    <div class="container stats-container">
      <div class="stats-row">
        <div class="stat-card">
          <h2 class="stat-number">8,500+</h2>
          <p class="stat-label">Active Builders</p>
        </div>
        <div class="stat-card">
          <h2 class="stat-number">250</h2>
          <p class="stat-label">Hackathons Completed</p>
        </div>
        <div class="stat-card">
          <h2 class="stat-number">4.9</h2>
          <p class="stat-label">Average Rating</p>
        </div>
        <div class="stat-card">
          <h2 class="stat-number">$2.5M</h2>
          <p class="stat-label">Prizes Awarded</p>
        </div>
      </div>
    </div>
    
    <!-- Animated shapes -->
    <div class="animated-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
      <div class="shape shape-5"></div>
      <div class="shape shape-6"></div>
    </div>
    
    <!-- Wave shape divider -->
    <div class="wave-shape"></div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped>
/* Main Hero Section */
.hero-wrapper {
  position: relative;
  background: linear-gradient(135deg, var(--primary-color) 0%, #2b362e 100%);
  overflow: hidden;
  color: white;
  min-height: 100vh;
}

.hero-container {
  position: relative;
  z-index: 5;
  padding-top: 100px;
  padding-bottom: 60px;
}

.hero-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.5px;
  margin-bottom: 24px;
}

.highlight-text {
  color: var(--accent-color);
  position: relative;
  display: inline-block;
}

.highlight-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: rgba(70, 214, 174, 0.3);
  border-radius: 4px;
  z-index: -1;
}

.hero-subtitle {
  font-size: 18px;
  max-width: 540px;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 32px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.get-started-btn {
  background-color: var(--accent-color);
  border: none;
  font-size: 16px;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  color: var(--text-color);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.get-started-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(70, 214, 174, 0.4);
  background-color: #3ac29c;
}

.icon-arrow {
  margin-left: 8px;
  font-size: 18px;
}

.learn-more-btn {
  font-size: 16px;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.learn-more-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

/* Partners Section */
.partners-section {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 24px;
}

.partners-label {
  font-size: 14px;
  opacity: 0.7;
  margin-bottom: 16px;
}

.partners-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}

.partner-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.7;
  font-weight: 500;
  font-size: 14px;
  transition: opacity 0.3s ease;
}

.partner-logo:hover {
  opacity: 1;
}

.partner-icon {
  color: white;
  font-size: 16px;
}

/* Dashboard Visual */
.hero-visual {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.dashboard-preview {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 4px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  max-width: 550px;
  width: 100%;
  transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
  transition: transform 0.5s ease;
}

.dashboard-preview:hover {
  transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
}

.dashboard-inner {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
}

.dashboard-header {
  background: rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  display: flex;
  align-items: center;
}

.header-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot-1 {
  background-color: #ff6b6b;
}

.dot-2 {
  background-color: var(--secondary-color);
}

.dot-3 {
  background-color: var(--accent-color);
}

.dashboard-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Chart Elements */
.chart-section {
  display: flex;
  gap: 24px;
}

.chart-circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: conic-gradient(
    var(--accent-color) 0% 65%,
    rgba(255, 255, 255, 0.2) 65% 100%
  );
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-circle-inner {
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-percentage {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-color);
}

.chart-bars {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.bar {
  flex: 1;
  border-radius: 6px 6px 0 0;
}

.bar-1 {
  height: 65%;
  background: linear-gradient(to top, var(--accent-color), rgba(70, 214, 174, 0.5));
}

.bar-2 {
  height: 85%;
  background: linear-gradient(to top, var(--accent-color), rgba(70, 214, 174, 0.5));
}

.bar-3 {
  height: 45%;
  background: linear-gradient(to top, var(--accent-color), rgba(70, 214, 174, 0.5));
}

.bar-4 {
  height: 70%;
  background: linear-gradient(to top, var(--accent-color), rgba(70, 214, 174, 0.5));
}

.stats-section {
  display: flex;
  gap: 16px;
}

.stat-item {
  flex: 1;
  height: 50px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.stat-item::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 3px;
  left: 0;
  top: 0;
}

.stat-item-1::after {
  background-color: var(--accent-color);
}

.stat-item-2::after {
  background-color: var(--secondary-color);
}

.stat-item-3::after {
  background-color: #ff6b6b;
}

/* Stats Container */
.stats-container {
  position: relative;
  z-index: 5;
  margin-top: 60px;
  padding-bottom: 60px;
}

.stats-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  flex: 1;
  min-width: 200px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.stat-number {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--primary-color) 0%, #4a6bc9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.stat-label {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  opacity: 0.8;
}

/* Animated Shapes */
.animated-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 180px;
  height: 180px;
  background-color: var(--secondary-color);
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  background-color: var(--light-blue);
  top: 20%;
  right: 10%;
  animation-delay: 3s;
}

.shape-3 {
  width: 200px;
  height: 200px;
  background-color: var(--accent-color);
  bottom: 15%;
  left: 15%;
  animation-delay: 6s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  background-color: var(--light-orange);
  bottom: 25%;
  right: 20%;
  animation-delay: 9s;
}

.shape-5 {
  width: 150px;
  height: 150px;
  background-color: var(--pale-blue);
  top: 40%;
  left: 25%;
  animation-delay: 12s;
}

.shape-6 {
  width: 180px;
  height: 180px;
  background-color: var(--pale-yellow);
  bottom: 30%;
  right: 5%;
  animation-delay: 15s;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0) rotate(0);
  }
  25% {
    transform: translateY(-25px) translateX(15px) rotate(5deg);
  }
  50% {
    transform: translateY(15px) translateX(-20px) rotate(-5deg);
  }
  75% {
    transform: translateY(-10px) translateX(25px) rotate(3deg);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0);
  }
}

/* Wave Shape */
.wave-shape {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: var(--bg-color);
  clip-path: polygon(0 60%, 100% 100%, 100% 100%, 0% 100%);
  z-index: 4;
}

/* Responsive Styling */
@media (max-width: 1100px) {
  .hero-title {
    font-size: 42px;
  }
  
  .hero-flex {
    flex-direction: column;
  }
  
  .hero-visual {
    width: 100%;
    justify-content: center;
    margin-top: 40px;
  }
  
  .dashboard-preview {
    transform: none;
    max-width: 100%;
  }
  
  .hero-content {
    text-align: center;
    max-width: 700px;
  }
  
  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .partners-logos {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-container {
    padding-top: 60px;
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .stats-row {
    gap: 16px;
  }
  
  .stat-card {
    min-width: calc(50% - 16px);
    flex: 0 0 calc(50% - 16px);
  }
  
  .stat-number {
    font-size: 32px;
  }
  
  .shape {
    transform: scale(0.7);
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-buttons {
    flex-direction: column;
    gap: 12px;
  }
  
  .learn-more-btn {
    width: 100%;
  }
  
  .get-started-btn {
    width: 100%;
    justify-content: center;
  }
  
  .stat-card {
    min-width: 100%;
    flex: 0 0 100%;
  }
  
  .hero-container {
    padding-top: 40px;
  }
  
  .dashboard-preview {
    max-width: 100%;
  }
}
</style>