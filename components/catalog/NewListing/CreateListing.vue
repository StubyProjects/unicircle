<template>
  <div class="mt-10">
    <h1 class="text-2xl text-anthrazit">Angebot erstellen</h1>
    <h2 class="font-bold text-xl text-primary">Schritt 2</h2>

    <div class="grid grid-cols-3 justify-between mt-10">
      <div class="block">
        <h3 class="font-bold">Preis</h3>
        <label for="price">
          <input id="price" v-model="price" class="w-1/4 mt-2 text-base rounded shadow h-10 px-5 pb-1 focus:outline-none"
                 type="text" name="title"> EUR
        </label>
        <div> <span class="text-sm">Bitte nur ganzzahlige Beträge angeben</span></div>
      </div>

      <div class="block">
        <h3 class="font-bold">Zustand</h3>
        <label class="text-xs" for="condition">
          <select id="condition" v-model="condition" class="mt-2 text-base rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none">
            <option v-for="condition in getConditions" :value="condition" :key="condition.id">
              {{condition.name}}
            </option>
          </select>
        </label>
        <div> <span class="text-sm">{{condition.description}}</span></div>
      </div>
    </div>
    <app-file-upload></app-file-upload>
    <div class="mt-5">
      <button v-if="getProductImages.length > 0 && price.length > 0" @click="createListing({price, condition})" class="font-bold rounded shadow block bg-primary hover:bg-white px-4 py-2">Angebot veröffentlichen</button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex"
  import FileUpload from '@/components/catalog/NewListing/FileUpload'

    export default {
        components: {
          appFileUpload: FileUpload
        },
        data() {
          return {
            condition: {},
            price: ""
          }
        },
        created() {
          this.condition = this.getConditions[0];
        },
        computed: {
          ...mapGetters("listing",["getConditions","getProductImages"])
        },
        methods: {
          ...mapActions("listing",["loadConditions","createListing"]),
        }
    }

</script>

<style scoped>

</style>
