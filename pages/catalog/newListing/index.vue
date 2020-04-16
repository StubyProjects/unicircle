<template>
  <div class="container mx-auto">
    <h1 class="text-2xl text-anthrazit">Buch verkaufen</h1>
    <h1 class="font-bold text-xl text-primary">Schritt 1</h1>

    <div class="mt-5">
      <label for="searchbook" class="block">Suche dein Buch</label>
      <input id="searchbook" v-model="searchTerm" @keyup="searchBook()" class="w-1/2 mt-4 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
             type="search" name="name" placeholder="ISBN, Titel, Autor">
      <div class="mt-5">
        <div v-for="result in getSearchResults" :key="result.id" class="flex mt-3">
          <!--img v-if="getResultsLoaded" class="h-20 w-14" :src="result.volumeInfo.imageLinks.smallThumbnail" alt="book-cover"-->
          {{result}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        data() {
          return {
            searchTerm: ""
          }
        },
        computed: {
          ...mapGetters("listing",["getSearchResults"])
        },
        methods: {
          ...mapActions('listing',['search']),
          searchBook() {
            if(this.searchTerm.length > 0) {
              if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
              }
              this.timer = setTimeout(() => {
                this.search(this.searchTerm)
              }, 600);
            }
          }
        }
    }
</script>

<style scoped>

</style>
