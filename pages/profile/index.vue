<template>
  <div class="max-w-4xl mt-16 mx-auto">
    <div>
      <h1 class="text-2xl font-bold text-anthrazit">Mein Profil</h1>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-5">
      <div class="col-span-1">
        <ul>

          <li
            v-for="tab in tabs"
            :class="['text-xl', 'hover:text-primary', 'cursor-pointer', 'mt-2', { active: currentTab === tab.component }]"
            @click="currentTab = tab.component">
            {{tab.name}}
          </li>


        </ul>
      </div>
      <div class="col-span-2">
        <component :is="currentTabComponent"></component>
      </div>
    </div>

  </div>
</template>

<script>
  import Settings from "../../components/Profile/Settings";
  import Shipping from "../../components/Profile/Shipping";
  import Wallet from "../../components/Profile/Wallet";

  export default {
    data() {
      return {
        currentTab: 'Settings',
        tabs: [
          {
            name:'Einstellungen',
            component: 'Settings'
          },
          {
            name: 'Versand',
            component: 'Shipping'
          },
          {
            name: 'Bezahlung',
            component: 'Wallet'
          }
        ]
      }
    },
    computed: {
      currentTabComponent() {
        return "app-" + this.currentTab.toLowerCase();
      }
    },
    components: {
      appSettings: Settings,
      appShipping: Shipping,
      appWallet: Wallet
    },
    middleware: ['auth', 'userprofile', 'notification'],
  }
</script>

<style scoped>
  .active {
    @apply text-primary;
  }
</style>
