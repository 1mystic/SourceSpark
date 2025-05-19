<template>
  <div class="create-project-page container">
    <h1>Create New Project</h1>
    <form class="project-form" @submit="handleSubmit">
      <div class="form-group">
        <label>Title</label>
        <input type="text" v-model="title" placeholder="Project Title" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="description" placeholder="Describe your project..."></textarea>
      </div>
      <div class="form-group">
        <label>Status</label>
        <select v-model="status">
          <option>Active</option>
          <option>Completed</option>
        </select>
      </div>
      <div class="form-group">
        <label>GitHub Repo URL</label>
        <input type="url" v-model="githubUrl" placeholder="https://github.com/your-repo" />
      </div>
      <div class="form-group">
        <label>Required Skills</label>
        <input type="text" v-model="skills" placeholder="e.g. JavaScript, Vue.js, Teamwork" />
      </div>
      <button class="btn btn-primary" type="submit" :disabled="isLoading">Create Project</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { db, auth } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default {
  name: 'CreateProject',
  data() {
    return {
      title: '',
      description: '',
      status: 'Active',
      githubUrl: '',
      skills: '',
      isLoading: false,
      error: ''
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      this.isLoading = true;
      this.error = '';
      try {
        if (!auth.currentUser) {
          this.error = 'You must be logged in to create a project.';
          this.isLoading = false;
          return;
        }
        const user = auth.currentUser;
        await addDoc(collection(db, 'projects'), {
          title: this.title,
          description: this.description,
          status: this.status,
          githubUrl: this.githubUrl,
          skills: this.skills.split(',').map(s => s.trim()),
          createdAt: serverTimestamp(),
          views: 0,
          collaborators: 1,
          creatorId: user.uid,
          creatorName: user.displayName || user.email || 'Anonymous',
          creatorAvatar: user.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
        });
        this.$router.push('/projects');
      } catch (err) {
        this.error = 'Failed to create project.';
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.create-project-page { padding: 40px 0; }
.project-form { max-width: 500px; margin: 0 auto; }
.form-group { margin-bottom: 20px; }
label { font-weight: 600; display: block; margin-bottom: 8px; }
input, textarea, select { width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; }
.btn-primary { margin-top: 10px; }
.error { color: red; margin-top: 10px; }
</style>
