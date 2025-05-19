<template>
  <div class="project-detail-page">
    <div class="container">
      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading project...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <i class="fas fa-exclamation-circle"></i>
        <p>{{ error }}</p>
        <button class="btn btn-primary" @click="fetchProject">Try Again</button>
      </div>

      <div v-else class="project-content">
        <div class="project-header">
          <h1>{{ project?.title }}</h1>
          <div class="project-meta">
            <span class="meta-item">
              <i class="fas fa-code-branch"></i>
              Status: <strong>{{ project?.status || 'Active' }}</strong>
            </span>
            <span class="meta-item">
              <i class="fas fa-user"></i>
              Created by: <strong>{{ creator?.name }}</strong>
            </span>
            <span class="meta-item">
              <i class="fas fa-users"></i>
              Collaborators: <strong>{{ project?.collaborators?.length || 0 }}</strong>
            </span>
          </div>
        </div>

        <div class="project-main">
          <div class="project-info">
            <div class="project-description">
              <h3>Description</h3>
              <p>{{ project?.description }}</p>
            </div>

            <div class="project-skills">
              <h3>Required Skills</h3>
              <div class="skills-section">
                <div class="skill-level-badge" :class="project?.skillLevel">
                  <i class="fas fa-signal"></i>
                  {{ project?.skillLevel }}
                </div>
                
                <div class="skills-group">
                  <h4>Programming Languages</h4>
                  <div class="skills-tags">
                    <span v-for="lang in project?.languages" :key="lang" class="skill-tag language">
                      <i class="fas fa-code"></i>
                      {{ lang }}
                    </span>
                  </div>
                </div>

                <div class="skills-group">
                  <h4>Technologies & Tools</h4>
                  <div class="skills-tags">
                    <span v-for="tag in project?.tags" :key="tag" class="skill-tag technology">
                      <i class="fas fa-tools"></i>
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div v-if="project?.customSkills?.length" class="skills-group">
                  <h4>Additional Skills</h4>
                  <div class="skills-tags">
                    <span 
                      v-for="skill in project?.customSkills" 
                      :key="skill" 
                      class="skill-tag custom"
                    >
                      <i class="fas fa-star"></i>
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="project-actions">
              <template v-if="isOwner">
                <button 
                  class="btn btn-primary"
                  @click="openEditModal"
                >
                  <i class="fas fa-edit"></i> Edit Project
                </button>
                <button 
                  class="btn btn-danger" 
                  @click="deleteProject"
                >
                  <i class="fas fa-trash"></i> Delete Project
                </button>
              </template>
              <button 
                v-else-if="isAuthenticated" 
                class="btn btn-primary" 
                @click="toggleInterest"
                :class="{ 'interested': interested }"
              >
                <i :class="interested ? 'fas fa-heart' : 'far fa-heart'"></i>
                {{ interested ? 'Withdraw Interest' : 'Express Interest' }}
              </button>
              <router-link 
                v-else 
                to="/login" 
                class="btn btn-primary"
              >
                <i class="fas fa-sign-in-alt"></i> Login to Participate
              </router-link>
            </div>
          </div>

          <div class="project-sidebar">
            <div class="contributors-section">
              <h3>Contributors</h3>
              <div v-if="project?.collaborators?.length" class="contributors-list">
                <div v-for="collaborator in project.collaborators" :key="collaborator.id" class="contributor-item">
                  <img :src="collaborator.avatar || '/default-avatar.png'" :alt="collaborator.name" class="contributor-avatar">
                  <span class="contributor-name">{{ collaborator.name }}</span>
                </div>
              </div>
              <p v-else class="no-contributors">No contributors yet</p>
            </div>
          </div>
        </div>

        <div class="discussion-section">
          <h3>Discussion</h3>
          <div class="discussion-thread">
            <div class="comment" v-for="comment in comments" :key="comment.id">
              <strong>{{ comment.author }}:</strong> {{ comment.text }}
            </div>
          </div>
          <textarea v-model="newComment" placeholder="Add a comment..."></textarea>
          <button class="btn btn-primary" @click="addComment" :disabled="addingComment">Post</button>
        </div>
        <div class="kanban-section">
          <h3>Task Board</h3>
          <div class="kanban-board">
            <div class="kanban-column">
              <h4>To-Do</h4>
              <ul>
                <li v-for="task in tasks.todo" :key="task.id">{{ task.text }}</li>
              </ul>
            </div>
            <div class="kanban-column">
              <h4>In Progress</h4>
              <ul>
                <li v-for="task in tasks.inprogress" :key="task.id">{{ task.text }}</li>
              </ul>
            </div>
            <div class="kanban-column">
              <h4>Done</h4>
              <ul>
                <li v-for="task in tasks.done" :key="task.id">{{ task.text }}</li>
              </ul>
            </div>
          </div>
          <div class="add-task">
            <input v-model="newTask.text" placeholder="New task" />
            <select v-model="newTask.status">
              <option value="todo">To-Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button class="btn btn-primary" @click="addTask" :disabled="addingTask">Add Task</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Edit Project</h2>
        <form @submit.prevent="updateProject">
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
            <label for="project-cover">Cover Image URL</label>
            <input 
              id="project-cover"
              v-model="projectForm.coverImage"
              type="url"
              placeholder="Enter cover image URL"
            >
          </div>
          
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" @click="closeEditModal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../../firebase';
import { doc, getDoc, collection, getDocs, addDoc, serverTimestamp, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { projectService } from '../../services/projectService';
import DefaultAvatar from '../../components/DefaultAvatar.vue';

export default {
  name: 'ProjectDetail',
  components: {
    DefaultAvatar
  },
  data() {
    return {
      project: null,
      creator: null,
      loading: true,
      error: '',
      newComment: '',
      comments: [],
      addingComment: false,
      tasks: { todo: [], inprogress: [], done: [] },
      newTask: { text: '', status: 'todo' },
      addingTask: false,
      userId: null,
      isOwner: false,
      interested: false,
      showEditModal: false,
      projectForm: {
        title: '',
        description: '',
        skillLevel: '',
        languages: [],
        tags: [],
        coverImage: ''
      },
      languages: ['JavaScript', 'Python', 'Java', 'C#', 'Go', 'Ruby', 'PHP', 'TypeScript'],
      tags: ['Web Development', 'Mobile App', 'AI/ML', 'Data Science', 'DevOps', 'Game Development']
    };
  },
  computed: {
    isAuthenticated() {
      return !!this.userId;
    }
  },
  async mounted() {
    if (auth.currentUser) {
      this.userId = auth.currentUser.uid;
    }
    await this.fetchProject();
    await this.fetchComments();
    await this.fetchTasks();
    this.loading = false;
  },
  methods: {
    async fetchProject() {
      try {
        const projectId = this.$route.params.id;
        const project = await projectService.getProjectById(projectId);
        if (project) {
          this.project = project;
          this.isOwner = project.createdBy === auth.currentUser?.uid;
        } else {
          this.$router.push('/projects');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    },
    async toggleInterest() {
      try {
        if (!auth.currentUser) {
          this.$router.push('/login');
          return;
        }
        
        const userId = auth.currentUser.uid;
        await projectService.toggleProjectInterest(this.project.id, userId);
        await this.fetchProject();
      } catch (error) {
        console.error('Error toggling interest:', error);
      }
    },
    async fetchComments() {
      try {
        const commentsCol = collection(db, 'projects', this.$route.params.id, 'comments');
        const commentsSnap = await getDocs(commentsCol);
        this.comments = commentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        this.error = 'Failed to load comments.';
      }
    },
    async addComment() {
      if (!this.newComment.trim()) return;
      this.addingComment = true;
      try {
        await addDoc(collection(db, 'projects', this.project.id, 'comments'), {
          text: this.newComment,
          createdAt: serverTimestamp(),
          author: auth.currentUser?.displayName || auth.currentUser?.email || 'Anonymous',
          userId: auth.currentUser?.uid || null
        });
        this.newComment = '';
        await this.fetchComments();
      } catch (err) {
        this.error = 'Failed to add comment.';
      } finally {
        this.addingComment = false;
      }
    },
    async fetchTasks() {
      try {
        const tasksCol = collection(db, 'projects', this.$route.params.id, 'tasks');
        const tasksSnap = await getDocs(tasksCol);
        const allTasks = tasksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        this.tasks = { todo: [], inprogress: [], done: [] };
        for (const task of allTasks) {
          if (task.status === 'todo') this.tasks.todo.push(task);
          else if (task.status === 'inprogress') this.tasks.inprogress.push(task);
          else if (task.status === 'done') this.tasks.done.push(task);
        }
      } catch (err) {
        this.error = 'Failed to load tasks.';
      }
    },
    async addTask() {
      if (!this.newTask.text.trim()) return;
      this.addingTask = true;
      try {
        await addDoc(collection(db, 'projects', this.project.id, 'tasks'), {
          text: this.newTask.text,
          status: this.newTask.status,
          createdAt: serverTimestamp()
        });
        await this.fetchTasks();
        this.newTask.text = '';
        this.newTask.status = 'todo';
      } catch (err) {
        this.error = 'Failed to add task.';
      } finally {
        this.addingTask = false;
      }
    },
    openEditModal() {
      if (!this.isOwner) {
        alert('Only the project owner can edit this project.');
        return;
      }
      this.projectForm = {
        title: this.project.title,
        description: this.project.description,
        skillLevel: this.project.skillLevel,
        languages: [...this.project.languages],
        tags: [...this.project.tags],
        coverImage: this.project.coverImage || ''
      };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.projectForm = {
        title: '',
        description: '',
        skillLevel: '',
        languages: [],
        tags: [],
        coverImage: ''
      };
    },
    async updateProject() {
      try {
        if (!this.isOwner) {
          alert('Only the project owner can edit this project');
          return;
        }
        
        await projectService.updateProject(this.project.id, this.projectForm);
        await this.fetchProject();
        this.closeEditModal();
      } catch (error) {
        console.error('Error updating project:', error);
      }
    },
    async deleteProject() {
      try {
        if (!this.isOwner) {
          alert('Only the project owner can delete this project');
          return;
        }
        
        if (confirm('Are you sure you want to delete this project?')) {
          await projectService.deleteProject(this.project.id);
          this.$router.push('/projects');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  }
};
</script>

<style scoped>
.project-detail-page {
  padding: var(--spacing-2xl) 0;
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

.project-header {
  margin-bottom: var(--spacing-xl);
}

.project-header h1 {
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-2xl);
}

.project-meta {
  display: flex;
  gap: var(--spacing-lg);
  color: var(--text-muted);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.meta-item i {
  color: var(--primary);
}

.project-main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xl);
}

.project-info {
  background: var(--white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.project-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.project-description,
.project-skills {
  margin-bottom: var(--spacing-xl);
}

.project-description h3,
.project-skills h3 {
  margin-bottom: var(--spacing-md);
  color: var(--text-dark);
}

.skills-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.skill-level-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-full);
  font-weight: 500;
  text-transform: capitalize;
  width: fit-content;
}

.skill-level-badge.beginner {
  background-color: var(--success-light);
  color: var(--success-dark);
}

.skill-level-badge.intermediate {
  background-color: var(--warning-light);
  color: var(--warning-dark);
}

.skill-level-badge.advanced {
  background-color: var(--error-light);
  color: var(--error-dark);
}

.skills-group {
  margin-top: var(--spacing-md);
}

.skills-group h4 {
  margin-bottom: var(--spacing-sm);
  color: var(--text-dark);
  font-size: var(--font-size-base);
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
}

.skill-tag.language {
  background-color: var(--primary-light);
  color: var(--primary-dark);
}

.skill-tag.technology {
  background-color: var(--light-bg);
  color: var(--text-dark);
}

.skill-tag.custom {
  background-color: var(--warning-light);
  color: var(--warning-dark);
}

.skill-tag i {
  font-size: var(--font-size-sm);
}

.project-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.btn.interested {
  background-color: var(--error);
  border-color: var(--error);
}

.contributors-section {
  background: var(--white);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.contributors-section h3 {
  margin-bottom: var(--spacing-md);
  color: var(--text-dark);
}

.contributors-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.contributor-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  background: var(--light-bg);
}

.contributor-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.contributor-name {
  font-size: var(--font-size-sm);
  color: var(--text-dark);
}

.no-contributors {
  color: var(--text-muted);
  text-align: center;
  padding: var(--spacing-md);
}

.discussion-section { margin-top: 40px; }
.discussion-thread { margin-bottom: 10px; }
.comment { background: #f9f8f7; border-radius: 4px; padding: 8px; margin-bottom: 5px; }
.add-task { margin-top: 20px; display: flex; gap: 10px; }
.kanban-board { display: flex; gap: 20px; margin-top: 20px; }
.kanban-column { background: #f4f4f4; border-radius: 8px; padding: 15px; width: 200px; }
.kanban-column h4 { margin-bottom: 10px; }

@media (max-width: 768px) {
  .project-main {
    grid-template-columns: 1fr;
  }

  .project-meta {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .project-actions {
    flex-direction: column;
  }

  .skills-tags {
    gap: var(--spacing-xs);
  }
  
  .skill-tag {
    font-size: var(--font-size-xs);
  }
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
</style>
