<template>
  <div class="mentorship-page container">
    <h1>Mentorship Program</h1>
    <div class="mentors-list">
      <div v-for="mentor in mentors" :key="mentor.id" class="mentor-card">
        <img :src="`https://i.pravatar.cc/100?img=${mentor.id}`" alt="Mentor Avatar" class="mentor-avatar" />
        <div class="mentor-info">
          <h3>{{ mentor.name }}</h3>
          <p>Expertise: {{ mentor.expertise }}</p>
          <button class="btn btn-primary">Contact Mentor</button>
        </div>
      </div>
    </div>
    <div class="volunteer-section">
      <h2>Become a Mentor</h2>
      <form class="volunteer-form" @submit="handleVolunteer">
        <input type="text" v-model="name" placeholder="Your Name" />
        <input type="text" v-model="expertise" placeholder="Your Expertise" />
        <button class="btn btn-outline" type="submit">Volunteer</button>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="success" class="success">{{ success }}</div>
        <div v-if="!isLoggedIn">
          <router-link to="/login">Log in to volunteer</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../../firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

export default {
  name: 'Mentorship',
  data() {
    return {
      mentors: [],
      name: '',
      expertise: '',
      loading: true,
      error: '',
      success: ''
    };
  },
  async mounted() {
    await this.fetchMentors();
  },
  computed: {
    isLoggedIn() {
      return !!this.$root.isLoggedIn;
    }
  },
  methods: {
    async fetchMentors() {
      this.loading = true;
      try {
        const q = query(collection(db, 'mentors'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        this.mentors = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        this.error = 'Failed to load mentors.';
      } finally {
        this.loading = false;
      }
    },
    async handleVolunteer(e) {
      e.preventDefault();
      if (!auth.currentUser) {
        this.error = 'You must be logged in to volunteer.';
        return;
      }
      if (!this.name.trim() || !this.expertise.trim()) return;
      try {
        await addDoc(collection(db, 'mentors'), {
          name: this.name,
          expertise: this.expertise,
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp()
        });
        this.name = '';
        this.expertise = '';
        this.success = 'Thank you for volunteering!';
        await this.fetchMentors();
      } catch (err) {
        this.error = 'Failed to volunteer.';
      }
    }
  }
};
</script>

<style scoped>
.mentorship-page { padding: 40px 0; }
.mentors-list { display: flex; gap: 30px; margin-bottom: 40px; }
.mentor-card { background: #f4f4f4; border-radius: 8px; padding: 20px; display: flex; align-items: center; gap: 20px; }
.mentor-avatar { width: 70px; height: 70px; border-radius: 50%; border: 2px solid #375bb1; }
.mentor-info h3 { margin-bottom: 5px; }
.volunteer-section { margin-top: 40px; }
.volunteer-form { display: flex; gap: 10px; }
.volunteer-form input { padding: 8px; border-radius: 4px; border: 1px solid #ccc; }
.error { color: red; }
.success { color: green; }
</style>
