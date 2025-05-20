<template>
  <div>
    <main class="explore-page-main">
      <section class="page-header-section">
        <div class="container">
          <h1>Explore Open Source Projects</h1>
          <p class="page-subtitle">Discover projects that match your skills and interests. Find your next contribution!</p>
        </div>
      </section>

      <section class="filters-and-search-section">
        <div class="container">
          <div class="filters-wrapper">
            <div class="search-bar">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Search by keyword, tech stack, name..."
                @input="handleSearch"
              >
              <button class="btn btn-primary" @click="handleSearch">
                <i class="fas fa-search"></i> Search
              </button>
            </div>
            <div class="filter-bar">
              <div class="filter-group">
                <label for="filter-skill">Skill Level:</label>
                <div class="custom-select-wrapper">
                  <select id="filter-skill" v-model="filters.skillLevel" @change="applyFilters">
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div class="filter-group">
                <label for="filter-language">Language:</label>
                <select id="filter-language" v-model="filters.language" @change="applyFilters">
                  <option value="">Any Language</option>
                  <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
                </select>
              </div>
              <div class="filter-group">
                <label for="filter-tags">Tags:</label>
                <select id="filter-tags" v-model="filters.tag" @change="applyFilters">
                  <option value="">All Tags</option>
                  <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
                </select>
              </div>
              <div class="filter-actions">
                <button class="btn btn-outline clear-filters-btn" @click="clearFilters">
                  <i class="fas fa-times"></i> Clear Filters
                </button>
                <button 
                  v-if="isAuthenticated"
                  class="btn btn-primary create-project-btn"
                  @click="showCreateModal = true"
                >
                  <i class="fas fa-plus"></i> Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="results-section">
        <div class="container">
          <div class="results-summary">
            <p>Showing <span>{{ filteredProjects.length }}</span> results (Page <span>{{ currentPage }}</span> of <span>{{ totalPages }}</span>)</p>
            <div class="sort-by">
              <label for="sort-options">Sort by:</label>
              <select id="sort-options" v-model="sortBy" @change="applySorting">
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
                <option value="most-active">Most Active</option>
              </select>
            </div>
          </div>

          <div v-if="loading" class="loading-state">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading projects...</p>
          </div>

          <div v-else-if="error" class="error-state">
            <i class="fas fa-exclamation-circle"></i>
            <p>{{ error }}</p>
            <button class="btn btn-primary" @click="loadProjects">Try Again</button>
          </div>

          <div class="results-grid">
            <div v-for="project in paginatedProjects" :key="project.id" class="item-card project-card">
              <div class="card-image-placeholder">
                <img v-if="project.coverImage" :src="project.coverImage" :alt="project.title">
                <DefaultCardImage v-else type="project" />
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ project.title }}</h3>
                <p class="card-description">{{ project.description }}</p>
                
                <div class="card-requirements">
                  <div class="requirement-item">
                    <i class="fas fa-signal"></i>
                    <span class="skill-level" :class="project.skillLevel">
                      {{ project.skillLevel }}
                    </span>
                  </div>
                  <div class="requirement-item">
                    <i class="fas fa-code"></i>
                    <span class="languages">
                      {{ project.languages.join(', ') }}
                    </span>
                  </div>
                </div>

                <div class="card-tags">
                  <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                  <span 
                    v-for="skill in project.customSkills" 
                    :key="skill" 
                    class="tag custom-skill"
                  >
                    {{ skill }}
                  </span>
                </div>

                <div class="card-meta">
                  <span><i class="fas fa-users"></i> {{ project.collaborators?.length || 0 }} Collaborators</span>
                  <span><i class="fas fa-star"></i> {{ project.stars || 0 }} Stars</span>
                </div>
              </div>
              <div class="card-actions">
                <router-link :to="'/projects/' + project.id" class="btn btn-primary">View Details</router-link>
                <button 
                  v-if="!isOwner(project)"
                  class="btn btn-outline btn-icon" 
                  @click="toggleInterest(project)"
                  :class="{ 'interested': project.isInterested }"
                >
                  <i :class="project.isInterested ? 'fas fa-heart' : 'far fa-heart'"></i> 
                  {{ project.isInterested ? 'Interested' : 'Show Interest' }}
                </button>
              </div>
              <div v-if="isOwner(project)" class="card-actions-owner">
                <div class="owner-actions">
                  <button 
                    class="btn btn-outline btn-icon"
                    @click="openEditModal(project)"
                  >
                    <i class="fas fa-edit"></i> Edit
                  </button>
                  <button 
                    class="btn btn-outline btn-icon delete-btn"
                    @click="deleteProject(project.id)"
                  >
                    <i class="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredProjects.length === 0" class="no-results-message">
            <i class="fas fa-search-minus"></i>
            <h2>No Results Found</h2>
            <p>Try adjusting your search or filters. We couldn't find anything matching your criteria.</p>
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

      <div v-if="showCreateModal || showEditModal" class="modal-overlay">
        <div class="modal-content">
          <h2>{{ showEditModal ? 'Edit Project' : 'Create New Project' }}</h2>
          <form @submit.prevent="showEditModal ? updateProject() : createProject()">
            <div class="form-group">
              <label for="project-title">Title</label>
              <input 
                id="project-title"
                v-model="projectForm.title"
                type="text"
                required
                placeholder="Enter project title"
              >
            </div>
            
            <div class="form-group">
              <label for="project-description">Description</label>
              <textarea 
                id="project-description"
                v-model="projectForm.description"
                required
                placeholder="Enter project description"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="project-skill-level">Skill Level</label>
              <select 
                id="project-skill-level"
                v-model="projectForm.skillLevel"
                required
              >
                <option value="">Select skill level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Languages</label>
              <div class="checkbox-group">
                <label v-for="lang in languages" :key="lang">
                  <input 
                    type="checkbox"
                    :value="lang"
                    v-model="projectForm.languages"
                  >
                  {{ lang }}
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>Tags</label>
              <div class="checkbox-group">
                <label v-for="tag in tags" :key="tag">
                  <input 
                    type="checkbox"
                    :value="tag"
                    v-model="projectForm.tags"
                  >
                  {{ tag }}
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>Custom Skills</label>
              <div class="custom-skills-input">
                <div class="input-group">
                  <input 
                    type="text" 
                    v-model="newCustomSkill"
                    placeholder="Add a custom skill"
                    @keyup.enter="addCustomSkill"
                  >
                  <button 
                    type="button" 
                    class="btn btn-outline btn-sm"
                    @click="addCustomSkill"
                  >
                    <i class="fas fa-plus"></i> Add
                  </button>
                </div>
                <div class="custom-skills-list">
                  <div 
                    v-for="skill in projectForm.customSkills" 
                    :key="skill" 
                    class="custom-skill-tag"
                  >
                    {{ skill }}
                    <button 
                      type="button" 
                      class="remove-skill"
                      @click="removeCustomSkill(skill)"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="project-cover">Cover Image URL</label>
              <input 
                id="project-cover"
                v-model="projectForm.coverImage"
                type="url"
                placeholder="Enter cover image URL"
              >
            </div>
            
            <div class="modal-actions">
              <button type="button" class="btn btn-outline" @click="closeModal">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                {{ showEditModal ? 'Update Project' : 'Create Project' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import DefaultCardImage from '../../components/DefaultCardImage.vue';
import { projectService } from '../../services/projectService';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'Projects',
  components: {
    DefaultCardImage
  },
  data() {
    return {
      scrollObserver: null,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 9,
      sortBy: 'relevance',
      filters: {
        skillLevel: '',
        language: '',
        tag: ''
      },
      languages: ['JavaScript', 'Python', 'Java', 'C#', 'Go', 'Ruby', 'PHP', 'TypeScript'],
      tags: ['Web Development', 'Mobile App', 'AI/ML', 'Data Science', 'DevOps', 'Game Development'],
      projects: [],
      loading: true,
      error: null,
      currentUser: null,
      showCreateModal: false,
      showEditModal: false,
      newCustomSkill: '',
      projectForm: {
        title: '',
        description: '',
        skillLevel: '',
        languages: [],
        tags: [],
        customSkills: [],
        coverImage: ''
      },
      editingProjectId: null
    };
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            project.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesSkillLevel = !this.filters.skillLevel || project.skillLevel === this.filters.skillLevel;
        const matchesLanguage = !this.filters.language || project.languages.includes(this.filters.language);
        const matchesTag = !this.filters.tag || project.tags.includes(this.filters.tag);
        
        return matchesSearch && matchesSkillLevel && matchesLanguage && matchesTag;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
    },
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProjects.slice(start, end);
    },
    isAuthenticated() {
      return !!this.currentUser;
    }
  },
  methods: {
    async loadProjects() {
      try {
        this.loading = true;
        this.projects = await projectService.getAllProjects();
      } catch (error) {
        this.error = 'Failed to load projects. Please try again later.';
        console.error('Error loading projects:', error);
      } finally {
        this.loading = false;
      }
    },
    async handleSearch() {
      this.currentPage = 1;
      await this.applyFilters();
    },
    async applyFilters() {
      try {
        this.loading = true;
        this.projects = await projectService.getProjectsByFilters(this.filters);
        this.currentPage = 1;
      } catch (error) {
        this.error = 'Failed to apply filters. Please try again later.';
        console.error('Error applying filters:', error);
      } finally {
        this.loading = false;
      }
    },
    clearFilters() {
      this.filters = {
        skillLevel: '',
        language: '',
        tag: ''
      };
      this.searchQuery = '';
      this.currentPage = 1;
      this.loadProjects();
    },
    async applySorting() {
      const sortedProjects = [...this.projects];
      switch (this.sortBy) {
        case 'newest':
          sortedProjects.sort((a, b) => b.createdAt - a.createdAt);
          break;
        case 'most-active':
          sortedProjects.sort((a, b) => b.collaborators - a.collaborators);
          break;
        default:
          break;
      }
      this.projects = sortedProjects;
    },
    changePage(page) {
      this.currentPage = page;
    },
    async toggleInterest(project) {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }

      try {
        await projectService.toggleProjectInterest(project.id, this.currentUser.uid);
        project.isInterested = !project.isInterested;
      } catch (error) {
        console.error('Error toggling interest:', error);
      }
    },
    closeModal() {
      this.showCreateModal = false;
      this.showEditModal = false;
      this.resetProjectForm();
    },
    resetProjectForm() {
      this.projectForm = {
        title: '',
        description: '',
        skillLevel: '',
        languages: [],
        tags: [],
        customSkills: [],
        coverImage: ''
      };
      this.editingProjectId = null;
    },
    openEditModal(project) {
      this.editingProjectId = project.id;
      this.projectForm = {
        title: project.title,
        description: project.description,
        skillLevel: project.skillLevel,
        languages: [...project.languages],
        tags: [...project.tags],
        customSkills: [...(project.customSkills || [])],
        coverImage: project.coverImage || ''
      };
      this.showEditModal = true;
    },
    async updateProject() {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }

      try {
        const projectData = {
          ...this.projectForm,
          updatedAt: new Date()
        };

        await projectService.updateProject(this.editingProjectId, projectData);
        this.closeModal();
        await this.loadProjects();
      } catch (error) {
        console.error('Error updating project:', error);
        this.error = 'Failed to update project. Please try again.';
      }
    },
    async createProject() {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }

      try {
        const projectData = {
          ...this.projectForm,
          createdBy: this.currentUser.uid,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await projectService.createProject(projectData);
        this.closeModal();
        await this.loadProjects();
      } catch (error) {
        console.error('Error creating project:', error);
        this.error = 'Failed to create project. Please try again.';
      }
    },
    async deleteProject(projectId) {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }

      if (confirm('Are you sure you want to delete this project?')) {
        try {
          await projectService.deleteProject(projectId);
          await this.loadProjects();
        } catch (error) {
          console.error('Error deleting project:', error);
          this.error = 'Failed to delete project. Please try again.';
        }
      }
    },
    isOwner(project) {
      return project.createdBy === this.currentUser.uid;
    },
    addCustomSkill() {
      if (this.newCustomSkill.trim() && !this.projectForm.customSkills.includes(this.newCustomSkill.trim())) {
        this.projectForm.customSkills.push(this.newCustomSkill.trim());
        this.newCustomSkill = '';
      }
    },
    removeCustomSkill(skill) {
      this.projectForm.customSkills = this.projectForm.customSkills.filter(s => s !== skill);
    }
  },
  mounted() {
    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated'); // Use .animated from main.css
          // Optionally unobserve after animation
          // this.scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elementsToAnimate = this.$el.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
      if (this.scrollObserver) {
        this.scrollObserver.observe(el);
      }
    });
  },
  beforeUnmount() {
    if (this.scrollObserver) {
      const elementsToAnimate = this.$el.querySelectorAll('.animate-on-scroll');
      elementsToAnimate.forEach(el => {
         if (this.scrollObserver) {
            this.scrollObserver.unobserve(el);
         }
      });
      this.scrollObserver.disconnect();
      this.scrollObserver = null;
    }
  },
  async created() {
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
    });

    await this.loadProjects();
  }
};
</script>

<style scoped>
@import '../../assets/styles/explore.css';

.projects-page {
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
  gap: var(--spacing-md);
  align-items: flex-end;
  margin-top: var(--spacing-md);
}

.filter-group {
  flex: 1;
  min-width: 200px;
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

.filter-actions {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.clear-filters-btn,
.create-project-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  white-space: nowrap;
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

.project-card {
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  overflow: hidden;
}

.project-card:hover {
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

.card-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.card-description {
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.card-requirements {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color);
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.skill-level {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-full);
  font-weight: 500;
  text-transform: capitalize;
}

.skill-level.beginner {
  background-color: var(--success-light);
  color: var(--success-dark);
}

.skill-level.intermediate {
  background-color: var(--warning-light);
  color: var(--warning-dark);
}

.skill-level.advanced {
  background-color: var(--error-light);
  color: var(--error-dark);
}

.languages {
  color: var(--text-dark);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.tag {
  background-color: var(--light-bg);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  color: var(--text-dark);
}

.tag.custom-skill {
  background-color: var(--primary-light);
  color: var(--primary-dark);
}

.card-meta {
  display: flex;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: var(--font-size-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
}

.card-meta span {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.card-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.btn-icon {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.btn-icon.interested {
  color: var(--error);
  border-color: var(--error);
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

.card-actions-owner {
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
}

.owner-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
}

.delete-btn {
  color: var(--error);
}

.delete-btn:hover {
  background-color: var(--error);
  color: var(--white);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-content h2 {
  margin-bottom: var(--spacing-xl);
  color: var(--text-dark);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
  color: var(--text-dark);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px var(--primary-light);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-sm);
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: normal;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.loading-state,
.error-state {
  text-align: center;
  padding: var(--spacing-2xl);
}

.loading-state i,
.error-state i {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

.error-state {
  color: var(--error);
}

.custom-skills-input {
  margin-top: var(--spacing-sm);
}

.input-group {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.input-group input {
  flex: 1;
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.custom-skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.custom-skill-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  background-color: var(--primary-light);
  color: var(--primary-dark);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
}

.remove-skill {
  background: none;
  border: none;
  color: var(--primary-dark);
  cursor: pointer;
  padding: 0;
  font-size: var(--font-size-sm);
}

.remove-skill:hover {
  color: var(--error);
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
  }

  .filter-bar {
    flex-direction: column;
  }

  .filter-group {
    width: 100%;
  }

  .filter-actions {
    width: 100%;
    justify-content: space-between;
  }

  .results-summary {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }

  .card-actions,
  .owner-actions {
    flex-direction: column;
  }

  .card-requirements {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>
