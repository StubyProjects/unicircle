<template>
  <div>

    {{getProducts}}

    <div class="mt-12">
      <h1 class="m-4">Produkt erstellen</h1>

      <div class="m-4">
        <label for="name"></label>
        <input id="name" v-model="product.name" class="rounded-full shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
               type="text" name="name" placeholder="name">
      </div>
      <div class="m-4">
        <label for="price"></label>
        <input id="price" v-model="product.price" class="rounded-full shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
               type="text" name="name" placeholder="preis">
      </div>
      <div class="m-4">
        <label for="image"></label>
        <input id="image" v-model="product.image" class="rounded-full shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
               type="text" name="name" placeholder="Bild URL">
      </div>

      <button @click="create(product)" class="font-bold rounded-full shadow hover:bg-primary px-4 py-2 m-4">
        Create
      </button>

    </div>

  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';


export default {
  middleware: 'load-products',

  data() {
    return {
      product: {
        name: "",
        price: "",
        image: ""
      }
    }
  },
  computed: {
    ...mapGetters("catalog",[
      'getProducts'
    ])
  },
  methods: {
    ...mapActions("catalog",[
      'loadAll',
      'create'
    ])
  }
}
</script>

<style>
</style>
