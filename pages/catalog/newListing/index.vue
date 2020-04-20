<template>
  <div class="max-w-4xl mx-auto">
    <app-search-book></app-search-book>
    <app-selected-product></app-selected-product>
    <app-create-listing></app-create-listing>
  </div>
</template>

<script>
  import { mapGetters } from "vuex"
  import SearchBook from "@/components/catalog/NewListing/SearchBook";
  import SelectedProduct from "@/components/catalog/NewListing/SelectedProduct";
  import CreateListing from "@/components/catalog/NewListing/CreateListing";

  export default {
    components: {
      appSearchBook: SearchBook,
      appSelectedProduct: SelectedProduct,
      appCreateListing: CreateListing
    },
    computed: {
      ...mapGetters('listing',["getSelectedProduct"])
    }
  }
</script>

<style scoped>

</style>
