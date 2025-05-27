<template>
    <header>
        <nav class="navbar" :class="{active: showMenu}">
            <img src="../assets/logocheckme.png">
            <!--<a href="#" class="nav-branding">check.me</a>-->

            <ul class="nav-menu" :class="{active: showMenu}" @click="showMenu = !showMenu">
                <li class="nav-item" v-for="(link, index) in navLinks" :key="index">
                    <router-link :to='link.path'>{{link.text}}</router-link>
                </li>
                <li class="nav-item pointer" v-if="store.user"><a @click="LogInStore.signOut()">Sign Out</a></li>
            </ul>

            <div class="hamburguer" :class="{active: showMenu}" @click="showMenu = !showMenu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </nav>
    </header>
</template>

<script>
import { supabase } from "../supabase/index";
import { mapStores } from "pinia";
import useLogInStore from '../stores/LogIn';
import { store } from "../stores/store";
import router from "../router/index"
import { ref } from "vue";
import { isPlainObject } from "@vue/shared";

export default {
    name: "NavBar",
    data() {
        store.user = supabase.auth.user();
        supabase.auth.onAuthStateChange((_, session) => {
            store.user = session.user;
        });

        return {
            showMenu: false,
            store,
            navLinks: [
            {
                text: 'Home',
                path: "/",
            },
            {
                text: 'Notes',
                path: '/notes',
            },
        ]
        }
    },

    /*props: ['navLinks'],*/

    /*methods: {
        toggle() {
            this.showMenu = !this.showMenu;
        }
    },*/
    computed: {
        ...mapStores(useLogInStore),
    },
};
</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.pointer{
    cursor: pointer;
}

header {
    background-color: white;
}

li {
    list-style: none;
}

a {
    color: black;
    text-decoration: none;
}

.navbar {
    min-height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
}

.nav-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;
}

.nav-branding {
    font-size: 2rem;
}

.nav-link {
    transition: 0.7s ease;
}

.nav-link:hover {
    color: orangered
}

.hamburger {
    visibility: hidden;
}


.bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: black;
}

@media(min-width: 1px) {
    .hamburger {
        display: block;
        visibility: initial;
    }

    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        gap: 0;
        flex-direction: column;
        background-color: white;
        width: 100%;
        text-align: center;
        transition: 0.3s;
    }

    .nav-item {
        margin: 16px 0;
    }

    .nav-menu.active {
        left: 0;
    }

    .navbar.active {
        margin-bottom: 6rem !important;
    }

    .hide {
        display: none;
    }
}
</style>