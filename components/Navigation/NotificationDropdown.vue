<template>
  <div class="text-anthrazit font-bold">
    <div @click="dropdownActivated=!dropdownActivated"
         class="rounded-full cursor-pointer p-2 hover:bg-primary relative">
      <img src="~/assets/notification.png" alt="login symbol">
      <div v-if="getNotifications.length > 0"
           class="bg-red-500 text-white rounded-full text-xs absolute top-0 right-0 px-1.5"
           style="padding-bottom: 1px">
        {{getNotifications.length}}
      </div>
    </div>

    <div v-if="dropdownActivated" class="absolute z-50 mt-3 bg-white left-0 mr-6 rounded shadow-md w-full">

      <div v-if="getNotifications.length > 0">
        <div class="relative px-5 py-4 hover:bg-gray-200 cursor-pointer" v-for="(notification, index) in getNotifications">

          <div @click="deleteNotification({id: notification.id, index})" class="p-1 absolute mt-3 mr-2 right-0 top-0 ml-5 bg-white rounded-full shadow hover:bg-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12pt" height="12pt" viewBox="0 0 24 24" version="1.1">
              <g id="surface105499">
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 Z M 4.367188 7 L 5.890625 20.265625 C 6.023438 21.253906 6.878906 22 7.875 22 L 16.121094 22 C 17.121094 22 17.972656 21.253906 18.105469 20.253906 L 19.632812 7 Z M 4.367188 7 "/>
              </g>
            </svg>
          </div>

          <div class="mb-3">{{notification.notification.title}}</div>

          <p class="text-xs font-medium">{{notification.notification.description}}</p>

          <div class="mt-5 text-sm">
            <nuxt-link class="bg-primary rounded-full text-white shadow py-1 px-3 hover:bg-white hover:text-anthrazit" :to="notification.notification.url">
              {{notification.notification.text}}
            </nuxt-link>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="px-5 py-3 hover:bg-gray-200 cursor-pointer">

          <div class="mb-3">Aktuell keine Benachrichtigungen</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        dropdownActivated: false
      }
    },
    methods: {
      ...mapActions('notifications', ['deleteNotification'])
    },
    computed: {
      ...mapGetters('notifications',['getNotifications'])
    }
  }
</script>

<style scoped>

</style>
