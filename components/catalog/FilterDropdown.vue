<template>
  <div class="">
  <button @click="isOpen = !isOpen" class="flex items-center ml-5 my-5 block h-10 w-32 rounded-full bg-white border-2 hover:bg-gray-300 focus:border-primary">
    <span class="ml-4">{{buttonText}}
      </span>
    <span>
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAh0lEQVRIie2TQQqAIBBFn13M47TsKOWqTpttRhhEyVIhwg8DguN7MwthpHG8VHGmToMMwRD8QWAA+4Bj5U1RDOCAE1iiu9RPnqX3SElyG3hpXhOSGL6nwHcxwCYivYneIEzuyUz/RhIE1fCcxEfnKriWOAUP5VrAtSRs0mzynKQLXEu6wb+ZCw25LBH/WRQWAAAAAElFTkSuQmCC"/>
    </span>
  </button>
  <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default"></button>
  <div v-if="isOpen" class="absolute mt-2 bg-white rounded-lg shadow-xl border-2 border-primary">
    <div>dropdownInhalt</div>
    <!-- hier noch Suchfeld und dropdownObjects for each einbauen mit value übergabe -->
  </div>
  </div>
</template>

<script>
  export default {
    props: ["buttonText","dropdownObject"],
    data(){
      return{
        isOpen: false
      }
    }
  }

</script>

<style scoped>

</style>
