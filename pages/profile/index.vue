<template>
  <div class="max-w-4xl mt-5 mx-auto">
    <div>
      <h1 class="text-2xl font-bold text-anthrazit">Mein Profil</h1>
    </div>
    <div>
      <h2 class="text-xl mt-2 text-anthrazit hover:text-primary cursor-pointer">Profil</h2>
      <h2 class="text-xl mt-2 text-anthrazit hover:text-primary cursor-pointer">Meine Angebote</h2>
      <h2 class="text-xl mt-2 text-anthrazit hover:text-primary cursor-pointer">Bezahlung</h2>
      <h2 class="text-xl mt-2 text-anthrazit hover:text-primary cursor-pointer">Einstellungen</h2>
    </div>


  </div>
</template>

<script>
  export default {
    middleware: "auth",
    name: "index"
  }
</script>

<style scoped>

</style>
