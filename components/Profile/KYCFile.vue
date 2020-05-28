<template>
    <div class="mt-5">

        <label for="image">
          <input id="image" @change="chooseFile" class="hidden" type="file" multiple ref="files">
        </label>
        <button @click="$refs.files.click()"
                class="font-bold rounded shadow block hover:bg-primary px-4 py-2">
          Dateien auswählen
        </button>

      <div class="grid grid-cols-4 gap-4 mt-5">
        <div class="relative" v-for="(file, index) in files" :key="index">
          <button style="top: -10px"
                  class="shadow font-bold absolute right-0 bg-white hover:bg-primary rounded-full p-2"
                  @click.prevent="deleteFile(index)">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16pt"
                 height="16pt" viewBox="0 0 24 24" version="1.1">
              <g id="surface105499">
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;"
                      d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 Z M 4.367188 7 L 5.890625 20.265625 C 6.023438 21.253906 6.878906 22 7.875 22 L 16.121094 22 C 17.121094 22 17.972656 21.253906 18.105469 20.253906 L 19.632812 7 Z M 4.367188 7 "/>
              </g>
            </svg>
          </button>
          <img class="h-64" :src="file.preview" alt="preview">
          <div class="mt-3" :class="{'error': file.invalidMessage}">
            {{file.name}}
            <span v-if="file.invalidMessage"> - {{file.invalidMessage}} </span>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
  import { mapMutations } from "vuex"

   export default {
     data() {
       return {
         files: [],
         uploadFiles: [],
       }
     },
     methods: {
       ...mapMutations('profile',[
         'UPLOAD_FILES',
         'DELETE_UPLOAD_FILES'
       ]),
       getGeneratedURL(file) {
         if(file.type === "application/pdf"){
           return 'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg';
         }
         return URL.createObjectURL(file)
       },
       deleteFile(index) {
         this.files.splice(index,1);
         this.DELETE_UPLOAD_FILES(index,1);
         this.uploadFiles.splice(index,1);
       },
       validate(file) {
         const MIN_SIZE = 1024;
         const MAX_SIZE = 7168000;
         const allowedType = ["application/pdf", "image/jpeg", "image/png"];

         if(file.size > MAX_SIZE) {
           return `Die maximale Dateigröße beträgt ${(MAX_SIZE/1024) / 1000} Mb`;
         }
         else if(file.size < MIN_SIZE) {
           return `Die minimale Dateigröße beträgt ${(MIN_SIZE/1024)} Kb`;
         }
         else if (!allowedType.includes(file.type)) {
           return "Unerlaubtes Dateiformat. Erlaubte Formate sind: .pdf, .jpeg, .jpg und .png";
         }
         return "";
       },
       chooseFile() {
         this.uploadMessage = "";
         const files = this.$refs.files.files;
         this.uploadFiles = [...this.uploadFiles, ...files];

         this.files = [...this.uploadFiles].map(file => {
           return {
             name: file.name,
             size: file.size,
             type: file.type,
             invalidMessage: this.validate(file),
             preview: this.getGeneratedURL(file)
           }
         });

        this.UPLOAD_FILES(this.uploadFiles.filter(file => this.validate(file) === ""));

       },
     }
   }
</script>

