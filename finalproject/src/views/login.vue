<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'

const email = ref('')
const password = ref('')
const auth = useAuthStore()

async function handleLogin() {
  try {
    await auth.login(email.value, password.value)
    alert('Login correcto')
  } catch (e) {
    alert('Error en login: ' + e.message)
  }
}
</script>
