<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="isProductListingCreated">
      Angebot wurde erstellt
    </div>

    <div v-else>
      <app-search-book></app-search-book>

      <app-selected-product>

      </app-selected-product>

      <app-create-listing v-if="isProductSelected"></app-create-listing>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex"
  import SearchBook from "@/components/catalog/NewListing/SearchBook";
  import SelectedProduct from "@/components/catalog/NewListing/SelectedProduct";
  import CreateListing from "@/components/catalog/NewListing/CreateListing";

  export default {
    middleware: ['new-listing-data','auth'],
    components: {
      appSearchBook: SearchBook,
      appSelectedProduct: SelectedProduct,
      appCreateListing: CreateListing
    },
    computed: {
      ...mapGetters('listing',[
        "getSelectedProduct",
        "isProductSelected",
        "getConditions",
        "isProductListingCreated"
      ])
    }
  }
</script>

<style scoped>

</style>
