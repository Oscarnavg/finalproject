
import { createRouter, createWebHistory } from 'vue-router';
import Notes from '../views/Notes.vue'
import Login from '../views/LogIn.vue'
import Profile from '../views/Profile.vue'

 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  }
];
 
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});
 
export default router;

