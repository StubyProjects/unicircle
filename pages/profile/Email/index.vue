<template>
  <div class="max-w-2xl mt-16 mx-auto">
    <div class="mt-5">
      <h3 class="font-bold text-2xl">Neue E-Mail</h3>

      <p class="mt-3">
        Du kannst dich mit dieser E-Mail anmelden, sobald du sie bestätigt hast. <br/>
        Wenn du deine neue E-Mail angegeben hast, wird eine Bestätigungsmail an diese Mail gesendet.
        Bis dahin musst du dich mit deiner aktuellen Mail anmelden.
      </p>


      <div class="mt-5">
        <button
          @click="updateEmail()"
          class="font-bold rounded shadow block bg-primary hover:bg-white px-4 py-2">
          E-Mail aktualisieren
        </button>
      </div>

    </div>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    mounted() {
      this.email = this.$auth.user.email
    },
    mixins: [validationMixin],
    middleware: ['auth', 'changeEmail'],
    data() {
      return {
        email: ""
      }
    },
    validations: {
      email: {
        required,
        email
      }
    },
    methods: {
      updateEmail() {
        if (this.$v.$invalid) {
          this.$v.$touch();
        } else {
          alert('E-Mail changed')
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
