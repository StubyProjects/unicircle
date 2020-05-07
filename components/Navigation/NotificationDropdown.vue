<template>
  <div class="text-anthrazit font-bold">
    <div @click="dropdownActivated=!dropdownActivated"
         class="rounded-full cursor-pointer p-2 hover:bg-primary relative">
      <img src="~/assets/notification.png" alt="login symbol">
      <div v-if="notifications.length > 0"
           class="bg-red-500 text-white rounded-full text-xs absolute top-0 right-0 px-1.5"
           style="padding-bottom: 1px">
        {{notifications.length}}
      </div>
    </div>

    <div v-if="dropdownActivated" class="absolute z-50 mt-3 bg-white left-0 mr-6 rounded shadow-md w-full">

      <div v-if="notifications.length > 0">
        <div class="px-5 py-3 hover:bg-gray-200 cursor-pointer" v-for="(notification, index) in notifications">
          <div class="mb-3">{{notification.title}}</div>
          <p class="text-xs font-normal">{{notification.description}}</p>
          <div class="flex mt-5 text-sm">
            <nuxt-link class="bg-primary rounded-full shadow py-1 px-2 hover:bg-white" :to="notification.action.url">
              {{notification.action.text}}
            </nuxt-link>
            <div @click="notifications.splice(index,1)"
                 class="ml-5 bg-red-500 rounded-full shadow py-1 px-2 hover:bg-white">Löschen
            </div>
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
  export default {
    data() {
      return {
        dropdownActivated: false,
        notifications: [
          {
            title: 'Vervollständige dein Profil',
            description: 'Um unseren Service vollständig nutzen zu können (Guthaben verwalten, Bücher verkaufen etc.) vervollständige bitte dein Profil.',
            action: {
              url: '/profile',
              text: 'Profil vervollständingen'
            }
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
