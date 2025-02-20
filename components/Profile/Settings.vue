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
      <label for="firstName">
        <input id="firstName"
               v-model="$v.firstName.$model"
               :class="{ 'is-invalid': $v.firstName.$error }"
               class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
               type="text" name="fullname">
      </label>
      <span v-if="!$v.firstName.required" class="error">Pflichtfeld</span>
    </div>

    <div class="mt-5">
      <h3 class="font-bold">Nachname</h3>
      <label for="lastName">
        <input id="lastName"
               :class="{ 'is-invalid': $v.lastName.$error }"
               v-model="$v.lastName.$model"
               class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
               type="text" name="fullname">
      </label>
      <span v-if="!$v.lastName.required" class="error">Pflichtfeld</span>
    </div>

    <div class="mt-5">
      <h3 class="font-bold">E-Mail</h3>
      <div class="relative">
        <label for="email">
          <input id="email" :value="$auth.user.email"
                 class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                 type="text" name="email" disabled>
        </label>
        <nuxt-link v-if="!getUserProfile.userAuth0.identities[0].isSocial" to="/profile/email">
          <button
            class="absolute mt-2 right-0 font-bold rounded shadow bg-primary hover:bg-white px-4 py-2">
            Ändern
          </button>
        </nuxt-link>

      </div>
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
      <client-only>

        <date-picker
          :language="de"
          :use-utc="true"

          format="dd. MMMM yyyy"
          calendar-class="bottom-0"
          input-class="w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
          class="mt-2 text-base"
          v-model="$v.birthday.$model"
          :class="{ 'is-invalid': $v.birthday.$error }">
        </date-picker >
      </client-only>
      <span v-if="!$v.birthday.required" class="error">Pflichtfeld</span>
    </div>

    <div class="mt-10 flex justify-between">
      <button v-if="getUserProfile.profileIsCompleted"
              @click="updateUserProfile()"
              class="font-bold rounded shadow block bg-primary hover:bg-white px-4 py-2">
        Profil aktualisieren
      </button>
      <button v-else
              @click="completeUserRegistration()"
              class="font-bold rounded shadow block bg-primary hover:bg-white px-4 py-2">
        Profil vervollständigen
      </button>
    </div>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex"
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import {de} from 'vuejs-datepicker/dist/locale'

  export default {
    mixins: [validationMixin],
    data() {
      return {
        de: de,
        firstName: "",
        lastName: "",
        birthday: null
      }
    },
    computed: {
      ...mapGetters('profile', ['getUserProfile']),
      parsedBirthday() {
        return Date.parse(this.birthday) / 1000;
      }
    },
    mounted() {
      if (this.$auth.user.name) {
        this.firstName = this.getUserProfile.userAuth0.given_name;
        this.lastName = this.getUserProfile.userAuth0.family_name;
      }
      if(this.getUserProfile.profileIsCompleted) {
        this.birthday = new Date(this.getUserProfile.mangoPayUser.Birthday * 1000 )
      }

      this.$v.$touch();
    },
    validations: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      birthday: {
        required
      }
    },
    methods: {
      ...mapActions("profile", [
        "updateProfile",
        "completeUser"
      ]),
      changePicture(event) {
        let url = URL.createObjectURL(event.target.files[0])
      },
      getSocialProfiles(identityProvider) {
        const identities = this.getUserProfile.userAuth0.identities;
        return identities.filter(identity => identity.provider === identityProvider).length > 0 ? 'Verbunden' : '';
      },
      completeUserRegistration() {
        if(this.$v.$invalid) {
          this.$v.$touch();
        } else {
          this.completeUser({firstName: this.firstName, lastName: this.lastName, birthday: this.parsedBirthday})
        }
      },
      updateUserProfile() {
        if(this.$v.$invalid) {
          this.$v.$touch();
        } else {
          this.updateProfile({firstName: this.firstName, lastName: this.lastName, birthday: this.parsedBirthday})
        }
      }
    }
  }
</script>

<style>
  .cell:hover {
    @apply border-primary !important;
  }
  .selected {
    @apply bg-primary !important;
  }
  .is-invalid {
    @apply border border-red-500;
  }
  .error {
    @apply text-sm text-red-500;
  }
</style>

