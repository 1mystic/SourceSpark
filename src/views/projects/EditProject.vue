<template>
  <div class="edit-project-page">
    <div class="container">
      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading project...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <i class="fas fa-exclamation-circle"></i>
        <p>{{ error }}</p>
        <button class="btn btn-primary" @click="loadProject">Try Again</button>
      </div>

      <div v-else class="edit-project-content">
        <h1>Edit Project</h1>
        
        <form @submit.prevent="updateProject" class="edit-project-form">
          <div class="form-group">
            <label for="project-title">Title</label>
            <input 
              id="project-title"
              v-model="project.title"
              type="text"
              required
              placeholder="Enter project title"
            >
          </div>
          
          <div class="form-group">
            <label for="project-description">Description</label>
            <textarea 
              id="project-description"
              v-model="project.description"
              required
              placeholder="Enter project description"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="project-skill-level">Skill Level</label>
            <select 
              id="project-skill-level"
              v-model="project.skillLevel"
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
                  v-model="project.languages"
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
                  v-model="project.tags"
                >
                {{ tag }}
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label for="project-cover">Cover Image URL</label>
            <input 
              id="project-cover"
              v-model="project.coverImage"
              type="url"
              placeholder="Enter cover image URL"
            >
          </div>
          
          <div class="form-actions">
            <router-link to="/projects" class="btn btn-outline">
              Cancel
            </router-link>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { projectService } from '../../services/projectService';
import { auth } from '../../firebase';

export default {
  name: 'EditProject',
  data() {
    return {
      project: {
        title: '',
        description: '',
        skillLevel: '',
        languages: [],
        tags: [],
        coverImage: ''
      },
      loading: true,
      saving: false,
      error: null,
      languages: ['JavaScript', 'Python', 'Java', 'C#', 'Go', 'Ruby', 'PHP', 'TypeScript'],
      tags: ['Web Development', 'Mobile App', 'AI/ML', 'Data Science', 'DevOps', 'Game Development']
    };
  },
  async created() {
    await this.loadProject();
  },
  methods: {
    async loadProject() {
      try {
        this.loading = true;
        const projectId = this.$route.params.id;
        const project = await projectService.getProjectById(projectId);
        
        if (!project) {
          this.error = 'Project not found';
          return;
        }

        // Check if user is authorized to edit
        if (project.createdBy !== auth.currentUser?.uid) {
          this.error = 'You are not authorized to edit this project';
          return;
        }

        this.project = project;
      } catch (error) {
        console.error('Error loading project:', error);
        this.error = 'Failed to load project. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    async updateProject() {
      try {
        this.saving = true;
        const projectId = this.$route.params.id;
        
        await projectService.updateProject(projectId, {
          ...this.project,
          updatedAt: new Date()
        });

        // Redirect to projects page after successful update
        this.$router.push('/projects');
      } catch (error) {
        console.error('Error updating project:', error);
        this.error = 'Failed to update project. Please try again later.';
      } finally {
        this.saving = false;
      }
    }
  }
};
</script>

<style scoped>
.edit-project-page {
  padding: var(--spacing-2xl) 0;
}

.edit-project-content {
  max-width: 800px;
  margin: 0 auto;
}

.edit-project-content h1 {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.edit-project-form {
  background-color: var(--white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.form-group textarea {
  min-height: 150px;
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
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
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

@media (max-width: 768px) {
  .edit-project-form {
    padding: var(--spacing-lg);
  }

  .checkbox-group {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
</style>
