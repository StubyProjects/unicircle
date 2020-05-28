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

      <KYCFile></KYCFile>

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

      <div v-if="getUploadFiles.length > 0" class="mt-5">
        <button
          @click="submitValidation()"
          class="font-bold rounded shadow block bg-primary hover:bg-white px-4 py-2">
          Anfrage senden
        </button>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex"
  import {validationMixin} from 'vuelidate'
  import {required, email} from 'vuelidate/lib/validators'
  import KYCFile from "../../../components/Profile/KYCFile";

  export default {
    components: {KYCFile},
    mixins: [validationMixin],
    middleware: ['auth', 'changeEmail'],
    data() {
      return {
        email: "",
        uploadMessage: ""
      }
    },
    validations: {
      email: {
        required,
        email
      }
    },
    computed: {
      ...mapGetters('profile', ['getUploadFiles'])
    },
    methods: {
      ...mapActions('profile', ['kycEmailChange']),
      submitValidation() {
        if (this.$v.$invalid) {
          this.$v.$touch();
        } else {
          if (this.getUploadFiles.length > 0) {
            this.kycEmailChange();
          }
        }
      }
    }
  }
</script>

<style>
  .is-invalid {
    @apply border border-red-500;
  }

  .error {
    @apply text-sm text-red-500;
  }
</style>
