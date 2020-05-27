<template>
  <div>

    <footer class="w-full absolute bottom-0 text-white bg-footerbg border-t border-grey p-4">
      generic footer <br />
      Icon by <a target="_blank" href="https://icons8.de">Icons8</a>
    </footer>

    <nav v-if="notAtBottomPage" class="bg-white text-xs fixed border-t flex inset-x-0 bottom-0 justify-center pt-4 pb-2 md:hidden">
      <a href="#">
        <div class="mb-1 flex justify-center">
          <svg fill="#21ce99" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px" height="25px"> <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"/></svg>
        </div>
        <div class="text-primary">Katalog</div>
      </a>
      <a href="#" class="mx-10 px-4">
        <div class="mb-1 flex justify-center">
          <svg fill="#333333" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26px" height="26px"> <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"/></svg>
        </div>
        <div>Über uns</div>
      </a>
      <a @click="login()" href="#">
        <div class="mb-1 flex justify-center">
          <img src="~/assets/login.png" alt="login symbol">
        </div>
        <div>Einloggen</div>
      </a>
    </nav>

  </div>
</template>

<script>
    export default {
        name: "TheFooter",
        data () {
          return {
            notAtBottomPage: true
          }
        },
        beforeMount () {
          window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll() {
              this.notAtBottomPage = (window.innerHeight + window.scrollY) < document.body.offsetHeight;
            },
            login() {
              this.$auth.loginWith('auth0');
            }
        }
    }
</script>

<style scoped>

</style>
