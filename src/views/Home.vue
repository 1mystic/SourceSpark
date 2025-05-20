<template>
  <div>
    <main>
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="animate-on-scroll" style="animation-delay: 0.1s;">Ignite Your Open Source Journey</h1>
            <p class="subtitle animate-on-scroll" style="animation-delay: 0.3s;">SourceSpark connects young developers with projects, mentors, and hackathons to kickstart their contributions and overcome initial friction.</p>
            <router-link to="/projects" class="btn btn-primary btn-large animate-on-scroll" style="animation-delay: 0.5s;">Find Your First Project <i class="fas fa-arrow-right"></i></router-link>
          </div>
          <div class="hero-image animate-on-scroll" style="animation-delay: 0.4s;">
            <img src="https://via.placeholder.com/450x350/EEEEEE/204343?text=Platform+UI+Snippet" alt="SourceSpark platform preview">
          </div>
        </div>
      </section>

      <section id="problem-solution" class="problem-solution animate-on-scroll">
        <div class="container">
          <h2>Feeling Lost in the Open Source Universe?</h2>
          <p>Starting in open source can be daunting. Finding the right project, understanding contribution guidelines, and connecting with collaborators are common hurdles. SourceSpark is designed to smooth out these bumps and get you contributing with confidence.</p>
        </div>
      </section>

      <section class="stats-section animate-on-scroll">
        <div class="container">
          <div class="stats-grid">
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

      <section id="features" class="features">
        <div class="container">
          <h2 class="animate-on-scroll">Everything You Need to Get Started</h2>
          <div class="features-grid">
            <div class="feature-card animate-on-scroll" style="animation-delay: 0.1s;">
              <div class="card-icon"><i class="fas fa-search"></i></div>
              <h3>Easy Project Discovery</h3>
              <p>Find projects matching your skills and interests. Get smart recommendations to find your perfect fit.</p>
            </div>
            <div class="feature-card animate-on-scroll" style="animation-delay: 0.3s;">
              <div class="card-icon"><i class="fas fa-users-cog"></i></div>
              <h3>Seamless Collaboration</h3>
              <p>Connect with collaborators, join discussions, and manage tasks with integrated project boards.</p>
            </div>
            <div class="feature-card animate-on-scroll" style="animation-delay: 0.5s;">
              <div class="card-icon"><i class="fas fa-trophy"></i></div>
              <h3>Curated Resources</h3>
              <p>Discover active hackathons and connect with experienced mentors, all in one place.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" class="how-it-works">
        <div class="container">
          <h2 class="animate-on-scroll">Get Contributing in 3 Simple Steps</h2>
          <div class="steps-container">
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
      
      <section id="resources" class="community-resources animate-on-scroll">
        <div class="container">
          <div class="community-grid">
            <div class="hackathons-column animate-on-scroll" style="animation-delay: 0.1s;">
              <h2>Active Hackathons</h2>
              <p class="section-subtitle">Find and participate in hackathons to kickstart your open source contributions and build exciting projects.</p>
              <div class="resource-list">
                <div class="hackathon-card" v-for="(hackathon, index) in sampleHackathons" :key="'hackathon-' + index">
                  <div class="hackathon-header">
                    <h3>{{ hackathon.title }}</h3>
                    <span class="status-badge" :class="hackathon.status">{{ hackathon.status }}</span>
                  </div>
                  <p class="hackathon-description">{{ hackathon.description }}</p>
                  <div class="hackathon-footer">
                    <span class="time-info"><i class="far fa-clock"></i> {{ hackathon.timeInfo }}</span>
                    <router-link :to="hackathon.link" class="learn-more-link">Learn More <i class="fas fa-arrow-right"></i></router-link>
                  </div>
                </div>
              </div>
              <router-link to="/hackathons" class="btn btn-outline view-all-link">View All Hackathons</router-link>
            </div>
            
            <div class="mentors-column animate-on-scroll" style="animation-delay: 0.3s;">
              <h2>Connect with Mentors</h2>
              <p class="section-subtitle">Learn from experienced developers who can guide you through your open source journey and accelerate your growth.</p>
              <div class="mentor-card-grid">
                <div class="mentor-card" v-for="(mentor, index) in sampleMentors" :key="'mentor-' + index">
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
              <router-link to="/mentors" class="btn btn-outline view-all-link">Find More Mentors</router-link>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-final animate-on-scroll">
        <div class="container">
          <h2>Ready to Make Your Mark?</h2>
          <p>Join a growing community of aspiring open source developers. Your journey starts here, with SourceSpark.</p>
          <router-link to="/signup" class="btn btn-primary btn-large">Sign Up for Free Today</router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Sample data for hackathons and mentors - replace with actual data fetching
const sampleHackathons = ref([
  {
    title: 'Global Code Fest 2025',
    status: 'active',
    description: 'Build innovative solutions for climate change using open source technologies.',
    timeInfo: 'Ends in 14 days',
    link: '#' // Replace with actual link or router-link object
  },
  {
    title: 'Open Source Day',
    status: 'upcoming',
    description: 'A 24-hour coding event focused on contributing to popular open source projects.',
    timeInfo: 'Starts in 3 days',
    link: '#' // Replace with actual link or router-link object
  }
]);

const sampleMentors = ref([
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
]);

// Scroll animation logic
let observer = null;
onMounted(() => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length > 0 && "IntersectionObserver" in window) {
    observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observerInstance.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  } else if (animatedElements.length > 0) { // Fallback if observer not supported or no elements
    animatedElements.forEach(el => {
      el.classList.add('animated');
    });
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
/* You can add component-specific styles here if needed. */
/* The global styles are in main.css */

/* Ensure hero image placeholder is visible */
.hero-image img {
  max-width: 450px; /* Or your preferred size */
  /* Add any other styles for the image if needed */
}

</style>
