<template>
  <div>
    <h1 class="fw-bold bd-highlight text-black">
      Put yourself <br />
      at the top of your <br />
      To Do List
    </h1>
    <p>

    </p>
    <!-- Background -->
    <div
      class="bg-dark bg-gradient text-center shadow-1-strong rounded text-white"
    >
      <div class="d-flex col-md-6 mx-auto mt-5"></div>

      <!-- Section: Design Block 1 -->
      <section class="text-center text-lg-start p-5 mt-5">
        <!-- Jumbotron -->
        <div class="container py-4 mt-5">
          <div class="row g-0 align-items-center">
            <div class="col-lg-6 mb-5 mb-lg-0">
              <div
                class="card cascading-right"
                style="
                  background: hsla(0, 0%, 100%, 0.55);
                  backdrop-filter: blur(30px);
                "
              >
                <div class="card-body p-5 shadow-5 text-center">
                  <h2 class="fw-bold mb-4">Log up</h2>
                  <p class="mb-5 fw-bold text-warning">"Good Tasks Only"</p>

                  <form @submit.prevent="LogInStore.handleLogin">
                    <!-- First and last names: 2 column grid layout with text inputs -->
                    <div class="row">
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <input
                            type="text"
                            id="form1Example1"
                            class="form-control"
                            v-model="LogInStore.username"
                          />
                          <label class="form-label" for="form1Example1"
                            >First name</label
                          >
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <input
                            type="text"
                            id="form1Example2"
                            class="form-control"
                            v-model="LogInStore.website"
                          />
                          <label class="form-label" for="form1Example2"
                            >Last name</label
                          >
                        </div>
                      </div>
                    </div>

                    <!-- Email input -->
                    <div class="form-outline mb-4">
                      <input
                        type="email"
                        id="form1Example3"
                        class="form-control"
                        placeholder="name@example.com"
                        v-model="LogInStore.email"
                      />
                      <label class="form-label" for="form1Example3"
                        >Email address</label
                      >
                    </div>

                    <!-- Submit button -->
                    <button
                      type="submit"
                      class="btn btn-warning btn-block mb-4"
                      :value="loading ? 'Loading' : 'Send magic link'"
                      :disabled="loading"
                    >
                      Log up
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div
              class="bg-img bg-image w-50 rounded-4 shadow-4 col-lg-6 mb-5 mb-lg-0 d-flex align-items-center justify-content-center"
              style="
                background-image: url('https://images.pexels.com/photos/7582013/pexels-photo-7582013.jpeg');
                height: 100vh;
                background-size: auto 100%;
                background-repeat: no-repeat;
              "
            >
              <div class="p-2 bd-highlight text-center">
                <h2>Welcome Back!</h2>
                <button>Login</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Jumbotron -->
      </section>
      <!-- Section: Design Block 1 -->

      <!-- Section: Design Block 2 -->
      <section class="text-center text-lg-start">
        <!-- Jumbotron -->
        <div class="container py-4">
          <div class="row g-0 align-items-center">
            <div
              class="bg-image w-50 rounded-4 shadow-4 col-lg-6 mb-5 mb-lg-0 d-flex align-items-center justify-content-center"
              style="
                background-image: url('https://images.pexels.com/photos/7582013/pexels-photo-7582013.jpeg');
                height: 100vh;
                background-size: auto 100%;
                background-repeat: no-repeat;
              "
            >
              <div class="p-2 bd-highlight text-center">
                <h2>Create Account</h2>

                <button>Logup</button>
              </div>
            </div>
            <div class="col-lg-6 mb-5 mb-lg-0">
              <div
                class="card cascading-left"
                style="
                  background: hsla(0, 0%, 100%, 0.55);
                  backdrop-filter: blur(30px);
                "
              >
                <div class="card-body p-5 shadow-5 text-center">
                  <h2 class="fw-bold mb-4">Log in</h2>
                  <p class="mb-5 fw-bold text-warning">"DO <del>UBT</del>"</p>

                  <form @submit.prevent="LogInStore.handleLogin()">
                    <!-- Email input -->
                    <div class="form-outline mb-4">
                      <input
                        type="email"
                        id="form1Example4"
                        class="form-control"
                        placeholder="name@example.com"
                        v-model="LogInStore.email"
                      />
                      <label class="form-label" for="form1Example4"
                        >Email address</label
                      >
                    </div>

                    <!-- Submit button -->
                    <button
                      type="submit"
                      class="btn btn-warning btn-block mb-4"
                      :value="LogInStore.loading ? 'Loading' : 'Send magic link'"
                      :disabled="LogInStore.loading"
                    >
                      Send magic link
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Jumbotron -->
      </section>
      <!-- Section: Design Block 2 -->
    </div>
    <!-- Background -->
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";
import { mapStores } from "pinia";
import useLogInStore from "../stores/LogIn";

export default {
  name: "ToDoList",

  computed: {
    ...mapStores(useLogInStore),
  },

  mounted() {
    this.ListStore.CallData();
  },
};
</script>

<style>
body {
  min-height: 0;
}

div {
  padding: 0;
  margin: 0;
}

template {
  padding: 0;
  margin: 0;
}

.cascading-right {
  margin-right: -50px;
}

.cascading-left {
  margin-left: -50px;
}

@media (max-width: 991.98px) {
  .cascading-right {
    margin-right: 0;
  }
}
</style>
