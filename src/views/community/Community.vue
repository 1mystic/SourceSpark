<template>
  <div class="community-page container">
    <h1>Community Feed & Forum</h1>
    <div class="community-feed">
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="post in posts" :key="post.id" class="feed-post">
          <strong>{{ post.author }}</strong>: {{ post.text }}
        </div>
      </div>
    </div>
    <form class="community-form" @submit="handlePost">
      <textarea v-model="newPost" placeholder="Share something with the community..."></textarea>
      <button class="btn btn-primary" type="submit">Post</button>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="!isLoggedIn">
        <router-link to="/login">Log in to post</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { db, auth } from '../../firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

export default {
  name: 'Community',
  data() {
    return {
      posts: [],
      newPost: '',
      loading: true,
      error: ''
    };
  },
  async mounted() {
    await this.fetchPosts();
  },
  computed: {
    isLoggedIn() {
      return !!this.$root.isLoggedIn;
    }
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        const q = query(collection(db, 'communityPosts'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        this.posts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        this.error = 'Failed to load posts.';
      } finally {
        this.loading = false;
      }
    },
    async handlePost(e) {
      e.preventDefault();
      if (!auth.currentUser) {
        this.error = 'You must be logged in to post.';
        return;
      }
      if (!this.newPost.trim()) return;
      try {
        await addDoc(collection(db, 'communityPosts'), {
          text: this.newPost,
          author: auth.currentUser.displayName || auth.currentUser.email || 'Anonymous',
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp()
        });
        this.newPost = '';
        await this.fetchPosts();
      } catch (err) {
        this.error = 'Failed to post.';
      }
    }
  }
};
</script>

<style scoped>
.community-page { padding: 40px 0; }
.community-feed { margin-bottom: 30px; }
.feed-post { background: #f9f8f7; border-radius: 4px; padding: 12px; margin-bottom: 10px; }
.community-form textarea { width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; margin-bottom: 10px; }
.error { color: red; margin-top: 10px; }
</style>
