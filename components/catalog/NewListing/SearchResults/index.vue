<template>
  <div class="flex">
    <slot></slot>

    <div class="ml-4">

      <h3 class="font-bold text-lg">{{title}}</h3>
      <h4>{{subTitle}}</h4>

      <div class="flex text-xs">
        <span class="mr-5" v-for="author in authors">
          {{author}},
        </span>

        <span class="mr-5" v-for="identifier in identifiers">
          {{identifier.type}}: {{identifier.identifier}}
        </span>
      </div>

      <div class="flex text-xs">
        <span>
          Verlag: {{publisher}}
        </span>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        props: {
          title: String,
          subTitle: String,
          authors: Array,
          identifiers: Array,
          publisher: String
        }
    }
</script>

<style scoped>

</style>
