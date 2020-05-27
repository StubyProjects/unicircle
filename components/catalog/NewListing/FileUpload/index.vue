<template>
  <div class="mt-10">
    <h3 class="font-bold">Eigene Bilder</h3>
    <div>

      <div>
        <label for="images">
          <input id="images" @change="uploadFiles" class="mt-3 hidden" type="file" multiple ref="images">
        </label>
        <div class="mt-3 flex justify-between ">
          <button class="font-bold shadow rounded block hover:bg-primary px-4 py-2" @click="$refs.images.click()">Bilder
            auswählen
          </button>
        </div>

        <div class="grid grid-cols-4 gap-4 mt-5">
          <div class="relative" v-for="(image, index) in getProductImages">
            <button style="top: -10px"
                    class="shadow font-bold absolute right-0 bg-white hover:bg-primary rounded-full p-2"
                    @click="deleteImage(image, index)">

              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16pt"
                   height="16pt" viewBox="0 0 24 24" version="1.1">
                <g id="surface105499">
                  <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;"
                        d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 Z M 4.367188 7 L 5.890625 20.265625 C 6.023438 21.253906 6.878906 22 7.875 22 L 16.121094 22 C 17.121094 22 17.972656 21.253906 18.105469 20.253906 L 19.632812 7 Z M 4.367188 7 "/>
                </g>
              </svg>

            </button>
            <img class="h-64" :src="image.imageUrl" alt="preview">
          </div>
        </div>

      </div>

      <div v-if="false">
        <div class="mt-3 flex justify-between">
          <button class="font-bold rounded shadow block bg-primary hover:bg-white px-4 py-2">Upload</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from "vuex"

  export default {
    computed: {
      ...mapGetters("listing", [
        "getProductImages"
      ])
    },
    methods: {
      ...mapMutations("listing", [
        "DELETE_PRODUCT_IMAGE",
        "ADD_PRODUCT_IMAGE"
      ]),
      uploadFiles(event) {

        for (let i = 0; i < event.target.files.length; i++) {
          let url = URL.createObjectURL(event.target.files[i])
          this.ADD_PRODUCT_IMAGE({imageUrl: url})
        }
      },

      deleteImage(image, index) {
        this.DELETE_PRODUCT_IMAGE(index)
      }

    }
  }
</script>

<style scoped>

</style>
