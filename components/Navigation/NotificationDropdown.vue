<template>
    <div class="text-anthrazit font-bold">
      <div @click="dropdownActivated=!dropdownActivated" class="rounded-full cursor-pointer p-2 hover:bg-primary relative">
        <img src="~/assets/notification.png" alt="login symbol">
        <div
          class="bg-red-500 text-white rounded-full text-xs absolute top-0 right-0 px-1.5"
          style="padding-bottom: 1px">
          1
        </div>
      </div>

      <div v-if="dropdownActivated" class="absolute z-50 mt-3 bg-white right-0 mr-6 rounded shadow-md w-2/3">
        <nuxt-link to="/profile">
          <div class="px-5 py-2 hover:bg-gray-200 cursor-pointer">Profil vervollständigen</div>
        </nuxt-link>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          dropdownActivated: false
        }
      }

    }
</script>

<style scoped>

</style>
