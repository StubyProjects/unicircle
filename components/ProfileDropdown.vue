<template>
    <div @click="TOGGLE_PROFILE_DROPDOWN()" class="absolute z-50 mt-3 bg-white right-0 mr-6 rounded shadow-md w-1/2">
      <nuxt-link to="/profile">
        <div class="px-5 py-2 hover:bg-gray-200 cursor-pointer">Mein Profil</div>
      </nuxt-link>
      <nuxt-link to="/profile">
        <div class="px-5 py-2 hover:bg-gray-200 cursor-pointer">Einstellungen</div>
      </nuxt-link>
      <div v-if="$auth.loggedIn" class="px-5 py-2 hover:bg-gray-200 text-red-500 cursor-pointer" @click="$auth.logout()">
        Abmelden
      </div>
    </div>
</template>

<script>
    import { mapMutations } from "vuex";
    export default {
      methods: {
        ...mapMutations(["TOGGLE_PROFILE_DROPDOWN"])
      }
    }
</script>

<style scoped>

</style>
