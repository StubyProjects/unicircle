<template>
  <div class="max-w-4xl mt-16 mx-auto">
    <div class="mt-5">
      <h2 class="font-bold text-2xl">Bestätige deine Identität, um deine E-Mail-Adresse zu ändern</h2>

      <p class="mt-3">
        Falls du keinen Zugriff mehr auf deine E-Mail Adresse hast, kannst du sie hier ändern. <br/>
        Um Accountdiebstahl oder ähnliche unbefugte Handlungen zu verhindern, bitten wir dich, <br/>
        deine Identität zu bestätigen.
      </p>

      <h3 class="font-bold mt-5 text-xl">So funktionierts</h3>

      <h4 class="mt-3">Wir benötigen eines der folgenden Dokumente von dir</h4>

      <ul class="ml-2 mt-2 list-disc list-inside">
        <li>Ausweis (Forder - und Rückseite)</li>
        <li>Reisepass</li>
        <li>Aufenthaltsgenehmigung</li>
        <li>Führerschein</li>
      </ul>

      <p class="mt-3">
        Hier kannst du eines der oben genannten Dokumente einreichen. <br/>
      </p>

      <div class="mt-5">
        <label for="image">
          <input id="image" @change="chooseFile" class="hidden" type="file" multiple ref="files">
        </label>
        <button @click="$refs.files.click()"
                class="font-bold rounded shadow block hover:bg-primary px-4 py-2">
          Datei auswählen
        </button>
      </div>

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

      <div class="mt-5">
        <h3 class="font-bold">Neue E-Mail</h3>
        <label for="firstName">
          <input id="firstName"
                 v-model="$v.email.$model"
                 :class="{ 'is-invalid': $v.email.$error }"
                 class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                 type="text" name="fullname">
        </label>
        <span v-if="!$v.email.required" class="error">Pflichtfeld</span>
        <span v-if="!$v.email.email" class="error">Bitte gib eine valide E-Mail Adresse an</span>
      </div>

      <p class="mt-3">
        Es dauert in der Regel 24 Stunden bis die Validierung überprüft wurde.
      </p>

      <div :class="{'error': uploadMessage}" class="mt-5">
        <button
          @click="submitValidation()"
          class="font-bold rounded shadow block bg-primary hover:bg-white px-4 py-2">
          Anfrage senden
        </button>
        <span v-if="uploadMessage"> {{uploadMessage}} </span>
      </div>

    </div>
  </div>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    middleware: ['auth', 'changeEmail'],
    data() {
      return {
        files: [],
        uploadFiles: [],
        email: "",
        uploadMessage: ''
      }
    },
    validations: {
      email: {
        required,
        email
      }
    },
    methods: {
      getGeneratedURL(file) {
        if(file.type === "application/pdf"){
          return 'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg';
        }
        return URL.createObjectURL(file)
      },
      deleteFile(index) {
        this.files.splice(index,1);
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
      },
      submitValidation() {
        if (this.$v.$invalid) {
          this.$v.$touch();
        } else {
          const formData = new FormData();

          for(let i = 0; i < this.uploadFiles.length; i++) {
            if(this.validate(this.uploadFiles[i]) === "") {
              formData.append('files', this.uploadFiles[i]);
            } else {
              this.deleteFile(i)
              i--;
            }
          }

          if(this.uploadFiles.length > 0) {
            console.log(this.uploadFiles)
          } else {
            this.uploadMessage = "Keine Datei ausgewählt"
          }

        }
      }
    }
  }
</script>

<style scoped>
  .is-invalid {
    @apply border border-red-500;
  }

  .error {
    @apply text-sm text-red-500;
  }
</style>
