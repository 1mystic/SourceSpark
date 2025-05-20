<template>
  <div>
    <main class="explore-page-main">
      <section class="page-header-section">
        <div class="container">
          <h1>Find a Mentor</h1>
          <p class="page-subtitle">Connect with experienced developers who can guide you through your open source journey.</p>
        </div>
      </section>

      <section class="filters-and-search-section">
        <div class="container">
          <div class="filters-wrapper">
            <div class="search-bar">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Search by name, expertise, or keywords..."
                @input="handleSearch"
              >
              <button class="btn btn-primary" @click="handleSearch">
                <i class="fas fa-search"></i> Search
              </button>
            </div>
            <div class="filter-bar">
              <div class="filter-group">
                <label for="filter-expertise">Expertise:</label>
                <select id="filter-expertise" v-model="filters.expertise" @change="applyFilters">
                  <option value="">All Expertise</option>
                  <option v-for="expertise in expertiseAreas" :key="expertise" :value="expertise">{{ expertise }}</option>
                </select>
              </div>
              <div class="filter-group">
                <label for="filter-availability">Availability:</label>
                <select id="filter-availability" v-model="filters.availability" @change="applyFilters">
                  <option value="">Any Availability</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="weekends">Weekends Only</option>
                </select>
              </div>
              <div class="filter-group">
                <label for="filter-experience">Experience:</label>
                <select id="filter-experience" v-model="filters.experience" @change="applyFilters">
                  <option value="">Any Experience</option>
                  <option value="5+">5+ Years</option>
                  <option value="10+">10+ Years</option>
                  <option value="15+">15+ Years</option>
                </select>
              </div>
              <button class="btn btn-outline clear-filters-btn" @click="clearFilters">Clear Filters</button>
            </div>
          </div>
        </div>
      </section>

      <section class="results-section">
        <div class="container">
          <div class="results-summary">
            <p>Showing <span id="results-count">{{ filteredMentors.length }}</span> results (Page <span id="current-page">{{ currentPage }}</span> of <span id="total-pages">{{ totalPages }}</span>)</p>
            <div class="sort-by">
              <label for="sort-options">Sort by:</label>
              <select id="sort-options" v-model="sortBy" @change="applySorting">
                <option value="rating">Highest Rating</option>
                <option value="experience">Most Experience</option>
                <option value="mentees">Most Mentees</option>
              </select>
            </div>
          </div>

          <div class="results-grid">
            <div v-for="mentor in paginatedMentors" :key="mentor.id" class="item-card mentor-card">
              <img :src="mentor.avatar || 'https://via.placeholder.com/80/DDDDDD/888888?text=M'" :alt="mentor.name" class="mentor-avatar-card">
              <div class="card-content">
                <h3 class="card-title">{{ mentor.name }}</h3>
                <p class="mentor-expertise">{{ mentor.title || 'Expert Developer' }}</p>
                <p class="card-description">{{ mentor.bio }}</p>
                <div class="card-tags">
                  <span v-for="skill in mentor.expertise" :key="skill">{{ skill }}</span>
                  <span>Mentorship</span>
                </div>
              </div>
              <div class="card-actions">
                <router-link :to="'/mentors/' + mentor.id" class="btn btn-primary">View Profile</router-link>
                <button @click="connectWithMentor(mentor)" class="btn btn-outline">Connect</button>
              </div>
            </div>
          </div>

          <div v-if="filteredMentors.length === 0" class="no-results-message" style="display: block;">
            <i class="fas fa-search-minus"></i>
            <h2>No Mentors Found</h2>
            <p>Try adjusting your search or filters. We couldn't find any mentors matching your criteria.</p>
          </div>

          <div class="pagination-section" v-if="totalPages > 1">
            <button class="btn btn-outline pagination-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
              <i class="fas fa-chevron-left"></i> Previous
            </button>
            <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
            <button class="btn btn-outline pagination-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
              Next <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
// import DefaultAvatar from '../components/DefaultAvatar.vue'; // Path from original, adjust if needed

// Original data and computed properties from Mentors.vue
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(9); // Adjust as needed
const sortBy = ref('rating');
const filters = ref({
  expertise: '',
  availability: '',
  experience: '' // e.g., '5+', '10+'
});

// Example expertise areas - replace or populate from API
const expertiseAreas = ref([
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Mobile Development (iOS/Android)',
  'DevOps & Cloud Infrastructure',
  'AI/Machine Learning',
  'Data Science & Analytics',
  'Cybersecurity',
  'Game Development',
  'UI/UX Design',
  'Product Management'
]);

// Sample mentors data - replace with actual data fetching logic
const allMentors = ref([
  {
    id: '1',
    name: 'Jane Doe',
    title: 'Senior Software Engineer @ TechCorp',
    bio: 'Expert in Python, Django, and building scalable web applications. Happy to guide beginners through their first contributions.',
    expertise: ['Python', 'Django', 'Web Development'],
    avatar: 'https://via.placeholder.com/80/DDDDDD/888888?text=JD',
    rating: 4.8, // Example rating
    experience: '10+', // Example experience
    availability: 'part-time'
  },
  {
    id: '2',
    name: 'John Smith',
    title: 'Lead DevOps Engineer @ CloudInc',
    bio: 'Specializing in Kubernetes, AWS, and CI/CD pipelines. Available for evening sessions.',
    expertise: ['DevOps', 'Kubernetes', 'AWS'],
    avatar: 'https://via.placeholder.com/80/CCCCCC/888888?text=JS',
    rating: 4.5,
    experience: '5+',
    availability: 'weekends'
  },
  // Add more sample mentors
]);

const filteredMentors = computed(() => {
  let tempMentors = allMentors.value;

  if (searchQuery.value) {
    tempMentors = tempMentors.filter(m =>
      m.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (m.title && m.title.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      m.bio.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      m.expertise.some(skill => skill.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }

  if (filters.value.expertise) {
    tempMentors = tempMentors.filter(m => m.expertise.includes(filters.value.expertise));
  }
  if (filters.value.availability) {
    tempMentors = tempMentors.filter(m => m.availability === filters.value.availability);
  }
  if (filters.value.experience) {
    // Simplified experience filter, assumes mentor.experience is like '5+', '10+'
    // You might need a more robust way to compare experience levels
    tempMentors = tempMentors.filter(m => m.experience === filters.value.experience || 
                                       (parseInt(m.experience) >= parseInt(filters.value.experience)));
  }

  // Sorting logic (example)
  if (sortBy.value === 'rating') {
    tempMentors.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy.value === 'experience') {
    // This sort is tricky with string experience like '5+'. Needs careful parsing or numeric data.
    // tempMentors.sort((a, b) => parseInt(b.experience) - parseInt(a.experience)); 
  }

  return tempMentors;
});

const totalPages = computed(() => {
  return Math.ceil(filteredMentors.value.length / itemsPerPage.value);
});

const paginatedMentors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredMentors.value.slice(start, end);
});

// Methods
const handleSearch = () => {
  currentPage.value = 1;
};

const applyFilters = () => {
  currentPage.value = 1;
};

const clearFilters = () => {
  filters.value = { expertise: '', availability: '', experience: '' };
  searchQuery.value = '';
  sortBy.value = 'rating'; // Reset sort
  currentPage.value = 1;
};

const applySorting = () => {
  currentPage.value = 1;
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const connectWithMentor = (mentor) => {
  // Placeholder for actual connect logic (e.g., open chat, send request)
  alert(`Connecting with ${mentor.name}...`);
  // This could navigate to a messaging page or open a modal
  // router.push(`/messages/new?mentorId=${mentor.id}`);
};

// Load initial data (example)
const loadMentors = async () => {
  // In a real app, fetch from API
  console.log('Mentors loaded/set.');
};

let observer = null; // Define observer variable
onMounted(() => {
  loadMentors();
  // Animation observer
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length > 0 && "IntersectionObserver" in window) {
    observer = new IntersectionObserver((entries, observerInstance) => { // Assign to observer
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observerInstance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  } else if (animatedElements.length > 0) {
    animatedElements.forEach(el => {
      el.classList.add('animated');
    });
  }
});

onBeforeUnmount(() => { // Add onBeforeUnmount
  if (observer) {
    observer.disconnect();
  }
});

</script>

<style scoped>
@import '@/assets/styles/explore.css';

/* Component-specific styles for Mentors.vue */
.mentors-page {
  /* Base styles if any */
}

/* Specific mentor card adjustments if needed to perfectly match explore.html example */
/* The .mentor-avatar-card class from explore.css should handle the avatar */

</style> 