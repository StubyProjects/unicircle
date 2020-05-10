<template>
  <div class="flex content-center flex-wrap px-1 py-1 w-full bg-gray-200">
    <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/5 p-2" v-for="product in getProducts" :key="product.id">
      <shop-card :product="product"></shop-card>
    </div>
  </div>
</template>

<script>
  import ShopCard from "../../components/catalog/ShopCard";
  import {mapGetters} from "vuex"

  export default {
    name: "ShopPanel",
    components: {ShopCard},
    computed: {
      ...mapGetters("catalog", ["getProducts"])
    },
    middleware: "load-products"
  }

</script>

<style scoped>

</style>
