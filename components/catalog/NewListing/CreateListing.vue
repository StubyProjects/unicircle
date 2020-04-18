<template>
    <div class="mt-5 w-1/2">
      <div class="flex">

        <label for="title">Titel
        <input id="title" v-model="title" class="mt-2 mr-10 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
               type="text" name="title" placeholder="Titel">
        </label>

        <label class="block" for="author">Autor
        <input id="author" v-model="author" class="mt-2 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
               type="text" name="author" placeholder="Autor">
        </label>
      </div>

      <!--pre>{{getSelectedProduct}}</pre-->
    </div>
</template>

<script>
  import { mapGetters } from "vuex"

  export default {
    data() {
      return {
        title: "",
        author: ""
      }
    },
    computed: {
      ...mapGetters('listing',["getSelectedProduct"])
    }
  }
</script>

<style scoped>

</style>
