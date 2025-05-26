<template>
  <nav>
    <router-link to="/">Inicio</router-link>
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
    <router-link v-if="isLoggedIn" to="/dashboard">Mis Tableros</router-link>
    <button v-if="isLoggedIn" @click="logout">Salir</button>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
const auth = useAuthStore();
const isLoggedIn = computed(() => auth.user !== null);

function logout() {
  auth.logout();
}
</script>
