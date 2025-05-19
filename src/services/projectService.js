import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';

const projectsCollection = collection(db, 'projects');

export const projectService = {
  // Create a new project
  async createProject(projectData) {
    try {
      const docRef = await addDoc(projectsCollection, {
        ...projectData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        collaborators: 0,
        stars: 0
      });
      return { id: docRef.id, ...projectData };
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Get all projects
  async getAllProjects() {
    try {
      const querySnapshot = await getDocs(projectsCollection);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },

  // Get a single project by ID
  async getProjectById(projectId) {
    try {
      const docRef = doc(db, 'projects', projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting project:', error);
      throw error;
    }
  },

  // Update a project
  async updateProject(projectId, projectData) {
    try {
      const docRef = doc(db, 'projects', projectId);
      await updateDoc(docRef, {
        ...projectData,
        updatedAt: serverTimestamp()
      });
      return { id: projectId, ...projectData };
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete a project
  async deleteProject(projectId) {
    try {
      const docRef = doc(db, 'projects', projectId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Get projects by filters
  async getProjectsByFilters(filters) {
    try {
      let q = projectsCollection;
      
      if (filters.skillLevel) {
        q = query(q, where('skillLevel', '==', filters.skillLevel));
      }
      if (filters.language) {
        q = query(q, where('languages', 'array-contains', filters.language));
      }
      if (filters.tag) {
        q = query(q, where('tags', 'array-contains', filters.tag));
      }
      
      // Add sorting
      q = query(q, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting filtered projects:', error);
      throw error;
    }
  },

  // Toggle project interest
  async toggleProjectInterest(projectId, userId) {
    try {
      const docRef = doc(db, 'projects', projectId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const project = docSnap.data();
        const interestedUsers = project.interestedUsers || [];
        
        if (interestedUsers.includes(userId)) {
          // Remove interest
          await updateDoc(docRef, {
            interestedUsers: interestedUsers.filter(id => id !== userId)
          });
        } else {
          // Add interest
          await updateDoc(docRef, {
            interestedUsers: [...interestedUsers, userId]
          });
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error toggling project interest:', error);
      throw error;
    }
  }
}; 