<template>
  <nav class="flex items-center justify-between bg-white px-5 py-5" :class="{'scrolled': !view.atTopOfPage}">

    <div class="flex-none pl-6 pr-2">
        <span class="font-bold text-xl text-anthrazit ">Unicircle</span>
    </div>

    <div class="flex w-6/12 justify-between">

      <div class="flex justify-end w-2/6 text-anthrazit font-bold">
          <a href="#" class="rounded-full block hover:text-white hover:bg-primary px-4 py-2 mr-2">
            Katalog
          </a>
      </div>

      <div class="w-4/6 relative lg:block">
        <label>
          <input class="w-full rounded-full border-2 border-primary h-10 pl-4 pr-8 pb-1 focus:outline-none"
            type="search" name="suchen" placeholder="Suchen">
        </label>
        <button type="submit" class="absolute right-0 top-0 mt-3 mr-4 focus:outline-none">
          <svg class="text-primary hover:text-blue h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
               version="1.1" id="Capa_1" x="0px" y="0px"
               viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;"
               xml:space="preserve"
               width="512px" height="512px">
                <path
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
              </svg>
        </button>
      </div>
    </div>

    <div class="flex px-8">
      <div class="flex text-anthrazit font-bold">
        <a href="#" class="rounded-full block hover:bg-primary px-4 py-2 mr-2">
          So funktionierts
        </a>
      </div>
      <div class="flex text-anthrazit font-bold">
        <a href="#" class="rounded-full shadow hover:bg-primary px-4 py-2 ml-2">Einloggen</a>
      </div>
    </div>

  </nav>
</template>

<script>
    export default {
        name: "TheHeader",
        data () {
          return {
            view: {
              atTopOfPage: true
            }
          }
        },
        beforeMount () {
          window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
          handleScroll() {
            if(window.pageYOffset>0){
              // user is scrolled
              if(this.view.atTopOfPage) this.view.atTopOfPage = false
            }else{
              // user is at top of page
              if(!this.view.atTopOfPage) this.view.atTopOfPage = true
            }
          }
        }
    }

</script>

<style scoped>
  nav.scrolled {
    @apply shadow fixed w-full;
  }
</style>
