<template>
  <div class="">
    <!--Image of Card -->
    <img class="w-full object-cover sm:object-center rounded-lg"
         :src="product.imageUrl"
         :alt="product.title">
    <!--Textpill of Card -->
    <div class="px-1 py-6">
      <div class="relative px-6 py-4 -mt-12 bg-white shadow-lg rounded-lg">
        <div class="text-gray-900 antialiased">
          <div class="text-gray-600 text-xs uppercase font-semibold tracking-wide truncate">{{product.author}}</div>
          <div class="text-anthrazit font-bold text-md truncate">
            {{product.title}}
          </div>
          <div class="border-b-2 border-gray-300 w-2/12 pl-1 py-1"></div>
          <p class="text-gray-700 sm:text-md md:text-sm truncate pt-2">
            {{product.description}}
          </p>
          <p class="text-anthrazit text-md mt-1">
            {{product.listPrice}} € &bullet;
            <span class="inline-block bg-primary rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
            {{product.category}}
          </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["product"]
  }
</script>

<style scoped>

</style>
