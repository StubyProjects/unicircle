<template>
  <div>
    <h1 class="text-2xl text-anthrazit">Buch verkaufen</h1>
    <h2 class="font-bold text-xl text-primary">Schritt 1</h2>

    <div class="mt-5">

      <label for="searchbook" class="block">Suche dein Buch</label>
      <input id="searchbook" v-model="searchTerm" @keyup="searchBook()"
             class="w-full mt-4 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
             type="search" name="name" placeholder="ISBN, Titel, Autor">

      <div v-if="searchTerm.length > 0" class="p-5 shadow w-full">

        <div v-if="getSearchResultType === 'google'">
          <div
            @click="selectBook(result)"
               v-for="result in getSearchResults"
               :key="result.id"
               class="mb-3 cursor-pointer hover:text-primary">
            <app-search-results
            :title="result.volumeInfo.title"
            :sub-title="result.volumeInfo.subtitle"
            :authors="result.volumeInfo.authors"
            :identifiers="result.volumeInfo.industryIdentifiers"
            :publisher="result.volumeInfo.publisher">
              <img class="h-22 w-16 border rounded"
                   v-if="result.volumeInfo.imageLinks"
                   :src="result.volumeInfo.imageLinks.smallThumbnail"
                   alt="book-cover">
            </app-search-results>
          </div>

        </div>

        <div v-if="getSearchResultType === 'ownDB'">

          <div
               v-for="result in getSearchResults"
               :key="result.id"
               class="flex mb-3 cursor-pointer hover:text-primary">
            <app-search-results
              :title="result.title"
              :sub-title="result.subtitle"
              :authors="result.authors"
              :identifiers="[
                {type: 'isbn10', identifier: result.isbn10},
                {type: 'isbn13', identifier: result.isbn13}
                ]"
              :publisher="result.publisher"
              >
              <img class="h-22 w-16 border rounded"
                   v-if="result.imageUrl"
                   :src="result.imageUrl"
                   alt="book-cover">
            </app-search-results>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
  import SearchResults from "@/components/catalog/NewListing/SearchResults"

  export default {
    data() {
      return {
        searchTerm: ""
      }
    },
    components: {
      appSearchResults: SearchResults
    },
    computed: {
      ...mapGetters("listing",["getSearchResults","getSearchResultType"]),
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
