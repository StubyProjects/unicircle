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
          <li class="text-xl text-primary hover:text-primary cursor-pointer mt-2">Einstellungen</li>
        </ul>
      </div>
      <div class="col-span-2">
        <app-settings></app-settings>
      </div>
    </div>

  </div>
</template>

<script>
  import Settings from "../../components/Profile/Settings";
  export default {
    components: {
      appSettings: Settings
    },
    middleware: ['auth', 'userprofile', 'notification'],
  }
</script>

<style scoped>

</style>
