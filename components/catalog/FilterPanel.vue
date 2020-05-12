<template>
<div class="relative bg-anthrazit flex items-stretch">
  <!-- university filter -->
  <div class="">
    <button @click="isOpenUniversity = !isOpenUniversity" class="flex items-center ml-5 my-5 block h-10 w-32 rounded-full bg-white border-2 hover:bg-gray-300 focus:border-primary">
    <span class="ml-4">Universität
      </span>
      <span>
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAh0lEQVRIie2TQQqAIBBFn13M47TsKOWqTpttRhhEyVIhwg8DguN7MwthpHG8VHGmToMMwRD8QWAA+4Bj5U1RDOCAE1iiu9RPnqX3SElyG3hpXhOSGL6nwHcxwCYivYneIEzuyUz/RhIE1fCcxEfnKriWOAUP5VrAtSRs0mzynKQLXEu6wb+ZCw25LBH/WRQWAAAAAElFTkSuQmCC"/>
    </span>
    </button>
    <button v-if="isOpenUniversity" @click="isOpenUniversity = false" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default"></button>
    <div v-if="isOpenUniversity" class="absolute mt-2 bg-white rounded-lg shadow-xl">
      <input type="text" id="universityDropdown" v-on:keyup="searchForInput('universityDropdown')" placeholder="Suche">
      <ul class="px-2 py-2" id="universityDropdownList">
        <li class="px-4 py-1 mt-1 border-solid border border-gray-400  hover:bg-gray-300" v-for="university in getUniversities" :key="university.id">
          <button @click="loadCourseByUniversityID(university.id)" :value="university.name">{{university.name}}</button>
        </li>
      </ul>
    </div>
  </div>

  <div v-if="getCourses.length > 0" class="">
    <button @click="isOpenCourse = !isOpenCourse" class="flex items-center ml-5 my-5 block h-10 w-32 rounded-full bg-white border-2 hover:bg-gray-300 focus:border-primary">
    <span class="ml-4">Studiengang
      </span>
      <span>
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAh0lEQVRIie2TQQqAIBBFn13M47TsKOWqTpttRhhEyVIhwg8DguN7MwthpHG8VHGmToMMwRD8QWAA+4Bj5U1RDOCAE1iiu9RPnqX3SElyG3hpXhOSGL6nwHcxwCYivYneIEzuyUz/RhIE1fCcxEfnKriWOAUP5VrAtSRs0mzynKQLXEu6wb+ZCw25LBH/WRQWAAAAAElFTkSuQmCC"/>
    </span>
    </button>
    <button v-if="isOpenCourse" @click="isOpenCourse = false" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default"></button>
    <div v-if="isOpenCourse" class="absolute mt-2 bg-white rounded-lg shadow-xl">
      <input type="text" id="courseDropdown" v-on:keyup="searchForInput('courseDropdown')" placeholder="Suche">
      <ul id="courseDropdownList">
        <li class="px-4 py-1 mt-1 border-solid border border-gray-400  hover:bg-gray-300" v-for="course in getCourses" :key="course.id">
          <button>{{course.name}}</button>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
  import {mapGetters, mapActions } from "vuex"


  export default {
    props: ["buttonText","dropdownID"],
    methods: {
      ...mapActions("catalog",["loadCourseByUniversityID"]),
      searchForInput: function(inputID) {
        // Declare variables
        let input, searchText, fullList, listToFilter, a, i, txtValue;
        input = document.getElementById(inputID);
        searchText = input.value.toUpperCase();
        console.log(searchText);
        fullList = document.getElementById(inputID + "List");
        console.log(fullList);
        listToFilter = fullList.getElementsByTagName('li');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < listToFilter.length; i++) {
          a = listToFilter[i].getElementsByTagName("button")[0];
          txtValue = a.textContent || a.innerText;
          if (txtValue.toUpperCase().indexOf(searchText) > -1) {
            listToFilter[i].style.display = "";
          } else {
            listToFilter[i].style.display = "none";
          }
        }
      },
    },
    data(){
      return{
        isOpenUniversity: false,
        isOpenCourse: false,
      }
    },
    computed: {
      ...mapGetters("catalog", ["getUniversities","getCourses"])
    },
  }
</script>

<style scoped>

</style>
