<template>
  <div>
    <!-- Background -->
    <div
      class="bg-dark bg-gradient text-center shadow-1-strong rounded text-white"
    >
      <div class="d-flex col-md-6 mx-auto"></div>

      <!-- Section: Design Block 1 -->
      <section class="text-center text-lg-start p-3">
        <!-- Jumbotron -->
        <div class="container py-4">
          <div class="row g-0 align-items-center justify-content-center">
            <div class="col-lg-6 mb-5 mb-lg-0">
              <div
                class="card cascading-right"
                style="
                  background: hsla(0, 0%, 100%, 0.55);
                  backdrop-filter: blur(30px);
                "
              >
                <div class="card-body p-5 shadow-5 text-center">
                  <h2 class="fw-bold mb-4">Sign in</h2>
                  <p class="mb-5 fw-bold text-warning">
                    "Put yourself at the top of your <br />
                    To Do List"
                  </p>

                  <form @submit.prevent="handleLogin">
                    <!-- Email input -->
                    <div class="form-outline mb-4">
                      <input
                        type="email"
                        id="form1Example4"
                        class="form-control"
                        placeholder="name@example.com"
                        v-model="email"
                      />
                      <label class="form-label" for="form1Example4"
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
                      Send magic link
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div
              class="
                bg-img bg-image
                w-50
                rounded-4
                shadow-4
                col-lg-6
                mb-5 mb-lg-0
                image
                align-items-center
                justify-content-center
              "
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
      <!-- Section: Design Block 1 -->
    </div>
    <!-- Background -->
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
        swal("","Check your email for the login link!", "success");
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

<style>
/*body {
  min-height: 0;
}

div {
  padding: 0;
  margin: 0;
}

template {
  padding: 0;
  margin: 0;
}*/
@media (max-width: 1010px) {
  .image {
    display: none;
    visibility: hidden;
  }
}

.cascading-right {
  margin-right: -50px;
}

@media (max-width: 991.98px) {
  .cascading-right {
    margin-right: 0;
  }
}
</style>
