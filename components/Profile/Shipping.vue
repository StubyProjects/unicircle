<template>
    <div>

      <div class="mt-5">
        <h3 class="font-bold">Adresse</h3>
        <label for="addressline1">
          <input id="addressline1"
                 v-model="$v.Address.AddressLine1.$model"
                 :class="{ 'is-invalid': $v.Address.AddressLine1.$error }"
                 class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                 type="text" name="Adresse">
        </label>
        <span v-if="!$v.Address.AddressLine1.required" class="error">Pflichtfeld</span>
      </div>

      <div class="mt-5">
        <h3 class="font-bold">Wohnung, Zimmer, usw. (optional)</h3>
        <label for="addressline2">
          <input id="addressline2"
                 v-model="Address.AddressLine2"
                 class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                 type="text" name="Adresse2">
        </label>
      </div>

      <div class="mt-5">
        <h3 class="font-bold">Stadt</h3>
        <label for="city">
          <input id="city"
                 v-model="$v.Address.City.$model"
                 :class="{ 'is-invalid': $v.Address.City.$error }"
                 class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                 type="text" name="Stadt">
        </label>
        <span v-if="!$v.Address.City.required" class="error">Pflichtfeld</span>
      </div>

      <div class="mt-5">
        <h3 class="font-bold">Postleitzahl</h3>
        <label for="postalcode">
          <input id="postalcode"
                 v-model="$v.Address.PostalCode.$model"
                 :class="{ 'is-invalid': $v.Address.PostalCode.$error }"
                 class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none"
                 type="text" name="Stadt">
        </label>
        <span v-if="!$v.Address.PostalCode.required" class="error">Pflichtfeld</span>
        <span v-if="!$v.Address.PostalCode.numeric" class="error">
          Bitte gib eine valide Postleitzahl an
        </span>
      </div>

      <div class="block mt-5">
        <h3 class="font-bold">Land</h3>
        <label for="country">
          <select id="country" v-model="Address.Country" class="mt-2 w-full rounded shadow h-10 pl-4 pr-8 pb-1 focus:outline-none">
            <option v-for="(country, countryIndex) in Countries" :value="country.code" :key="countryIndex">
              {{country.name}}
            </option>
          </select>
        </label>
      </div>

      <div class="mt-10">
        <button @click="updateAddress()" class="font-bold rounded shadow block bg-primary hover:bg-white px-4 py-2">
          Änderungen speichern
        </button>
      </div>

    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required,numeric } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        mounted() {
          if (this.$store.getters['profile/getUserProfile'].profileIsCompleted) {
            Object.assign(this.Address , this.$store.getters['profile/getUserProfile'].mangoPayUser.Address);
          }
        },
        data() {
          return {
            Countries: [
              {
                name: 'Deutschland',
                code: 'DE'
              },
              {
                name: 'Frankreich',
                code: 'FR'
              }
            ],
            Address: {
              AddressLine1: "",
              AddressLine2: "",
              City: "",
              Region: "",
              PostalCode: "",
              Country: "DE"
            }
          }
        },
        validations: {
          Address: {
            AddressLine1: {
              required
            },
            City: {
              required
            },
            PostalCode: {
              required,
              numeric
            },
            Country: {
              required
            }
          }
        },
        methods: {
          ...mapActions('profile',[
            'updateUserAddress'
          ]),
          updateAddress() {
            if(this.$v.$invalid) {
              this.$v.$touch();
            } else {
              this.updateUserAddress(this.Address)
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
