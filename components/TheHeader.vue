<template>
  <header>
    <nav class="z-50" :class="{'scrolled': !view.atTopOfPage}">

      <div class="items-center justify-between bg-white hidden px-5 md:flex md:pt-3 lg:py-5">

        <div class="flex-none pr-2">
          <nuxt-link to="/">
            <h1 class="font-bold text-2xl text-anthrazit px-4 hover:text-primary">Unicircle</h1>
          </nuxt-link>
        </div>

        <div v-if="$route.path !== '/catalog/newlisting'" class="hidden lg:flex w-6/12 justify-between">

          <div class="flex justify-end w-2/6 text-anthrazit font-bold">
            <nuxt-link class="rounded-full block hover:text-white hover:bg-primary px-4 py-2 mr-2" to="/catalog">
              Katalog
            </nuxt-link>
          </div>

          <div class="w-4/6">
            <app-search-bar></app-search-bar>
          </div>

        </div>
        <div class="relative flex lg:px-6 hidden md:inline-flex">

          <div class="text-anthrazit font-bold">
            <a href="#" class="whitespace-no-wrap hover:text-white rounded-full block hover:bg-primary px-4 py-2">
              Über uns
            </a>
          </div>

          <div v-if="$auth.loggedIn">
            <app-notification-dropdown></app-notification-dropdown>
          </div>

          <div class="text-anthrazit font-bold">

            <a v-if="$auth.loggedIn" @click="TOGGLE_PROFILE_DROPDOWN()" href="#"
               class="flex rounded-full shadow block hover:bg-primary px-3 py-2 lg:ml-3">
              <img class="h-6 w-6 mr-3 rounded-full border-black" :src="$auth.user.picture" alt="profile-picture">{{$auth.user.given_name}}
            </a>
            <a v-else @click="login()" href="#" class="rounded-full shadow block hover:bg-primary px-4 py-2 lg:ml-3">
              Einloggen
            </a>

            <app-profile-dropdown v-if="isProfileDropDownActivated && $auth.loggedIn"></app-profile-dropdown>

          </div>
        </div>
      </div>

      <div v-if="$route.path !== '/catalog/newlisting'" class="bg-white px-5 sm:flex py-5 md:py-3 lg:py-5  lg:hidden">
        <div class="hidden sm:inline-block text-anthrazit font-bold sm:w-1/6">
          <a href="#" class="rounded-full block hover:text-white hover:bg-primary px-4 py-2 mr-2">
            Katalog
          </a>
        </div>

        <div class="sm:w-5/6">
          <app-search-bar></app-search-bar>
        </div>
      </div>

    </nav>
  </header>
</template>

<script>
  import ProfileDropdown from "./ProfileDropdown";
  import { mapGetters, mapMutations } from "vuex";
  import SearchBar from "./Navigation/SearchBar";
  import NotificationDropdown from "./Navigation/NotificationDropdown";

  export default {
    components: {
      appProfileDropdown: ProfileDropdown,
      appSearchBar: SearchBar,
      appNotificationDropdown: NotificationDropdown,
    },
    data() {
      return {
        view: {
          atTopOfPage: true,
        }
      }
    },
    beforeMount() {
      window.addEventListener('scroll', this.handleScroll);
    },
    computed: {
      ...mapGetters(["isProfileDropDownActivated"])
    },
    methods: {
      ...mapMutations(["TOGGLE_PROFILE_DROPDOWN","CLOSE_PROFILE_DROPDOWN"]),
      handleScroll() {
        if (window.pageYOffset > 0) {
          // user is scrolled
          if (this.view.atTopOfPage) this.view.atTopOfPage = false
        } else {
          // user is at top of page
          if (!this.view.atTopOfPage) this.view.atTopOfPage = true
        }
      },
      login() {
        this.$auth.loginWith('auth0');
      }
    }
  }

</script>

<style scoped>
  nav.scrolled {
    @apply shadow fixed w-full top-0;
  }
</style>
