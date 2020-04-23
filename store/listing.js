export const state = () => ({
  searchResults: [],
  selectedProduct: {},
  productSelected: false,
  conditions: []
})

export const getters = {
  getSearchResults: state => {
    return state.searchResults
  },
  getSelectedProduct: state => {
    return state.selectedProduct
  },
  isProductSelected: state => {
    return state.productSelected
  },
  getConditions: state => {
    return state.conditions
  }
}

export const mutations = {
  SET_SEARCH_RESULTS(state, results) {
    state.searchResults = results
  },
  SELECT_PRODUCT(state, product) {
    state.productSelected = true;
    state.selectedProduct = product;
  },
  SET_CONDITIONS(state, conditions) {
    state.conditions = conditions;
  }
}

export const actions = {
  async search({commit}, term) {
    this.$axios.get(`/products/search/${term}`).then( (response) => {
      commit('SET_SEARCH_RESULTS', response.data.items);
    })
  },
  async loadConditions({commit}) {
    let response = await this.$axios.get("/conditions")
    commit('SET_CONDITIONS', response.data);
  }
}
