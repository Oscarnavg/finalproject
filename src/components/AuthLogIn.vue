<template>
  <div class="background">
    <section class="auth-section">
      <div class="auth-container">
        <div class="form-section">
          <div class="glass-card">
            <div class="card-body">
              <h2 class="title">Sign in</h2>
              <p class="subtitle">
                "Put yourself at the top of your <br />
                To Do List"
              </p>

              <form @submit.prevent="handleLogin">
                <div class="form-group">
                  <input
                    type="email"
                    id="email"
                    class="form-input"
                    placeholder="name@example.com"
                    v-model="email"
                  />
                  <label class="form-label" for="email">Email address</label>
                </div>

                <button
                  type="submit"
                  class="submit-button"
                  :value="loading ? 'Loading' : 'Send magic link'"
                  :disabled="loading"
                >
                  Send magic link
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="image-section">
          <div class="image-content">
            <div class="logo-container">
              <img src="/src/assets/logocheckme.png" alt="CheckMe logo" class="logo" />
            </div>
            <h1 class="headline">
              Bringing a true feeling<br />
              to your every day tasks.
            </h1>
            <h4 class="description">
              TriNotes organize your tasks <br />
              in one easy-to-use app.
            </h4>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";

export default {
  setup() {
    const loading = ref(false);
    const email = ref("");

    const handleLogin = async () => {
      try {
        loading.value = true;
        const { error } = await supabase.auth.signIn({ email: email.value });
        if (error) throw error;
        swal("", "Check your email for the login link!", "success");
      } catch (error) {
        swal(error.error_description || error.message);
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      email,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* Layout base */
.background {
  background-color: #1c1c1e;
  color: white;
  padding: 2rem;
}

.auth-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Form section */
.form-section {
  flex: 1 1 500px;
  display: flex;
  justify-content: center;
}

.glass-card {
  background: hsla(0, 0%, 100%, 0.55);
  backdrop-filter: blur(30px);
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  height: 480px;
}

.card-body {
  text-align: center;
}

.title {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-weight: bold;
  color: #ffc107;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}

.form-label {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

/* Submit button */
.submit-button {
  background-color: #ffc107;
  color: black;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.submit-button:disabled {
  background-color: #e0a800;
  cursor: not-allowed;
}

/* Image section */
.image-section {
  flex: 1 1 500px;
  background-image: url("/src/assets/unnamed.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
  height: 100vh;
  max-height: 700px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: black;
}

.logo-container {
  background-color: white;
  border-radius: 50%;
  padding: 5px;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 100px;
  height: auto;
}

.headline {
  font-weight: bold;
  margin: 2rem 0 1rem;
  font-size: 1.5rem;
  color: white;
}

.description {
  font-weight: bold;
  margin: 1rem 0;
  font-size: 1.2rem;
  color: white;
}

/* Responsive */
@media (max-width: 1010px) {
  .image-section {
    display: none;
    visibility: hidden;
  }
}
</style>
