<template>
  <div class="home">
    <section class="hero section">
      <div class="container">
        <div class="hero-content">
          <h1 class="animate-on-scroll" style="animation-delay: 0.1s;">
            Ignite Your Open Source Journey
          </h1>
          <p class="subtitle animate-on-scroll" style="animation-delay: 0.3s;">
            SourceSpark connects young developers with projects, mentors, and hackathons to kickstart their contributions and overcome initial friction.
          </p>
          <div class="hero-actions animate-on-scroll" style="animation-delay: 0.5s;">
            <router-link to="/projects" class="btn btn-primary btn-large">
              Find Your First Project
              <i class="fas fa-arrow-right"></i>
            </router-link>
            <router-link to="/about" class="btn btn-outline btn-large">
              Learn More
            </router-link>
          </div>
        </div>
        <div class="hero-image animate-on-scroll" style="animation-delay: 0.4s;">
          <img src="" alt="SourceSpark platform preview">
        </div>
      </div>
    </section>

    <section id="problem-solution" class="section problem-solution">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="animate-on-scroll">Feeling Lost in the Open Source Universe?</h2>
          <p class="section-subtitle animate-on-scroll">
            Starting in open source can be daunting. Finding the right project, understanding contribution guidelines, and connecting with collaborators are common hurdles. SourceSpark is designed to smooth out these bumps and get you contributing with confidence.
          </p>
        </div>
      </div>
    </section>

    <section class="section stats-section">
      <div class="container">
        <div class="grid grid-cols-4">
          <div class="stat-card animate-on-scroll" style="animation-delay: 0.1s;">
            <div class="stat-number">1,200+</div>
            <p class="stat-label">Active Developers</p>
          </div>
          <div class="stat-card animate-on-scroll" style="animation-delay: 0.3s;">
            <div class="stat-number">500+</div>
            <p class="stat-label">Open Source Projects</p>
          </div>
          <div class="stat-card animate-on-scroll" style="animation-delay: 0.5s;">
            <div class="stat-number">90%</div>
            <p class="stat-label">Faster Project Discovery</p>
          </div>
          <div class="stat-card animate-on-scroll" style="animation-delay: 0.7s;">
            <div class="stat-number">150+</div>
            <p class="stat-label">Mentors Available</p>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="section features">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="animate-on-scroll">Everything You Need to Get Started</h2>
          <p class="section-subtitle animate-on-scroll">
            Our platform provides all the tools and resources you need to begin your open source journey.
          </p>
        </div>
        <div class="grid grid-cols-3">
          <div class="feature-card animate-on-scroll" style="animation-delay: 0.1s;">
            <div class="card-icon">
              <i class="fas fa-search"></i>
            </div>
            <h3>Easy Project Discovery</h3>
            <p>Find projects matching your skills and interests. Get smart recommendations to find your perfect fit.</p>
          </div>
          <div class="feature-card animate-on-scroll" style="animation-delay: 0.3s;">
            <div class="card-icon">
              <i class="fas fa-users-cog"></i>
            </div>
            <h3>Seamless Collaboration</h3>
            <p>Connect with collaborators, join discussions, and manage tasks with integrated project boards.</p>
          </div>
          <div class="feature-card animate-on-scroll" style="animation-delay: 0.5s;">
            <div class="card-icon">
              <i class="fas fa-trophy"></i>
            </div>
            <h3>Curated Resources</h3>
            <p>Discover active hackathons and connect with experienced mentors, all in one place.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="section how-it-works">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="animate-on-scroll">Get Contributing in 3 Simple Steps</h2>
          <p class="section-subtitle animate-on-scroll">
            Start your open source journey with our simple, guided process.
          </p>
        </div>
        <div class="grid grid-cols-3">
          <div class="step-card animate-on-scroll" style="animation-delay: 0.1s;">
            <div class="step-number">1</div>
            <h3>Sign Up & Profile</h3>
            <p>Create your developer profile and showcase your skills and interests.</p>
          </div>
          <div class="step-card animate-on-scroll" style="animation-delay: 0.3s;">
            <div class="step-number">2</div>
            <h3>Discover & Connect</h3>
            <p>Explore tailored project suggestions, find hackathons, or reach out to mentors.</p>
          </div>
          <div class="step-card animate-on-scroll" style="animation-delay: 0.5s;">
            <div class="step-number">3</div>
            <h3>Collaborate & Grow</h3>
            <p>Join projects, make your first contribution, and expand your network.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="resources" class="section community-resources">
      <div class="container">
        <div class="grid grid-cols-2">
          <div class="hackathons-column animate-on-scroll" style="animation-delay: 0.1s;">
            <div class="section-header">
              <h2>Active Hackathons</h2>
              <p class="section-subtitle">Find and participate in hackathons to kickstart your open source contributions.</p>
            </div>
            <div class="resource-list">
              <div v-for="(hackathon, index) in hackathons" :key="index" class="hackathon-card">
                <div class="hackathon-header">
                  <h3>{{ hackathon.title }}</h3>
                  <span class="status-badge" :class="hackathon.status">{{ hackathon.status }}</span>
                </div>
                <p class="hackathon-description">{{ hackathon.description }}</p>
                <div class="hackathon-footer">
                  <span class="time-info">
                    <i class="far fa-clock"></i> {{ hackathon.timeInfo }}
                  </span>
                  <router-link :to="hackathon.link" class="learn-more-link">
                    Learn More <i class="fas fa-arrow-right"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <router-link to="/hackathons" class="btn btn-outline view-all-link">
              View All Hackathons
            </router-link>
          </div>

          <div class="mentors-column animate-on-scroll" style="animation-delay: 0.3s;">
            <div class="section-header">
              <h2>Connect with Mentors</h2>
              <p class="section-subtitle">Learn from experienced developers who can guide you through your open source journey.</p>
            </div>
            <div class="grid grid-cols-2">
              <div v-for="(mentor, index) in mentors" :key="index" class="mentor-card">
                <img :src="mentor.avatar" :alt="mentor.name" class="mentor-avatar">
                <div class="mentor-info">
                  <h4>{{ mentor.name }}</h4>
                  <p class="mentor-title">{{ mentor.title }}</p>
                  <div class="mentor-skills">
                    <span v-for="(skill, skillIndex) in mentor.skills" :key="skillIndex">{{ skill }}</span>
                  </div>
                </div>
              </div>
            </div>
            <router-link to="/mentorship" class="btn btn-outline view-all-link">
              Find More Mentors
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta-final">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="animate-on-scroll">Ready to Make Your Mark?</h2>
          <p class="section-subtitle animate-on-scroll">
            Join a growing community of aspiring open source developers. Your journey starts here, with SourceSpark.
          </p>
          <router-link to="/signup" class="btn btn-primary btn-large animate-on-scroll">
            Sign Up for Free Today
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      hackathons: [
        {
          title: 'Global Code Fest 2025',
          status: 'active',
          description: 'Build innovative solutions for climate change using open source technologies.',
          timeInfo: 'Ends in 14 days',
          link: '/hackathons/global-code-fest'
        },
        {
          title: 'Open Source Day',
          status: 'upcoming',
          description: 'A 24-hour coding event focused on contributing to popular open source projects.',
          timeInfo: 'Starts in 3 days',
          link: '/hackathons/open-source-day'
        }
      ],
      mentors: [
        {
          name: 'Sarah Johnson',
          title: 'Senior Developer @ Mozilla',
          avatar: 'https://via.placeholder.com/60/DDDDDD/888888?text=SJ',
          skills: ['JavaScript', 'WebAssembly', 'Firefox']
        },
        {
          name: 'Michael Chen',
          title: 'Open Source Advocate @ Google',
          avatar: 'https://via.placeholder.com/60/DDDDDD/888888?text=MC',
          skills: ['Python', 'Kubernetes', 'Cloud']
        },
        {
          name: 'Priya Sharma',
          title: 'Tech Lead @ GitHub',
          avatar: 'https://via.placeholder.com/60/DDDDDD/888888?text=PS',
          skills: ['Ruby', 'Rails', 'DevOps']
        }
      ]
    };
  },
  mounted() {
    // Add animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
  }
};
</script>

<style scoped>
.hero {
  background-color: var(--light-bg);
  position: relative;
  overflow: hidden;
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.hero-content {
  max-width: 600px;
}

.hero h1 {
  font-size: var(--font-size-5xl);
  font-weight: 800;
  margin-bottom: var(--spacing-lg);
  color: var(--primary-dark);
  line-height: 1.2;
}

.subtitle {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xl);
  color: var(--text-dark);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
}

.hero-image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
}

.section-header {
  max-width: 800px;
  margin: 0 auto var(--spacing-2xl);
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-muted);
  margin-top: var(--spacing-md);
}

.stats-section {
  background-color: var(--white);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
}

.stat-card {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-number {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: var(--spacing-sm);
}

.stat-label {
  font-size: var(--font-size-lg);
  color: var(--text-muted);
  font-weight: 500;
}

.features {
  background-color: var(--light-bg);
}

.feature-card {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-lg);
  background-color: var(--light-bg);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-2xl);
  color: var(--primary-dark);
}

.how-it-works {
  background-color: var(--white);
}

.step-card {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.step-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.step-number {
  width: 48px;
  height: 48px;
  background-color: var(--primary-dark);
  color: var(--white);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  font-weight: 700;
  font-size: var(--font-size-xl);
}

.community-resources {
  background-color: var(--light-bg);
}

.hackathon-card {
  background-color: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.hackathon-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.hackathon-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.status-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.status-badge.active {
  background-color: var(--success);
  color: var(--white);
}

.status-badge.upcoming {
  background-color: var(--warning);
  color: var(--text-dark);
}

.hackathon-description {
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.hackathon-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time-info {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.learn-more-link {
  color: var(--primary-dark);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.mentor-card {
  background-color: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.mentor-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.mentor-avatar {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-md);
}

.mentor-info h4 {
  margin-bottom: var(--spacing-xs);
}

.mentor-title {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.mentor-skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.mentor-skills span {
  background-color: var(--light-bg);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  color: var(--text-dark);
}

.view-all-link {
  display: inline-block;
  margin-top: var(--spacing-lg);
}

.cta-final {
  background-color: var(--primary-dark);
  color: var(--white);
  text-align: center;
}

.cta-final h2 {
  color: var(--white);
}

.cta-final .section-subtitle {
  color: var(--text-light);
}

@media (max-width: 1024px) {
  .hero .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content {
    margin: 0 auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: var(--font-size-4xl);
  }

  .subtitle {
    font-size: var(--font-size-lg);
  }

  .hero-actions {
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .feature-card,
  .step-card {
    padding: var(--spacing-lg);
  }
}
</style>
