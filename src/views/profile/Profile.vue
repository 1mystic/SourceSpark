<template>
  <div class="profile-page">
    <section class="profile-header">
      <div class="container">
        <div class="profile-summary">
          <div class="profile-avatar">
            <img v-if="user.photoURL" :src="user.photoURL" :alt="user.displayName">
            <DefaultAvatar v-else :size="150" />
            <button class="edit-avatar-btn" @click="updateAvatar">
              <i class="fas fa-camera"></i>
            </button>
          </div>
          <div class="profile-info">
            <h1>{{ user.displayName || 'Anonymous User' }}</h1>
            <p class="profile-title">{{ user.title || 'No title set' }}</p>
            <div class="profile-stats">
              <div class="stat">
                <span class="stat-value">{{ stats.projects }}</span>
                <span class="stat-label">Projects</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ stats.contributions }}</span>
                <span class="stat-label">Contributions</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ stats.followers }}</span>
                <span class="stat-label">Followers</span>
              </div>
            </div>
            <div class="profile-actions">
              <button class="btn btn-primary" @click="openEditModal">
                <i class="fas fa-edit"></i> Edit Profile
              </button>
              <button class="btn btn-outline" @click="shareProfile">
                <i class="fas fa-share-alt"></i> Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="profile-content">
      <div class="container">
        <div class="content-tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            class="tab-btn"
            :class="{ active: currentTab === tab.id }"
            @click="setTab(tab.id)"
          >
            <i :class="tab.icon"></i>
            {{ tab.name }}
          </button>
        </div>

        <div class="tab-content">
          <!-- Projects Tab -->
          <div v-if="currentTab === 'projects'" class="projects-tab">
            <div class="section-header">
              <h2>My Projects</h2>
              <button class="btn btn-primary" @click="createProject">
                <i class="fas fa-plus"></i> New Project
              </button>
            </div>
            <div class="projects-grid">
              <div v-for="project in userProjects" :key="project.id" class="project-card">
                <div class="project-header">
                  <h3>{{ project.title }}</h3>
                  <span class="project-status" :class="project.status">{{ project.status }}</span>
                </div>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-stats">
                  <div class="stat">
                    <i class="fas fa-star"></i>
                    <span>{{ project.stars }}</span>
                  </div>
                  <div class="stat">
                    <i class="fas fa-code-branch"></i>
                    <span>{{ project.forks }}</span>
                  </div>
                  <div class="stat">
                    <i class="fas fa-eye"></i>
                    <span>{{ project.views }}</span>
                  </div>
                </div>
                <div class="project-actions">
                 
                  <button class="btn btn-outline" @click="viewProject(project)">
                    <i class="fas fa-external-link-alt"></i> View
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Hackathons Tab -->
          <div v-if="currentTab === 'hackathons'" class="hackathons-tab">
            <div class="section-header">
              <h2>My Hackathons</h2>
              <button class="btn btn-primary" @click="joinHackathon">
                <i class="fas fa-plus"></i> Join Hackathon
              </button>
            </div>
            <div class="hackathons-grid">
              <div v-for="hackathon in userHackathons" :key="hackathon.id" class="hackathon-card">
                <div class="hackathon-header">
                  <h3>{{ hackathon.name }}</h3>
                  <span class="hackathon-status" :class="hackathon.status">{{ hackathon.status }}</span>
                </div>
                <p class="hackathon-description">{{ hackathon.description }}</p>
                <div class="hackathon-meta">
                  <div class="meta-item">
                    <i class="far fa-calendar-alt"></i>
                    <span>{{ hackathon.date }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-users"></i>
                    <span>{{ hackathon.team }}</span>
                  </div>
                </div>
                <div class="hackathon-actions">
                  <button class="btn btn-outline" @click="viewHackathon(hackathon)">
                    <i class="fas fa-external-link-alt"></i> View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Bookmarks Tab -->
          <div v-if="currentTab === 'bookmarks'" class="bookmarks-tab">
            <div class="section-header">
              <h2>Saved Items</h2>
              <div class="bookmark-filters">
                <button 
                  v-for="filter in bookmarkFilters" 
                  :key="filter.id"
                  class="filter-btn"
                  :class="{ active: currentBookmarkFilter === filter.id }"
                  @click="setBookmarkFilter(filter.id)"
                >
                  {{ filter.name }}
                </button>
              </div>
            </div>
            <div class="bookmarks-grid">
              <div v-for="bookmark in filteredBookmarks" :key="bookmark.id" class="bookmark-card">
                <div class="bookmark-type">
                  <i :class="bookmark.icon"></i>
                  {{ bookmark.type }}
                </div>
                <h3>{{ bookmark.title }}</h3>
                <p>{{ bookmark.description }}</p>
                <div class="bookmark-actions">
                  <button class="btn btn-outline" @click="viewBookmark(bookmark)">
                    <i class="fas fa-external-link-alt"></i> View
                  </button>
                  <button class="btn btn-outline" @click="removeBookmark(bookmark)">
                    <i class="fas fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Tab -->
          <div v-if="currentTab === 'settings'" class="settings-tab">
            <div class="settings-section">
              <h2>Account Settings</h2>
              <div class="settings-form">
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input type="email" id="email" v-model="settings.email">
                </div>
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" id="username" v-model="settings.username">
                </div>
                <div class="form-group">
                  <label for="bio">Bio</label>
                  <textarea id="bio" v-model="settings.bio" rows="4"></textarea>
                </div>
                <button class="btn btn-primary" @click="saveSettings">Save Changes</button>
              </div>
            </div>

            <div class="settings-section">
              <h2>Notification Settings</h2>
              <div class="settings-form">
                <div class="form-group checkbox">
                  <input type="checkbox" id="email-notifications" v-model="settings.notifications.email">
                  <label for="email-notifications">Email Notifications</label>
                </div>
                <div class="form-group checkbox">
                  <input type="checkbox" id="project-updates" v-model="settings.notifications.projectUpdates">
                  <label for="project-updates">Project Updates</label>
                </div>
                <div class="form-group checkbox">
                  <input type="checkbox" id="hackathon-alerts" v-model="settings.notifications.hackathonAlerts">
                  <label for="hackathon-alerts">Hackathon Alerts</label>
                </div>
              </div>
            </div>

            <div class="settings-section">
              <h2>Danger Zone</h2>
              <div class="danger-zone">
                <button class="btn btn-danger" @click="deleteAccount">
                  <i class="fas fa-trash"></i> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Edit Profile Modal -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Edit Profile</h2>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="displayName">Display Name</label>
            <input 
              id="displayName"
              v-model="profileForm.displayName"
              type="text"
              required
              placeholder="Enter your display name"
            >
          </div>
          
          <div class="form-group">
            <label for="title">Title</label>
            <input 
              id="title"
              v-model="profileForm.title"
              type="text"
              placeholder="Enter your professional title"
            >
          </div>
          
          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea 
              id="bio"
              v-model="profileForm.bio"
              rows="4"
              placeholder="Tell us about yourself"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="github">GitHub Profile</label>
            <input 
              id="github"
              v-model="profileForm.github"
              type="url"
              placeholder="Enter your GitHub profile URL"
            >
          </div>
          
          <div class="form-group">
            <label for="linkedin">LinkedIn Profile</label>
            <input 
              id="linkedin"
              v-model="profileForm.linkedin"
              type="url"
              placeholder="Enter your LinkedIn profile URL"
            >
          </div>
          
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" @click="closeEditModal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../../firebase';
import { doc, getDoc, query, collection, where, getDocs, updateDoc } from 'firebase/firestore';
import DefaultAvatar from '../../components/DefaultAvatar.vue';

export default {
  name: 'Profile',
  components: {
    DefaultAvatar
  },
  data() {
    return {
      currentTab: 'projects',
      currentBookmarkFilter: 'all',
      user: null,
      stats: {
        projects: 0,
        contributions: 0,
        followers: 0
      },
      showEditModal: false,
      profileForm: {
        displayName: '',
        title: '',
        bio: '',
        github: '',
        linkedin: ''
      },
      userProjects: [],
      tabs: [
        { id: 'projects', name: 'Projects', icon: 'fas fa-code' },
        { id: 'hackathons', name: 'Hackathons', icon: 'fas fa-trophy' },
        { id: 'bookmarks', name: 'Bookmarks', icon: 'fas fa-bookmark' },
        { id: 'settings', name: 'Settings', icon: 'fas fa-cog' }
      ],
      bookmarkFilters: [
        { id: 'all', name: 'All' },
        { id: 'projects', name: 'Projects' },
        { id: 'hackathons', name: 'Hackathons' },
        { id: 'mentors', name: 'Mentors' }
      ],
      userHackathons: [
        {
          id: 1,
          name: 'Global Code Challenge',
          description: 'Building innovative solutions for sustainability.',
          status: 'active',
          date: 'Oct 15-31, 2024',
          team: 'Team Innovators'
        }
        // Add more hackathons
      ],
      bookmarks: [
        {
          id: 1,
          type: 'Project',
          title: 'React Component Library',
          description: 'A collection of reusable React components.',
          icon: 'fas fa-code'
        }
        // Add more bookmarks
      ],
      settings: {
        email: 'john@example.com',
        username: 'johndoe',
        bio: 'Passionate about open source and web development.',
        notifications: {
          email: true,
          projectUpdates: true,
          hackathonAlerts: false
        }
      }
    };
  },
  computed: {
    filteredBookmarks() {
      if (this.currentBookmarkFilter === 'all') {
        return this.bookmarks;
      }
      return this.bookmarks.filter(bookmark => 
        bookmark.type.toLowerCase() === this.currentBookmarkFilter
      );
    }
  },
  methods: {
    async fetchUserData() {
      try {
        const userId = auth.currentUser.uid;
        const userDoc = await getDoc(doc(db, 'users', userId));
        
        if (userDoc.exists()) {
          this.user = {
            ...auth.currentUser,
            ...userDoc.data()
          };
          this.profileForm = {
            displayName: this.user.displayName || '',
            title: this.user.title || '',
            bio: this.user.bio || '',
            github: this.user.github || '',
            linkedin: this.user.linkedin || ''
          };
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async fetchStats() {
      try {
        const userId = auth.currentUser.uid;
        
        // Fetch created projects
        const projectsQuery = query(
          collection(db, 'projects'),
          where('createdBy', '==', userId)
        );
        const projectsSnapshot = await getDocs(projectsQuery);
        this.stats.projects = projectsSnapshot.size;
        
        // Fetch projects where user is interested (contributions)
        const contributionsQuery = query(
          collection(db, 'projects'),
          where('interestedUsers', 'array-contains', userId)
        );
        const contributionsSnapshot = await getDocs(contributionsQuery);
        this.stats.contributions = contributionsSnapshot.size;
        
        // Fetch followers (users who have shown interest in user's projects)
        const followersQuery = query(
          collection(db, 'users'),
          where('following', 'array-contains', userId)
        );
        const followersSnapshot = await getDocs(followersQuery);
        this.stats.followers = followersSnapshot.size;
        
        // Fetch user's projects
        this.userProjects = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    },
    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    async updateProfile() {
      try {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, 'users', userId);
        
        await updateDoc(userRef, {
          displayName: this.profileForm.displayName,
          title: this.profileForm.title,
          bio: this.profileForm.bio,
          github: this.profileForm.github,
          linkedin: this.profileForm.linkedin,
          updatedAt: new Date()
        });
        
        await this.fetchUserData();
        this.closeEditModal();
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
    setTab(tabId) {
      this.currentTab = tabId;
    },
    setBookmarkFilter(filterId) {
      this.currentBookmarkFilter = filterId;
    },
    updateAvatar() {
      // Implement avatar update logic
      console.log('Updating avatar');
    },
    editProfile() {
      // Implement profile edit logic
      console.log('Editing profile');
    },
    shareProfile() {
      // Implement profile sharing logic
      console.log('Sharing profile');
    },
    createProject() {
      // Implement project creation logic
      console.log('Creating new project');
    },
    editProject(project) {
      // Implement project edit logic
      console.log('Editing project:', project.name);
    },
    viewProject(project) {
      this.$router.push(`/projects/${project.id}`);
    },
    joinHackathon() {
      // Implement hackathon join logic
      console.log('Joining hackathon');
    },
    viewHackathon(hackathon) {
      // Implement hackathon view logic
      console.log('Viewing hackathon:', hackathon.name);
    },
    viewBookmark(bookmark) {
      // Implement bookmark view logic
      console.log('Viewing bookmark:', bookmark.title);
    },
    removeBookmark(bookmark) {
      // Implement bookmark removal logic
      console.log('Removing bookmark:', bookmark.title);
    },
    saveSettings() {
      // Implement settings save logic
      console.log('Saving settings:', this.settings);
    },
    deleteAccount() {
      // Implement account deletion logic
      console.log('Deleting account');
    }
  },
  async created() {
    await this.fetchUserData();
    await this.fetchStats();
  }
};
</script>

<style scoped>
.profile-page {
  padding: var(--spacing-2xl) 0;
}

.profile-header {
  background-color: var(--light-bg);
  padding: var(--spacing-2xl) 0;
  margin-bottom: var(--spacing-2xl);
}

.profile-summary {
  display: flex;
  gap: var(--spacing-2xl);
  align-items: center;
}

.profile-avatar {
  position: relative;
  width: 150px;
  height: 150px;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.edit-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition-normal);
}

.edit-avatar-btn:hover {
  background-color: var(--primary-dark);
}

.profile-info {
  flex: 1;
}

.profile-info h1 {
  font-size: var(--font-size-2xl);
  margin: 0 0 var(--spacing-xs);
}

.profile-title {
  color: var(--text-muted);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
}

.profile-stats {
  display: flex;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-dark);
}

.stat-label {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.profile-actions {
  display: flex;
  gap: var(--spacing-md);
}

.content-tabs {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  border-bottom: 2px solid var(--border-color);
  padding-bottom: var(--spacing-md);
}

.tab-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  background: none;
  color: var(--text-muted);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: color var(--transition-normal);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.tab-btn:hover {
  color: var(--primary);
}

.tab-btn.active {
  color: var(--primary);
  font-weight: 600;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.projects-grid,
.hackathons-grid,
.bookmarks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.project-card,
.hackathon-card,
.bookmark-card {
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.project-card:hover,
.hackathon-card:hover,
.bookmark-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.project-header,
.hackathon-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.project-status,
.hackathon-status {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.project-status.active,
.hackathon-status.active {
  background-color: var(--success);
  color: var(--white);
}

.project-description,
.hackathon-description {
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.project-stats {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.project-stats .stat {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-muted);
}

.project-actions,
.hackathon-actions,
.bookmark-actions {
  display: flex;
  gap: var(--spacing-md);
}

.bookmark-filters {
  display: flex;
  gap: var(--spacing-sm);
}

.filter-btn {
  padding: var(--spacing-xs) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-full);
  background: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-btn.active {
  background-color: var(--primary);
  border-color: var(--primary);
  color: var(--white);
}

.bookmark-type {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--primary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.settings-section {
  margin-bottom: var(--spacing-2xl);
}

.settings-form {
  max-width: 600px;
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--text-dark);
  font-weight: 500;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
}

.form-group.checkbox {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.form-group.checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.danger-zone {
  padding: var(--spacing-xl);
  background-color: var(--light-bg);
  border-radius: var(--radius-lg);
  text-align: center;
}

.btn-danger {
  background-color: var(--danger);
  color: var(--white);
}

.btn-danger:hover {
  background-color: var(--danger-dark);
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
.form-group textarea {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px var(--primary-light);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.project-card {
  background: var(--white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}

.project-actions {
  display: flex;
  justify-content: flex-start;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

@media (max-width: 768px) {
  .profile-summary {
    flex-direction: column;
    text-align: center;
  }

  .profile-stats {
    justify-content: center;
  }

  .profile-actions {
    justify-content: center;
  }

  .content-tabs {
    overflow-x: auto;
    padding-bottom: var(--spacing-sm);
  }

  .tab-btn {
    white-space: nowrap;
  }

  .section-header {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }

  .bookmark-filters {
    justify-content: center;
    flex-wrap: wrap;
  }

  .project-actions,
  .hackathon-actions,
  .bookmark-actions {
    flex-direction: column;
  }

  .modal-content {
    margin: var(--spacing-md);
  }
  
  .project-actions {
    flex-direction: column;
  }
}
</style>
