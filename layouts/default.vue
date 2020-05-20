<template>
  <div>
    <TheHeader/>
    <nuxt />
    <TheSnackbar/>
    <TheFooter/>
  </div>
</template>

<script>
  import TheHeader from '@/components/TheHeader'
  import TheFooter from "@/components/TheFooter";
  import TheSnackbar from "../components/TheSnackbar";

  export default {
    components: {
      TheSnackbar,
      TheFooter,
      TheHeader
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
