<template>
  <div class="portfolio-page container">
    <h1>Portfolio</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="portfolio-header">
        <img class="portfolio-avatar" :src="user.avatarUrl || 'https://i.pravatar.cc/150?img=1'" alt="User Avatar" />
        <div class="portfolio-info">
          <h2>{{ user.username }}</h2>
          <p>Bio: {{ user.bio }}</p>
          <div class="portfolio-links">
            <a v-for="link in user.links" :key="link.name" :href="link.url" target="_blank">{{ link.name }}</a>
          </div>
        </div>
      </div>
      <div class="portfolio-projects">
        <h2>Projects</h2>
        <div v-for="project in user.projects" :key="project.name" class="project-card">
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '../../firebase';

export default {
  name: 'Portfolio',
  data() {
    return {
      user: null,
      loading: true,
      error: ''
    };
  },
  async mounted() {
    try {
      let uid = null;
      if (auth.currentUser) {
        uid = auth.currentUser.uid;
      }
      if (!uid) {
        this.error = 'User not found.';
        this.loading = false;
        return;
      }
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        this.user = userDoc.data();
      } else {
        this.error = 'User not found.';
      }
    } catch (err) {
      this.error = 'Failed to load profile.';
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.portfolio-header { display: flex; align-items: center; gap: 30px; margin: 40px 0; }
.portfolio-avatar { width: 100px; height: 100px; border-radius: 50%; border: 3px solid #375bb1; }
.portfolio-info h2 { margin-bottom: 10px; }
.portfolio-links a { margin-right: 10px; color: #375bb1; }
.project-card { background: #f4f4f4; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
</style>
