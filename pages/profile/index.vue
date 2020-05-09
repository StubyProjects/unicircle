<template>
  <div class="max-w-4xl mt-16 mx-auto">
    <div>
      <h1 class="text-2xl font-bold text-anthrazit">Mein Profil</h1>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-5">
      <div class="col-span-1">
        <ul>
          <li class="text-xl text-anthrazit hover:text-primary cursor-pointer ">Profil</li>
          <li class="text-xl text-anthrazit hover:text-primary cursor-pointer mt-2">Meine Angebote</li>
          <li class="text-xl text-anthrazit hover:text-primary cursor-pointer mt-2">Bezahlung</li>
          <li class="text-xl text-anthrazit hover:text-primary cursor-pointer mt-2">Einstellungen</li>
        </ul>
      </div>
      <div class="col-span-2">

        <div class="flex">
          <img class="rounded-full h-20 w-20" :src="$auth.user.picture" alt="profile-picture">

          <div class="mt-5">
            <label for="image">
              <input id="image" @change="changePicture" class="hidden" type="file" ref="image">
            </label>
            <button
              class="ml-5 font-bold rounded shadow block hover:bg-primary px-4 py-2"
              @click="$refs.image.click()">
              Bild ändern
            </button>
          </div>

        </div>

        <div class="mt-5">
          <h3 class="font-bold">Vor-und Nachname</h3>
          <label for="fullname">
            <input id="fullname" v-model="fullname" class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                     type="text" name="fullname">
          </label>
        </div>

        <div class="mt-5">
          <h3 class="font-bold">E-Mail</h3>
          <label for="email">
            <input id="email" :value="$auth.user.email" class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                   type="text" name="email" disabled>
          </label>
        </div>

        <div class="mt-10 flex justify-between">
          <button @click="updateProfile({fullname})" class="font-bold rounded shadow block bg-primary hover:bg-white px-4 py-2">Profil aktualisieren</button>
        </div>

      </div>
    </div>
    {{getUserProfile}}
  </div>
</template>

<script>
  import { mapActions,mapGetters } from "vuex"

  export default {
    mounted() {
      if(this.$auth.user.name) {
        this.fullname = this.$auth.user.name;
      }
    },
    data() {
      return {
        fullname: "",
      }
    },
    computed: {
      ...mapGetters('profile',['getUserProfile'])
    },
    middleware: ['auth', 'userprofile'],
    methods: {
      ...mapActions("profile",["updateProfile"]),
      changePicture(event) {
        let url = URL.createObjectURL(event.target.files[0])
        this.changeProfilePicture(url)
      }
    }
  }
</script>

<style scoped>

</style>
