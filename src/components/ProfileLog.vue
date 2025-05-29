<template>
  <div class="profile-background">
    <section class="profile-section">
      <div class="profile-container">
        <!-- Form section -->
        <div class="form-wrapper">
          <div class="glass-card">
            <div class="card-body">
              <h2 class="title">Profile</h2>
              <p class="subtitle">"Good Tasks Only"</p>

              <form class="form-widget" @submit.prevent="LogInStore.updateProfile">
                <div class="form-row">
                  <div class="form-column">
                    <input
                      type="text"
                      id="firstName"
                      v-model="LogInStore.username"
                      class="form-input"
                    />
                    <label class="form-label" for="firstName">First name</label>
                  </div>
                  <div class="form-column">
                    <input
                      type="text"
                      id="lastName"
                      v-model="LogInStore.website"
                      class="form-input"
                    />
                    <label class="form-label" for="lastName">Last name</label>
                  </div>
                </div>

                <div class="form-group">
                  <input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    class="form-input"
                    :value="LogInStore.user.email"
                    disabled
                  />
                  <label class="form-label" for="email">Email address</label>
                </div>

                <button
                  type="submit"
                  class="submit-button"
                  :disabled="LogInStore.loading"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Image section -->
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
import { mapStores } from "pinia";
import useLogInStore from "../stores/Login";

export default {
  name: "Profile",

  computed: {
    ...mapStores(useLogInStore),
  },

  mounted() {
    this.LogInStore.getProfile();
  },
};
</script>

<style scoped>
/* General layout */
.profile-background {
  background-color: #1c1c1e;
  color: white;
  padding: 2rem;
}

.profile-section {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
}

.profile-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Form section */
.form-wrapper {
  flex: 1 1 500px;
  display: flex;
  justify-content: center;
}

.glass-card {
  background: hsla(0, 0%, 100%, 0.55);
  backdrop-filter: blur(30px);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
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

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-input {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 100%;
}

.form-label {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: left;
}

/* Submit button */
.submit-button {
  background-color: #ffc107;
  color: black;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
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
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: white
}

.description {
  font-weight: bold;
  font-size: 1.2rem;
  margin: 1rem 0;
  color: white;
}

/* Responsive */
@media (max-width: 1010px) {
  .image-section {
    display: none;
    visibility: hidden;
  }

  .form-row {
    flex-direction: column;
  }
}
</style>
