<template>
  <header>
    <nav :class="{'scrolled': !view.atTopOfPage}">

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

          <div class="w-4/6 relative">
            <label for="search-topbar-1"></label>
            <input id="search-topbar-1" class="w-full rounded-full shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                   type="search" name="suchen" placeholder="Suchen">

            <button type="submit" class="absolute right-0 top-0 mt-3 mr-4 focus:outline-none">
              <svg class="text-primary hover:text-blue h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                   version="1.1" id="Capa_1" x="0px" y="0px"
                   viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;"
                   xml:space="preserve"
                   width="512px" height="512px">
                  <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                </svg>
            </button>
          </div>

        </div>
        <div class="relative flex lg:px-6 hidden md:inline-flex">

          <div class="text-anthrazit font-bold">
            <a href="#" class="whitespace-no-wrap hover:text-white rounded-full block hover:bg-primary px-4 py-2">
              Über uns
            </a>
          </div>

          <div v-if="$auth.loggedIn" class="text-anthrazit font-bold">
            <nuxt-link to="/catalog/newlisting" class="whitespace-no-wrap hover:text-white rounded-full block hover:bg-primary px-4 py-2">Jetzt verkaufen</nuxt-link>
          </div>

          <div class="text-anthrazit font-bold">

            <a v-if="$auth.loggedIn" @click="TOGGLE_PROFILE_DROPDOWN()" href="#" class="flex rounded-full shadow block hover:bg-primary px-3 py-2 lg:ml-3">
              <img class="h-6 w-6 mr-3 rounded-full border-black" :src="$auth.user.picture" alt="profile-picture">{{$auth.user.given_name}}
            </a>
            <a v-else @click="login()" href="#" class="rounded-full shadow block hover:bg-primary px-4 py-2 lg:ml-3">
              Einloggen
            </a>

            <app-profile-dropdown v-if="isDropDownActivated && $auth.loggedIn"></app-profile-dropdown>

          </div>
        </div>
      </div>

      <div v-if="$route.path !== '/catalog/newlisting'" class="bg-white px-5 sm:flex py-5 md:py-3 lg:py-5  lg:hidden">
        <div class="hidden sm:inline-block text-anthrazit font-bold sm:w-1/6">
          <a href="#" class="rounded-full block hover:text-white hover:bg-primary px-4 py-2 mr-2">
            Katalog
          </a>
        </div>

        <div class="relative sm:w-5/6">
          <label for="search-topbar-2"></label>
          <input id="search-topbar-2" class="w-full rounded-full shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                 type="search" name="suchen" placeholder="Suchen">

          <button type="submit" class="absolute right-0 top-0 mt-3 mr-4 focus:outline-none">
            <svg class="text-primary hover:text-blue h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                 version="1.1" id="Capa_1" x="0px" y="0px"
                 viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;"
                 xml:space="preserve"
                 width="512px" height="512px">
                <path
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
              </svg>
          </button>
        </div>
      </div>

    </nav>
  </header>
</template>

<script>
    import ProfileDropdown from "./ProfileDropdown";
    import { mapGetters, mapMutations } from "vuex";

    export default {
        components: {
          appProfileDropdown: ProfileDropdown,
        },
        data () {
          return {
            view: {
              atTopOfPage: true,
              profileDropDownActivated: false,
            }
          }
        },
        beforeMount () {
          window.addEventListener('scroll', this.handleScroll);
        },
        computed: {
          ...mapGetters(["isDropDownActivated"])
        },
        methods: {
          ...mapMutations(["TOGGLE_PROFILE_DROPDOWN"]),
          handleScroll() {
            if(window.pageYOffset>0){
              // user is scrolled
              if(this.view.atTopOfPage) this.view.atTopOfPage = false
            }else{
              // user is at top of page
              if(!this.view.atTopOfPage) this.view.atTopOfPage = true
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
