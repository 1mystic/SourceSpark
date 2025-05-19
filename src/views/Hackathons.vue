<template>
  <div class="hackathons-page">
    <section class="page-header-section">
      <div class="container">
        <h1>Explore Hackathons</h1>
        <p class="page-subtitle">Find and join exciting hackathons to showcase your skills and collaborate with other developers.</p>
      </div>
    </section>

    <section class="filters-and-search-section">
      <div class="container">
        <div class="filters-wrapper">
          <div class="search-bar">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search by name, theme, or keywords..."
              @input="handleSearch"
            >
            <button class="btn btn-primary" @click="handleSearch">
              <i class="fas fa-search"></i> Search
            </button>
          </div>
          <div class="filter-bar">
            <div class="filter-group">
              <label for="filter-status">Status:</label>
              <div class="custom-select-wrapper">
                <select id="filter-status" v-model="filters.status" @change="applyFilters">
                  <option value="">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div class="filter-group">
              <label for="filter-theme">Theme:</label>
              <select id="filter-theme" v-model="filters.theme" @change="applyFilters">
                <option value="">Any Theme</option>
                <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="filter-duration">Duration:</label>
              <select id="filter-duration" v-model="filters.duration" @change="applyFilters">
                <option value="">Any Duration</option>
                <option value="24h">24 Hours</option>
                <option value="48h">48 Hours</option>
                <option value="1w">1 Week</option>
                <option value="2w">2 Weeks</option>
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
          <p>Showing <span>{{ filteredHackathons.length }}</span> results (Page <span>{{ currentPage }}</span> of <span>{{ totalPages }}</span>)</p>
          <div class="sort-by">
            <label for="sort-options">Sort by:</label>
            <select id="sort-options" v-model="sortBy" @change="applySorting">
              <option value="startDate">Start Date</option>
              <option value="participants">Most Participants</option>
              <option value="prize">Prize Pool</option>
            </select>
          </div>
        </div>

        <div class="results-grid">
          <div v-for="hackathon in paginatedHackathons" :key="hackathon.id" class="item-card hackathon-card">
            <div class="card-image-placeholder">
              <img v-if="hackathon.coverImage" :src="hackathon.coverImage" :alt="hackathon.title">
              <DefaultCardImage v-else type="hackathon" />
            </div>
            <div class="card-content">
              <div class="hackathon-card-header">
                <h3 class="card-title">{{ hackathon.title }}</h3>
                <span class="status-badge" :class="hackathon.status">{{ hackathon.status }}</span>
              </div>
              <p class="card-description">{{ hackathon.description }}</p>
              <div class="card-tags">
                <span v-for="tag in hackathon.tags" :key="tag">{{ tag }}</span>
              </div>
              <div class="card-meta">
                <span><i class="far fa-calendar-alt"></i> {{ hackathon.dateInfo }}</span>
                <span><i class="fas fa-users"></i> {{ hackathon.participants }}+ Participants</span>
              </div>
            </div>
            <div class="card-actions">
              <router-link :to="'/hackathons/' + hackathon.id" class="btn btn-primary">Learn More & Register</router-link>
            </div>
          </div>
        </div>

        <div v-if="filteredHackathons.length === 0" class="no-results-message">
          <i class="fas fa-search-minus"></i>
          <h2>No Results Found</h2>
          <p>Try adjusting your search or filters. We couldn't find any hackathons matching your criteria.</p>
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
import DefaultCardImage from '../components/DefaultCardImage.vue';

export default {
  name: 'Hackathons',
  components: {
    DefaultCardImage
  },
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 9,
      sortBy: 'startDate',
      filters: {
        status: '',
        theme: '',
        duration: ''
      },
      themes: ['AI/ML', 'Web3', 'Sustainability', 'Healthcare', 'Education', 'FinTech'],
      hackathons: [
        {
          id: 1,
          title: 'Global Code Challenge',
          description: 'Join developers worldwide to build innovative solutions for sustainability.',
          status: 'active',
          tags: ['AI', 'Environment', 'Open Source'],
          dateInfo: 'Ends: Oct 31, 2024',
          participants: 200
        },
        // Add more sample hackathons here
      ]
    };
  },
  computed: {
    filteredHackathons() {
      return this.hackathons.filter(hackathon => {
        const matchesSearch = hackathon.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            hackathon.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesStatus = !this.filters.status || hackathon.status === this.filters.status;
        const matchesTheme = !this.filters.theme || hackathon.tags.includes(this.filters.theme);
        const matchesDuration = !this.filters.duration || hackathon.duration === this.filters.duration;
        
        return matchesSearch && matchesStatus && matchesTheme && matchesDuration;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredHackathons.length / this.itemsPerPage);
    },
    paginatedHackathons() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredHackathons.slice(start, end);
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
        status: '',
        theme: '',
        duration: ''
      };
      this.searchQuery = '';
      this.currentPage = 1;
    },
    applySorting() {
      // Implement sorting logic based on this.sortBy
    },
    changePage(page) {
      this.currentPage = page;
    }
  }
};
</script>

<style scoped>
.hackathons-page {
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

.hackathon-card {
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  overflow: hidden;
}

.hackathon-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-image-placeholder {
  height: 160px;
  background-color: var(--light-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-4xl);
  color: var(--primary-dark);
}

.card-content {
  padding: var(--spacing-lg);
}

.hackathon-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-sm);
}

.card-title {
  font-size: var(--font-size-xl);
  margin: 0;
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

.status-badge.completed {
  background-color: var(--text-muted);
  color: var(--white);
}

.card-description {
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.card-tags span {
  background-color: var(--light-bg);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  color: var(--text-dark);
}

.card-meta {
  display: flex;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.card-actions {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
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

  .hackathon-card-header {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .status-badge {
    align-self: flex-start;
  }
}
</style>
