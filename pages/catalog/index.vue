<template>
  <div>
    <div class="">
      <!-- FilterPanel -->
      <div class="mx-10 my-10 bg-black text-white">
        Hier kommt noch Filter-Leiste
      </div>
      <!-- whole body -->
      <div class="flex content-center flex-wrap px-1 py-1 w-full bg-gray-200">
        <!-- ShopPanel -->
        <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/5 p-2" v-for="product in getProducts" :key="product.id">
          <shop-card :product="product"></shop-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import ShopCard from "../../components/catalog/ShopCard";

  export default {
    name: "index",
    components: { ShopCard },
    computed: {
      ...mapGetters("catalog", ["getProducts"])
    },
    middleware: "load-products"
  }
</script>

<style scoped>

</style>
