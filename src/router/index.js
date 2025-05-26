import App from "../App.vue"
import { createRouter, createWebHistory } from 'vue-router';
import Notes from '../views/Notes.vue'
import Auths3 from '../views/LogIn.vue'
import Profile from '../views/Profile.vue'
 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Auths3
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

