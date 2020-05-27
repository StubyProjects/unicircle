<template>
  <div>
      <FilterPanel></FilterPanel>
      <div>
        <shop-panel></shop-panel>
      </div>
  </div>
</template>

<script>
  import ShopPanel from "../../components/catalog/ShopPanel";
  import FilterPanel from "../../components/catalog/FilterPanel";

  export default {
    name: "index",
    components: {FilterPanel, ShopPanel },
    middleware: "load-products"
  }
</script>

<style scoped>

</style>
