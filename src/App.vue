<template>

<NavBar :nav-links="navLinks" />
<router-view :key="$route.path"></router-view>

  <Footer></Footer>

</template>


<script>
import { store } from "./stores/store";
import { supabase } from "./supabase/index";
import NavBar from "./components/NavBar.vue";
import Notes from "./components/Notes.vue";
import router from './router/index.js';
import Profile2 from "./components/Profile2.vue";
import Footer from "./components/Footer.vue";
import Auths3 from "./components/Auths3.vue";
import swal from 'sweetalert';



export default {
  components: {
    NavBar,
    Notes,
    Profile2,
    Footer,
    Auths3,
},

data: () => ({
  navLinks:[
    {
      text:'Home',
      path:"/",
    },
    {
      text:'Notes',
      path:'/notes',
    },
  ]
}),


  setup() {
    store.user = supabase.auth.user();
    supabase.auth.onAuthStateChange((_, session) => {
    store.user = session.user;
    });
    return {
      store,
    };
  },

  mounted(){
    //callData()
  },
};
</script>

<style>
  div {
    padding: 0;
    margin: 0;
  };

  template {
    padding: 0;
    margin: 0;
  }
</style>
