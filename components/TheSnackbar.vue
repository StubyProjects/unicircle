<template>
  <div v-if="isActive" class="animationFadeIn wrapper fadeInBottom fixed bottom-0 inset-x-0">
    <div class="message max-w-md rounded mb-5 mx-auto bg-anthrazit flex justify-between">
      <h1 class="text-white py-4 px-6">{{getMessage}}</h1>

      <h1
        @click="CLOSE"
        class="hover:text-white cursor-pointer font-bold text-primary py-4 px-6">
        Fertig
      </h1>
    </div>
  </div>

</template>

<script>
  /**
   * Trigger this Snackbar by calling the setMessage VUEX Action in snackbar module and provide your message
   */
  import { mapGetters, mapMutations } from 'vuex'

    export default {
        computed: {
         ...mapGetters('snackbar',[
           'isActive',
           'getMessage'
         ])
        },
        methods: {
         ...mapMutations('snackbar',[
           'CLOSE'
         ])
        }
    }
</script>

<style scoped>
  .wrapper {
    transform: translateY(-50%);
  }

  .animationFadeIn {
    animation-duration: 300ms;
    animation-fill-mode: both;
  }

  .fadeInBottom {
    animation-name: fadeInBottom
  }

  @keyframes fadeInBottom {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to { opacity: 1 }
  }
</style>

