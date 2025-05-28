<template>
    <ProfileLog v-if="store.user"></ProfileLog>
    <AuthLogin v-else></AuthLogin>
</template>
  
<script>
import { store } from "../stores/store";
import AuthLogin from "../components/AuthLogIn.vue";
import ProfileLog from "../components/ProfileLog.vue";
import { supabase } from "../supabase/index";


export default {
    components: {
        AuthLogin,
        ProfileLog,
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