<template>
    <div class="w-full mt-10" v-if="isProductSelected">

      <img class="rounded" v-if="getSelectedProduct.volumeInfo.imageLinks" :src="getSelectedProduct.volumeInfo.imageLinks.thumbnail" alt="book-cover">

      <div class="grid grid-cols-3 justify-between mt-10">

        <div class="block">
          <h3 class="font-bold">Titel</h3>
          <label for="title">
            <input id="title" :value="getSelectedProduct.volumeInfo.title" class="mt-2 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                   type="text" name="title" placeholder="Titel" disabled>
          </label>
        </div>

        <div class="block" v-for="(author, counter) in getSelectedProduct.volumeInfo.authors">
          <h3 class="font-bold"> <span v-if="getSelectedProduct.volumeInfo.authors.length > 1">{{ counter + 1 }}. </span> Autor</h3>
          <label for="author">
            <input id="author" :value="author" class="mt-2 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                   type="text" name="author" placeholder="Autor" disabled>
          </label>
        </div>
      </div>

      <div class="grid grid-cols-3 mt-5">

        <div class="block" v-for="identifier in getSelectedProduct.volumeInfo.industryIdentifiers">
          <h3 class="font-bold">{{identifier.type}}</h3>
          <label for="isbn">
            <input id="isbn" :value="identifier.identifier" class="mt-2 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                   type="text" name="isbn" placeholder="ISBN" disabled>
          </label>
        </div>

        <div class="block">
          <h3 class="font-bold">Listenpreis (Google Books)</h3>

          <label v-if="getSelectedProduct.saleInfo.listPrice" for="list_price">
            <input id="list_price" :value="`${getSelectedProduct.saleInfo.listPrice.amount} ${getSelectedProduct.saleInfo.listPrice.currencyCode}`" class="mt-2 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                   type="text" name="price" placeholder="Preis" disabled>

          </label>

          <label v-else for="price_unavailable">
            <input id="price_unavailable" value="Preis nicht verfügbar" class="mt-2 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                   type="text" name="price" placeholder="Preis" disabled>
          </label>

        </div>

      </div>

      <div class="mt-10">

        <div v-if="getSelectedProduct.volumeInfo.description">
          <h3 class="font-bold">Beschreibung</h3>
          <p class="mt-5">
            {{getSelectedProduct.volumeInfo.description}}...
          </p>
        </div>

      </div>
      <pre>{{getSelectedProduct}}</pre>
    </div>
</template>

<script>
  import { mapGetters } from "vuex"
  export default {
    data() {
      return {
        author: "",
        isbn: ""
      }
    },
    computed: {
      ...mapGetters("listing",["getSelectedProduct","isProductSelected"]),
    }
  }
</script>

<style scoped>

</style>
