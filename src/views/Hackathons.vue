<template>
  <div>
    <main class="explore-page-main">
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
                 <div class="custom-select-wrapper">
                    <select id="filter-theme" v-model="filters.theme" @change="applyFilters">
                    <option value="">Any Theme</option>
                    <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
                    </select>
                </div>
              </div>
              <div class="filter-group">
                <label for="filter-duration">Duration:</label>
                 <div class="custom-select-wrapper">
                    <select id="filter-duration" v-model="filters.duration" @change="applyFilters">
                    <option value="">Any Duration</option>
                    <option value="24h">24 Hours</option>
                    <option value="48h">48 Hours</option>
                    <option value="72h">72 Hours</option>
                    <option value="1w">1 Week</option>
                    <option value="2w">2 Weeks</option>
                    <option value="month+">1 Month+</option>
                    <option value="N/A">N/A</option> 
                    </select>
                </div>
              </div>
              <button class="btn btn-outline clear-filters-btn" @click="clearFilters">Clear Filters</button>
            </div>
          </div>
        </div>
      </section>

      <section class="results-section">
        <div class="container">
          <div v-if="isLoading" class="loading-indicator">
            <p><i class="fas fa-spinner fa-spin"></i> Loading hackathons...</p>
          </div>
          <div v-else-if="fetchError" class="error-message">
            <p><i class="fas fa-exclamation-triangle"></i> {{ fetchError }}</p>
          </div>
          <template v-else>
            <div class="results-summary">
              <p>Showing <span>{{ filteredHackathons.length }}</span> results (Page <span>{{ currentPage }}</span> of <span>{{ totalPages }}</span>)</p>
              <div class="sort-by">
                <label for="sort-options">Sort by:</label>
                <div class="custom-select-wrapper">
                    <select id="sort-options" v-model="sortBy" @change="applySorting">
                        <option value="startDate">Relevance / Date</option>
                        <option value="participants">Most Participants</option>
                        <option value="prize">Prize Pool</option>
                    </select>
                </div>
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
                    <span class="status-badge" :class="String(hackathon.status).toLowerCase()">{{ hackathon.status }}</span>
                  </div>
                  <p class="card-description">{{ hackathon.description }}</p>
                  <div class="card-tags">
                    <span v-for="tag in hackathon.tags" :key="tag">{{ tag }}</span>
                  </div>
                  <div class="card-meta">
                    <span><i class="far fa-calendar-alt"></i> {{ hackathon.dateInfo }}</span>
                    <span><i class="fas fa-users"></i> {{ hackathon.participants }}+ Participants</span>
                  </div>
                   <div class="card-meta" v-if="hackathon.prize && hackathon.prize !== 'Not specified'">
                    <span><i class="fas fa-trophy"></i> {{ hackathon.prize }}</span>
                  </div>
                </div>
                <div class="card-actions">
                  <a :href="hackathon.url" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Learn More & Register</a>
                </div>
              </div>
            </div>

            <div v-if="filteredHackathons.length === 0 && !isLoading" class="no-results-message">
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
          </template>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import DefaultCardImage from '../components/DefaultCardImage.vue'; // Assuming this component exists

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(9); 
const sortBy = ref('startDate'); 
const filters = ref({
  status: '',
  theme: '',
  duration: ''
});

const themes = ref(['AI/ML', 'Web3', 'Sustainability', 'Healthcare', 'Education', 'FinTech', 'Gaming', 'DevTools', 'Blockchain', 'IoT', 'Realtime', 'Web Development', 'Mobile', 'Social Good', 'Open Source', 'Hardware', 'Data', 'Devpost', 'HackerEarth']); // Added source tags

const allHackathons = ref([]);
const isLoading = ref(true); // For loading state
const fetchError = ref(null); // For storing fetch errors

const loadInitialData = async () => {
  isLoading.value = true;
  fetchError.value = null;
  try {
    const response = await fetch('/api/hackathons'); 
    if (!response.ok) {
      let errorMsg = `HTTP error! status: ${response.status}`;
      try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorData.message || errorMsg;
      } catch (e) { /* ignore if response is not json */ }
      throw new Error(errorMsg);
    }
    const scrapedData = await response.json();

    allHackathons.value = scrapedData.map(h => {
        let currentStatus = String(h.status || 'unknown').toLowerCase();
        let currentDateInfo = h.dateInfo || 'N/A';

        const now = new Date();
        const sDate = h.startDate ? new Date(h.startDate) : null;
        const eDate = h.endDate ? new Date(h.endDate) : null;

        if (sDate && sDate > now && currentStatus !== 'completed') { // Don't override if explicitly completed
            currentStatus = 'upcoming';
            if (currentDateInfo === 'N/A') currentDateInfo = `Starts: ${sDate.toLocaleDateString()}`;
        } else if (eDate && eDate < now) {
            currentStatus = 'completed';
            if (currentDateInfo === 'N/A') currentDateInfo = `Ended: ${eDate.toLocaleDateString()}`;
        } else if (currentStatus !== 'completed' && ((sDate && sDate <= now && eDate && eDate >= now) || (eDate && eDate >= now && !sDate && currentStatus !== 'upcoming'))) {
            currentStatus = 'active';
             if (currentDateInfo === 'N/A') currentDateInfo = eDate ? `Ends: ${eDate.toLocaleDateString()}` : 'Ongoing';
        } else if (currentStatus === 'unknown' || currentStatus === 'n/a') {
            // Fallback if status is still unknown
            if (sDate) currentDateInfo = `Date: ${sDate.toLocaleDateString()}`;
        }
        

        let tagsArray = Array.isArray(h.tags) ? h.tags : (h.tags ? [h.tags] : []);
        if (h.source && !tagsArray.includes(h.source)) {
            tagsArray.push(h.source);
        }
         // Ensure common themes are standardized if possible
        tagsArray = tagsArray.map(tag => {
            if (tag.toLowerCase().includes('artificial intelligence') || tag.toLowerCase().includes('machine learning')) return 'AI/ML';
            if (tag.toLowerCase() === 'web 3' || tag.toLowerCase() === 'web3.0') return 'Web3';
            return tag;
        });


        return {
            ...h,
            status: currentStatus,
            dateInfo: currentDateInfo,
            tags: [...new Set(tagsArray)], // Ensure unique tags
            participants: parseInt(String(h.participants).replace(/\D/g, '')) || 0,
            coverImage: h.coverImage || null,
            description: h.description || "No description available.",
            prize: h.prize || "Not specified",
            duration: h.duration || "N/A",
        };
    });
    
    // Optional: Dynamically populate themes from data, merging with existing
    const fetchedThemes = new Set(themes.value); // Start with existing static themes
    allHackathons.value.forEach(h => {
      if(h.tags) h.tags.forEach(tag => fetchedThemes.add(tag));
    });
    themes.value = Array.from(fetchedThemes).sort((a, b) => a.localeCompare(b));


  } catch (error) {
    console.error('Failed to load hackathon data from backend:', error);
    fetchError.value = `Could not load hackathons. ${error.message || 'Please try again later.'}`;
    allHackathons.value = []; 
  } finally {
    isLoading.value = false;
  }
};

const filteredHackathons = computed(() => {
  let tempHackathons = [...allHackathons.value]; 

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    tempHackathons = tempHackathons.filter(h =>
      h.title.toLowerCase().includes(query) ||
      h.description.toLowerCase().includes(query) ||
      (h.tags && h.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }

  if (filters.value.status) {
    tempHackathons = tempHackathons.filter(h => h.status === filters.value.status);
  }
  if (filters.value.theme) {
    tempHackathons = tempHackathons.filter(h => h.tags && h.tags.includes(filters.value.theme));
  }
  if (filters.value.duration) {
     // Ensure h.duration is treated as a string for comparison
    tempHackathons = tempHackathons.filter(h => String(h.duration) === filters.value.duration);
  }
  
  // Sorting logic
  if (sortBy.value === 'startDate') {
    tempHackathons.sort((a, b) => {
      const statusOrder = { upcoming: 1, active: 2, completed: 3, unknown: 4 };
      
      const statusA = a.status || 'unknown';
      const statusB = b.status || 'unknown';
      const startDateA = a.startDate || '9999-12-31';
      const startDateB = b.startDate || '9999-12-31';
      const endDateA = a.endDate || '0000-01-01';
      const endDateB = b.endDate || '0000-01-01';

      if (statusOrder[statusA] !== statusOrder[statusB]) {
        return statusOrder[statusA] - statusOrder[statusB];
      }
      // Within same status
      if (statusA === 'upcoming') return startDateA.localeCompare(startDateB);
      if (statusA === 'active') return endDateA.localeCompare(endDateB);    
      if (statusA === 'completed') return endDateB.localeCompare(endDateA); // Most recent completed first
      return 0;
    });
  } else if (sortBy.value === 'participants') {
    tempHackathons.sort((a, b) => (b.participants || 0) - (a.participants || 0));
  } else if (sortBy.value === 'prize') {
    const getPrizeValue = (prizeString) => {
      if (!prizeString || prizeString === "Not specified" || typeof prizeString !== 'string') return 0;
      const match = prizeString.match(/(\d[\d,.]*)/);
      return match ? parseFloat(match[1].replace(/,/g, '')) : 0;
    };
    tempHackathons.sort((a, b) => getPrizeValue(b.prize) - getPrizeValue(a.prize));
  }

  return tempHackathons;
});

const totalPages = computed(() => {
  if (filteredHackathons.value.length === 0) return 1; // Avoid division by zero
  return Math.ceil(filteredHackathons.value.length / itemsPerPage.value);
});

const paginatedHackathons = computed(() => {
  if (isLoading.value || fetchError.value) return [];
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredHackathons.value.slice(start, end);
});

const handleSearch = () => {
  currentPage.value = 1;
};

const applyFilters = () => {
  currentPage.value = 1;
};

const clearFilters = () => {
  filters.value = { status: '', theme: '', duration: '' };
  searchQuery.value = '';
  sortBy.value = 'startDate';
  currentPage.value = 1;
};

const applySorting = () => {
  currentPage.value = 1;
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: document.querySelector('.results-section')?.offsetTop || 0, behavior: 'smooth' });
  }
};

let observer = null;
onMounted(() => {
  loadInitialData();

  // Animation observer logic (remains the same)
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length > 0 && "IntersectionObserver" in window) {
    observer = new IntersectionObserver((entries, observerInstance) => {
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
    // Fallback for older browsers
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
@import '../assets/styles/explore.css'; /* Ensure this path is correct */

/* Component-specific styles for HackathonsPage.vue (previously Hackathons.vue) */
.hackathons-page { /* If you had a root class for the page */
  /* Base styles if any */
}

.card-image-placeholder {
  background-color: #f0f0f0; 
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px; /* Standardized height for consistency */
  overflow: hidden;
  border-top-left-radius: var(--border-radius, 8px); /* Match card radius */
  border-top-right-radius: var(--border-radius, 8px);
}

.card-image-placeholder i { /* For DefaultCardImage icon */
  font-size: 3rem; 
  color: var(--accent-mint, #68E1B9);
}
.card-image-placeholder img {
  width: 100%;
  height: 100%; 
  object-fit: cover; 
}

.status-badge {
  padding: 0.25em 0.6em;
  border-radius: var(--border-radius-sm, 4px);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
  color: #fff;
  line-height: 1.2; /* Better vertical alignment */
  white-space: nowrap;
}
.status-badge.upcoming { background-color: var(--info-color, #007bff); }
.status-badge.active { background-color: var(--success-color, #28a745); }
.status-badge.completed { background-color: var(--neutral-color-dark, #6c757d); }
.status-badge.unknown { background-color: var(--warning-color, #ffc107); color: #212529; } /* For unknown status */


/* Custom select wrapper styles (if not fully covered by explore.css) */
.custom-select-wrapper {
    position: relative;
    display: inline-block;
    /* margin-right: 1rem; Add some spacing if filter groups are too close */
}
.custom-select-wrapper select {
    padding: 0.5rem 2.2rem 0.5rem 0.75rem; /* Adjusted padding for arrow */
    border: 1px solid var(--border-color, #ccc);
    border-radius: var(--border-radius-sm, 4px);
    background-color: var(--background-color, white);
    color: var(--text-color, #333);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
    min-width: 120px; /* Ensure select has a decent width */
    height: 38px; /* Match button height */
    box-sizing: border-box;
}
.custom-select-wrapper::after { /* Custom arrow for select */
    content: '\f078'; /* Font Awesome down arrow */
    font-family: 'Font Awesome 5 Free', 'FontAwesome'; /* Include fallback for older FontAwesome */
    font-weight: 900; /* Required for solid icons */
    position: absolute;
    top: 50%;
    right: 0.75rem;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--text-muted, #555);
    font-size: 0.8em;
}


.card-meta span i {
  margin-right: 0.5em;
  color: var(--text-muted, #6c757d);
  width: 1.2em; /* Ensure icons take up consistent space */
  text-align: center;
}

.card-tags span {
  background-color: var(--tag-background, #e9ecef);
  color: var(--tag-color, #495057);
  padding: 0.25em 0.5em;
  margin-right: 0.3em;
  margin-bottom: 0.3em;
  border-radius: var(--border-radius-sm, 3px);
  font-size: 0.75rem;
  display: inline-block; /* Ensures margin-bottom works */
}

.loading-indicator, .error-message {
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.2rem;
  color: var(--text-muted, #555);
}
.loading-indicator i, .error-message i {
  margin-right: 0.5rem;
  font-size: 1.5rem;
}
.error-message {
  color: var(--danger-color, #dc3545);
}

.hackathon-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* Align title top, badge top */
    margin-bottom: 0.5rem;
}

.card-title {
    margin-right: 0.5rem; /* Space between title and badge */
    flex-grow: 1; /* Allow title to take available space */
}

/* Ensure pagination buttons also have consistent height with other inputs/buttons */
.pagination-btn {
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.pagination-btn i {
    margin-left: 0.3em; /* For 'Next' icon */
    margin-right: 0.3em; /* For 'Previous' icon */
}
.pagination-btn:disabled {
    cursor: not-allowed;
    opacity: 0.65;
}

</style>