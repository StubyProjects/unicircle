<template>
  <div>

  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';


export default {
  //middleware: 'load-products',

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
