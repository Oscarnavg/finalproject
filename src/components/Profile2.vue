<template>
  <div
    class="bg-dark bg-gradient text-center shadow-1-strong rounded text-white"
  >
    <div class="d-flex col-md-6 mx-auto"></div>

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
                <h2 class="fw-bold mb-4">Profile</h2>
                <p class="mb-5 fw-bold text-warning">"Good Tasks Only"</p>

                <form class="form-widget" @submit.prevent="LogInStore.updateProfile">
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
                      placeholder="name@example.com"
                      class="form-control"
                      id="email"
                      :value="LogInStore.user.email"
                      disabled
                    />
                    <label class="form-label" for="form1Example3"
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
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div
            class="bg-img bg-image w-50 image rounded-4 shadow-4 col-lg-6 mb-5 mb-lg-0 align-items-center justify-content-center"
            style="
              background-image: url('https://images.pexels.com/photos/7582013/pexels-photo-7582013.jpeg');
              height: 100vh;
              width: 100vh;
              background-size: auto 100%;
              background-repeat: no-repeat;
            "
          >
          <div class="bd-highlight d-flex flex-column">
                <div class="d-flex justify-content-end mt-4">
                <img
                  src="/src/assets/logocheckme.png"
                  alt="CheckMe logo"
                  class="h-25 mb-4"
                />
                </div>
                <h1 class="fw-bold bd-highlight text-black text-center m-4">
                  Bringing a true feeling<br />
                  to your every day tasks.
                </h1>
                <h4 class="text-left fw-bold text-left text-center m-5">
                  Check.me organize your tasks <br />
                  in one easy to use app.
                </h4>
              </div>
          </div>
        </div>
      </div>
      <!-- Jumbotron -->
    </section>
  </div>
</template>

<script>
import { store } from "../stores/store";
import { onMounted, ref } from "vue";
import { onUpdated } from "vue";
import { mapStores } from "pinia";
import useLogInStore from "../stores/LogIn";

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

<style>
@media (max-width: 1010px) {
  .image {
    display: none;
    visibility: hidden;
  }
}
</style>
