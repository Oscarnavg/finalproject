<template>

<GlobalNavbar :nav-links="navLinks" />
<router-view :key="$route.path"></router-view>
<GlobalFooter></GlobalFooter>

</template>


<script>
import { store } from "./stores/store";
import { supabase } from "./supabase/index";
import GlobalNavbar from "./components/GlobalNavbar.vue";
import NotesApp from "./components/NotesApp.vue";
import router from './router/index.js';
import ProfileLog from "./components/ProfileLog.vue";
import GlobalFooter from "./components/GlobalFooter.vue";
import AuthLogIn from "./components/AuthLogIn.vue";
import swal from 'sweetalert';


export default {
  components: {
    GlobalNavbar,
    ProfileLog,
    NotesApp,
    GlobalFooter,
    AuthLogIn,
    
},

data: () => ({
  navLinks:[
    {
      text:'Home',
      path:"/",
    },
    {
      text:'NotesApp',
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
