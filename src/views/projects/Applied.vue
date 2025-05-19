<template>
  <div class="applied-page container">
    <h1>Projects You've Applied To</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && !error && appliedProjects.length === 0" class="no-applied">You haven't expressed interest in any projects yet.</div>
    <div v-else class="applied-list">
      <div v-for="project in appliedProjects" :key="project.id" class="applied-card">
        <div class="applied-header">
          <img :src="project.creator.avatar" class="creator-avatar" :alt="project.creator.name" />
          <div>
            <h2>{{ project.title }}</h2>
            <div class="applied-meta">
              <span>Status: <strong>{{ project.status }}</strong></span>
              <span>By: <strong>{{ project.creator.name }}</strong></span>
            </div>
          </div>
        </div>
        <p class="applied-description">{{ project.description }}</p>
        <div class="applied-skills">
          <span v-for="skill in project.skills" :key="skill" class="skill-tag">{{ skill }}</span>
        </div>
        <router-link :to="`/projects/${project.id}`" class="btn btn-outline">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export default {
  name: 'Applied',
  data() {
    return {
      appliedProjects: [],
      loading: true,
      error: ''
    };
  },
  async mounted() {
    try {
      if (!auth.currentUser) {
        this.error = 'You must be logged in to view applied projects.';
        this.loading = false;
        return;
      }
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const projectIds = userData.interestedProjects || [];
        const projects = [];
        for (const id of projectIds) {
          const projDoc = await getDoc(doc(db, 'projects', id));
          if (projDoc.exists()) {
            projects.push({ id, ...projDoc.data() });
          }
        }
        this.appliedProjects = projects;
      } else {
        this.error = 'User profile not found.';
      }
    } catch (err) {
      this.error = 'Failed to load applied projects.';
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.applied-page { padding: 40px 0; }
.no-applied { text-align: center; color: #888; margin: 40px 0; }
.loading { text-align: center; color: #888; margin: 40px 0; }
.error { text-align: center; color: red; margin: 40px 0; }
.applied-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; }
.applied-card { background: #f9f9f9; border-radius: 10px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 12px; }
.applied-header { display: flex; gap: 16px; align-items: center; }
.creator-avatar { width: 48px; height: 48px; border-radius: 50%; border: 2px solid #375bb1; }
.applied-meta { font-size: 0.95em; color: #666; display: flex; gap: 16px; flex-wrap: wrap; }
.applied-description { margin: 10px 0; color: #444; }
.applied-skills { display: flex; gap: 8px; flex-wrap: wrap; }
.skill-tag { background: #e3e9f7; color: #375bb1; border-radius: 4px; padding: 2px 8px; font-size: 0.92em; }
</style>
