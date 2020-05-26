<template>
  <div>
    <TheHeader/>
    <div @click="closeDropDowns()">
      <nuxt/>
    </div>
    <TheSnackbar/>
    <TheFooter/>
  </div>
</template>

<script>
  import TheHeader from '@/components/TheHeader'
  import TheFooter from "@/components/TheFooter";
  import TheSnackbar from "../components/TheSnackbar";
  import { mapMutations } from 'vuex'

  export default {
    components: {
      TheSnackbar,
      TheFooter,
      TheHeader
    },
    methods: {
      ...mapMutations(['CLOSE_PROFILE_DROPDOWN','CLOSE_NOTIFICATION_DROPDOWN']),
      closeDropDowns() {
        this.CLOSE_PROFILE_DROPDOWN();
        this.CLOSE_NOTIFICATION_DROPDOWN();
      }
    }
  }
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
