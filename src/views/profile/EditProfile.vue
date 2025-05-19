<template>
  <div class="edit-profile-page container">
    <h1>Edit Profile</h1>
    <form class="profile-form" @submit="handleSave">
      <div v-if="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
      <div v-if="!loading && !error">
        <div class="form-group">
          <label>Username</label>
          <input type="text" v-model="username" />
        </div>
        <div class="form-group">
          <label>Bio</label>
          <textarea v-model="bio"></textarea>
        </div>
        <div class="form-group">
          <label>Skills</label>
          <input type="text" v-model="skills" />
        </div>
        <div class="form-group">
          <label>GitHub Link</label>
          <input type="url" v-model="github" />
        </div>
        <div class="form-group">
          <label>Twitter Link</label>
          <input type="url" v-model="twitter" />
        </div>
        <button class="btn btn-primary" type="submit">Save Profile</button>
      </div>
    </form>
  </div>
</template>

<script>
import { db, auth } from '../../firebase';
import { doc, getDoc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';

export default {
  name: 'EditProfile',
  data() {
    return {
      user: null,
      username: '',
      bio: '',
      skills: '',
      github: '',
      twitter: '',
      loading: true,
      error: '',
      success: ''
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
        const data = userDoc.data();
        this.user = data;
        this.username = data.username || '';
        this.bio = data.bio || '';
        this.skills = (data.skills || []).join(', ');
        this.github = data.github || '';
        this.twitter = data.twitter || '';
      } else {
        this.error = 'User not found.';
      }
    } catch (err) {
      this.error = 'Failed to load profile.';
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async handleSave(e) {
      e.preventDefault();
      this.loading = true;
      this.error = '';
      this.success = '';
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
        await updateDoc(doc(db, 'users', uid), {
          username: this.username,
          bio: this.bio,
          skills: this.skills.split(',').map(s => s.trim()),
          github: this.github,
          twitter: this.twitter
        });
        this.success = 'Profile updated!';
      } catch (err) {
        this.error = 'Failed to update profile.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.edit-profile-page { padding: 40px 0; }
.profile-form { max-width: 500px; margin: 0 auto; }
.form-group { margin-bottom: 20px; }
label { font-weight: 600; display: block; margin-bottom: 8px; }
input, textarea { width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; }
.btn-primary { margin-top: 10px; }
.error { color: red; }
.success { color: green; }
</style>
