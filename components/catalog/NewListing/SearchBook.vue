<template>
  <div>
    <h1 class="text-2xl text-anthrazit">Buch verkaufen</h1>
    <h2 class="font-bold text-xl text-primary">Schritt 1</h2>

    <div class="mt-5">

      <label for="searchbook" class="block">Suche dein Buch</label>
      <input id="searchbook" v-model="searchTerm" @keyup="searchBook()" class="w-full mt-4 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
             type="search" name="name" placeholder="ISBN, Titel, Autor">

      <div v-if="searchTerm.length > 0" class="p-5 shadow w-full">

        <div @click="selectBook(result)" v-for="result in getSearchResults" :key="result.id" class="flex mb-3 cursor-pointer hover:text-primary">
          <img class="h-22 w-16 border rounded" v-if="result.volumeInfo.imageLinks" :src="result.volumeInfo.imageLinks.smallThumbnail" alt="book-cover">

          <div class="ml-4">

            <h3 class="font-bold text-lg">{{result.volumeInfo.title}}</h3>
            <h4>{{result.volumeInfo.subtitle}}</h4>

            <div class="flex text-xs">
                  <span class="mr-5" v-for="author in result.volumeInfo.authors">
                    {{author}},
                  </span>

              <span class="mr-5" v-for="identifier in result.volumeInfo.industryIdentifiers">
                    {{identifier.type}}: {{identifier.identifier}}
                  </span>
            </div>

            <div class="flex text-xs">
                 <span>
                    Verlag: {{result.volumeInfo.publisher}}
                  </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        searchTerm: ""
      }
    },
    computed: {
      ...mapGetters("listing",["getSearchResults"]),
      ...mapState("listing",["finishedLoading"])
    },
    methods: {
      ...mapMutations("listing", ["SELECT_PRODUCT"]),
      ...mapActions('listing',['search']),
      searchBook() {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.timer = setTimeout(() => {
          this.search(this.searchTerm)
        }, 600);
      },
      selectBook(result) {
        this.searchTerm = "";
        this.SELECT_PRODUCT(result)
      }
    }
  }
</script>

<style scoped>

</style>
