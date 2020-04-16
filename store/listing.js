export const state = () => ({
  searchResults: []
})

export const getters = {
  getSearchResults: state => {
    return state.searchResults
  }
}

export const mutations = {
  SET_SEARCH_RESULTS(state, results) {
    state.searchResults = results
  },
}

export const actions = {
  async search({commit,state}, term) {

    let response = await this.$axios.get(`/products/search/${term}`)
    commit('SET_SEARCH_RESULTS', response.data.items);
  }
}
