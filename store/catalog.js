export const state = () => ({
  products: [],
  universities:[],
  courses:[]
})

export const getters = {
  getProducts: state => {
    return state.products
  },
  getUniversities: state =>{
    return state.universities
  },
  getCourses: state =>{
    return state.courses
  }
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_UNIVERSITIES(state, universities){
    state.universities = universities
  },
  SET_COURSESBYUNIID(state, courses){
    state.courses = courses
  }

}

export const actions = {
  async loadAll({commit}) {
    let {data: products} = await this.$axios.get('products', {params: {page: 1}});

    commit('SET_PRODUCTS', products)
  },
  async loadAllUniversities({commit}) {
    let {data: universities} = await this.$axios.get('university');

    commit('SET_UNIVERSITIES', universities)
  },
  async loadCourseByUniversityID({commit},uniID){
    let {data: courses} = await this.$axios.get("university/" + uniID + "/courses");

    commit('SET_COURSESBYUNIID', courses)
  }
}
