<template>
    <Profile2 v-if="store.user"></Profile2>
    <Auths3 v-else></Auths3>
</template>
  
<script>
import { store } from "../stores/store";
import Auths3 from "../components/Auths3.vue";
import Profile2 from "../components/Profile2.vue";
import { supabase } from "../supabase/index";

export default {
    components: {
        Auths3,
        Profile2,
    },
    setup() {
        store.user = supabase.auth.user();
        supabase.auth.onAuthStateChange((_, session) => {
            store.user = session.user;
        });
        return {
            store,
        };
    },

}
</script>
  
<style>

</style>