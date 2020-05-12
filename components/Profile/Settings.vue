<template>

  <div>
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
      <h3 class="font-bold">Vorname</h3>
      <label for="firstname">
        <input id="firstname"
               v-model="$v.firstname.$model"
               :class="{ 'is-invalid': $v.firstname.$error }"
               class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
               type="text" name="fullname">
      </label>
      <span v-if="!$v.firstname.required" class="error">Pflichtfeld</span>
    </div>

    <div class="mt-5">
      <h3 class="font-bold">Nachname</h3>
      <label for="lastname">
        <input id="lastname"
               :class="{ 'is-invalid': $v.lastname.$error }"
               v-model="$v.lastname.$model"
               class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
               type="text" name="fullname">
      </label>
      <span v-if="!$v.lastname.required" class="error">Pflichtfeld</span>
    </div>

    <div class="mt-5">
      <h3 class="font-bold">E-Mail</h3>
      <label for="email">
        <input id="email" :value="$auth.user.email"
               class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
               type="text" name="email" disabled>
      </label>
      <span class="mt-3 text-primary">{{getUserProfile.userAuth0.email_verified ? 'verifiziert' : 'noch nicht verifiziert'}}</span>
    </div>

    <div class="mt-5 flex justify-between">
      <div>
        <h3 class="font-bold">Google</h3>
        <label for="google">
          <input id="google" :value="getSocialProfiles('google-oauth2')"
                 class="mt-2 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                 type="text"
                 disabled>
        </label>
      </div>

<!--      <div>-->
<!--        <h3 class="font-bold">Facebook</h3>-->
<!--        <label for="facebook">-->
<!--          <input id="facebook"-->
<!--                 class="mt-2 rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"-->
<!--                 type="text" disabled>-->
<!--        </label>-->
<!--      </div>-->
    </div>

    <div class="mt-5">
      <h3 class="font-bold">Geburtstag</h3>
      <date-picker
        class="mt-2 text-base"
        :class="{ 'is-invalid': $v.birthday.$error }"
        v-model="$v.birthday.$model"
        format="DD.MM.YYYY"
        value-type="timestamp">
      </date-picker>
      <span v-if="!$v.birthday.required" class="error">Pflichtfeld</span>
    </div>

    <div class="mt-10 flex justify-between">
      <button v-if="getUserProfile.profileIsCompleted" @click="updateProfile({fullname})"
              class="font-bold rounded shadow block bg-primary hover:bg-white px-4 py-2">

      </button>
      <button v-else @click="completeUserRegistration()"
              class="font-bold rounded shadow block bg-primary hover:bg-white px-4 py-2">
        Profil vervollständigen
      </button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex"
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    components: { DatePicker },
    mixins: [validationMixin],
    data() {
      return {
        firstname: "",
        lastname: "",
        birthday: null
      }
    },
    computed: {
      ...mapGetters('profile', ['getUserProfile'])
    },
    mounted() {
      if (this.$auth.user.name) {
        this.firstname = this.$store.getters['profile/getUserProfile'].userAuth0.given_name;
        this.lastname = this.$store.getters['profile/getUserProfile'].userAuth0.family_name;
      }
      this.$v.$touch();
    },
    validations: {
      firstname: {
        required
      },
      lastname: {
        required
      },
      birthday: {
        required
      }
    },
    methods: {
      ...mapActions("profile", ["updateProfile"]),
      changePicture(event) {
        let url = URL.createObjectURL(event.target.files[0])
        this.changeProfilePicture(url)
      },
      getSocialProfiles(identityProvider) {
        const identities = this.$store.getters['profile/getUserProfile'].userAuth0.identities
        return identities.filter(identity => identity.provider === identityProvider).length > 0 ? 'Verbunden' : '';
      },
      completeUserRegistration() {
        if(this.$v.$invalid) {
          this.$v.$touch();
        } else {
          alert('created');
        }

      }
    }
  }
</script>

<style lang="scss">
  $input-hover-border-color: #21ce99;
  $default-color: #333333;
  $primary-color: #21ce99;

  @import '~vue2-datepicker/scss/index.scss';

</style>

<style scoped>
  .is-invalid {
    @apply border border-red-500;
  }
  .error {
    @apply text-sm text-red-500;
  }
</style>

