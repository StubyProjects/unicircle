<template>
<div class="relative bg-anthrazit flex items-stretch">
  <FilterDropdown button-text="Universität"></FilterDropdown>
  <FilterDropdown button-text="Studiengang"></FilterDropdown>
  <FilterDropdown button-text="Fach"></FilterDropdown>
</div>
</template>

<script>
  import FilterDropdown from "./FilterDropdown";
    export default {
        name: "FilterPanel",
      components: {FilterDropdown},
      data(){
          return{
            isOpen: false
          }
      }
    }
</script>

<style scoped>

</style>
