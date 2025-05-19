<template>
  <div class="mentors-page">
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
          <p>Showing <span>{{ filteredMentors.length }}</span> results (Page <span>{{ currentPage }}</span> of <span>{{ totalPages }}</span>)</p>
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
            <div class="mentor-header">
              <div class="mentor-avatar">
                <img v-if="mentor.avatar" :src="mentor.avatar" :alt="mentor.name">
                <DefaultAvatar v-else :size="80" />
              </div>
              <div class="mentor-info">
                <h3 class="mentor-name">{{ mentor.name }}</h3>
                <div class="mentor-rating">
                  <i class="fas fa-star" v-for="n in 5" :key="n" :class="{ 'active': n <= mentor.rating }"></i>
                  <span>({{ mentor.reviews }} reviews)</span>
                </div>
              </div>
            </div>
            <div class="mentor-content">
              <p class="mentor-bio">{{ mentor.bio }}</p>
              <div class="mentor-expertise">
                <span v-for="skill in mentor.expertise" :key="skill" class="expertise-tag">{{ skill }}</span>
              </div>
              <div class="mentor-stats">
                <div class="stat">
                  <i class="fas fa-users"></i>
                  <span>{{ mentor.mentees }} Mentees</span>
                </div>
                <div class="stat">
                  <i class="fas fa-clock"></i>
                  <span>{{ mentor.availability }}</span>
                </div>
                <div class="stat">
                  <i class="fas fa-briefcase"></i>
                  <span>{{ mentor.experience }} Years</span>
                </div>
              </div>
            </div>
            <div class="mentor-actions">
              <button class="btn btn-primary" @click="requestMentorship(mentor)">
                Request Mentorship
              </button>
              <button class="btn btn-outline" @click="viewProfile(mentor)">
                View Profile
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredMentors.length === 0" class="no-results-message">
          <i class="fas fa-search-minus"></i>
          <h2>No Results Found</h2>
          <p>Try adjusting your search or filters. We couldn't find any mentors matching your criteria.</p>
        </div>

        <div class="pagination-section" v-if="totalPages > 1">
          <button 
            class="btn btn-outline pagination-btn" 
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            <i class="fas fa-chevron-left"></i> Previous
          </button>
          <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
          <button 
            class="btn btn-outline pagination-btn"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Next <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DefaultAvatar from '../components/DefaultAvatar.vue';

export default {
  name: 'Mentors',
  components: {
    DefaultAvatar
  },
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 9,
      sortBy: 'rating',
      filters: {
        expertise: '',
        availability: '',
        experience: ''
      },
      expertiseAreas: [
        'Frontend Development',
        'Backend Development',
        'Mobile Development',
        'DevOps',
        'AI/ML',
        'Blockchain',
        'Cloud Computing',
        'Security'
      ],
      mentors: [
        {
          id: 1,
          name: 'Sarah Johnson',
          avatar: '/avatars/mentor1.jpg',
          rating: 4.8,
          reviews: 42,
          bio: 'Senior Software Engineer with 10+ years of experience in full-stack development. Passionate about mentoring and helping developers grow.',
          expertise: ['Frontend Development', 'React', 'Node.js'],
          mentees: 15,
          availability: 'Part Time',
          experience: 10
        },
        // Add more sample mentors here
      ]
    };
  },
  computed: {
    filteredMentors() {
      return this.mentors.filter(mentor => {
        const matchesSearch = mentor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            mentor.bio.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            mentor.expertise.some(skill => skill.toLowerCase().includes(this.searchQuery.toLowerCase()));
        const matchesExpertise = !this.filters.expertise || mentor.expertise.includes(this.filters.expertise);
        const matchesAvailability = !this.filters.availability || mentor.availability.toLowerCase() === this.filters.availability;
        const matchesExperience = !this.filters.experience || mentor.experience >= parseInt(this.filters.experience);
        
        return matchesSearch && matchesExpertise && matchesAvailability && matchesExperience;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredMentors.length / this.itemsPerPage);
    },
    paginatedMentors() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredMentors.slice(start, end);
    }
  },
  methods: {
    handleSearch() {
      this.currentPage = 1;
      this.applyFilters();
    },
    applyFilters() {
      this.currentPage = 1;
    },
    clearFilters() {
      this.filters = {
        expertise: '',
        availability: '',
        experience: ''
      };
      this.searchQuery = '';
      this.currentPage = 1;
    },
    applySorting() {
      // Implement sorting logic based on this.sortBy
    },
    changePage(page) {
      this.currentPage = page;
    },
    requestMentorship(mentor) {
      // Implement mentorship request logic
      console.log('Requesting mentorship from:', mentor.name);
    },
    viewProfile(mentor) {
      // Implement view profile logic
      console.log('Viewing profile of:', mentor.name);
    }
  }
};
</script>

<style scoped>
.mentors-page {
  padding: var(--spacing-2xl) 0;
}

.page-header-section {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.page-subtitle {
  color: var(--text-muted);
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: var(--spacing-md) auto 0;
}

.filters-and-search-section {
  background-color: var(--light-bg);
  padding: var(--spacing-xl) 0;
  margin-bottom: var(--spacing-2xl);
}

.filters-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.search-bar {
  display: flex;
  gap: var(--spacing-md);
}

.search-bar input {
  flex: 1;
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.filter-group label {
  font-weight: 500;
  color: var(--text-dark);
}

.filter-group select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  min-width: 200px;
}

.results-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.sort-by {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.mentor-card {
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  overflow: hidden;
}

.mentor-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.mentor-header {
  padding: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.mentor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}

.mentor-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mentor-info {
  flex: 1;
}

.mentor-name {
  font-size: var(--font-size-xl);
  margin: 0 0 var(--spacing-xs);
}

.mentor-rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.mentor-rating i {
  color: var(--text-muted);
}

.mentor-rating i.active {
  color: var(--warning);
}

.mentor-rating span {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.mentor-content {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
}

.mentor-bio {
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.mentor-expertise {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.expertise-tag {
  background-color: var(--light-bg);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  color: var(--text-dark);
}

.mentor-stats {
  display: flex;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.mentor-actions {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: var(--spacing-md);
}

.no-results-message {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-muted);
}

.no-results-message i {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-md);
}

.pagination-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-2xl);
}

.page-info {
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group select {
    width: 100%;
  }

  .results-summary {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }

  .mentor-header {
    flex-direction: column;
    text-align: center;
  }

  .mentor-stats {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: center;
  }

  .mentor-actions {
    flex-direction: column;
  }
}
</style> 