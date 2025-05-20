import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';
import './assets/styles/main.css';


// Import main page views
import Home from './views/Home.vue';
import Hackathons from './views/Hackathons.vue';
import Blog from './views/Blog.vue';
import About from './views/About.vue';

// Import auth views
import Login from './views/auth/Login.vue';
import Signup from './views/auth/Signup.vue';
import ForgotPassword from './views/auth/ForgotPassword.vue';

// Import project views
import Projects from './views/projects/Projects.vue';
import ProjectDetail from './views/projects/ProjectDetail.vue';
import CreateProject from './views/projects/CreateProject.vue';
import EditProject from './views/projects/EditProject.vue';

// Import profile views
import Profile from './views/profile/Profile.vue';
import EditProfile from './views/profile/EditProfile.vue';
import Portfolio from './views/profile/Portfolio.vue';

// Import community views
import Community from './views/community/Community.vue';
import Mentorship from './views/community/Mentorship.vue';

// hackathon views
import Applied from './views/projects/Applied.vue';

// Placeholder components for missing routes
const Faq = { template: '<div class="container"><h1>FAQ</h1><p>Frequently Asked Questions coming soon.</p></div>' };
const Terms = { template: '<div class="container"><h1>Terms of Service</h1><p>Terms content coming soon.</p></div>' };
const Privacy = { template: '<div class="container"><h1>Privacy Policy</h1><p>Privacy content coming soon.</p></div>' };
const CodeOfConduct = { template: '<div class="container"><h1>Code of Conduct</h1><p>Code of Conduct content coming soon.</p></div>' };

const routes = [
  { path: '/', component: Home },
  { path: '/hackathons', component: Hackathons },
  {path : '/applied', component: Applied},
  { path: '/blog', component: Blog },
  { path: '/about', component: About },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/projects', component: Projects },
  { path: '/projects/create', component: CreateProject },
  { path: '/projects/:id', component: ProjectDetail },
  { path: '/projects/:id/edit', component: EditProject },
  { path: '/profile/:username', component: Profile },
  { path: '/profile/:username/edit', component: EditProfile },
  { path: '/profile/:username/portfolio', component: Portfolio },
  { path: '/community', component: Community },
  { path: '/mentorship', component: Mentorship },
  { path: '/faq', component: Faq },
  { path: '/terms', component: Terms },
  { path: '/privacy', component: Privacy },
  { path: '/code-of-conduct', component: CodeOfConduct },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
