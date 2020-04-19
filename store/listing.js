export const state = () => ({
  searchResults: [],
  selectedProduct: {},
  productSelected: false,
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
  }
}

export const mutations = {
  SET_SEARCH_RESULTS(state, results) {
    state.searchResults = results
  },
  SELECT_PRODUCT(state, product) {
    state.productSelected = true;
    state.selectedProduct = product;
  }
}

export const actions = {
  async search({commit,state}, term) {
    this.$axios.get(`/products/search/${term}`).then( (response) => {
      commit('SET_SEARCH_RESULTS', response.data.items);
    })
  }
}
