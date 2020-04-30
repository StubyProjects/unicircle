export const state = () => ({
  searchResults: [],
  searchResultType: "",
  selectedProduct: {},
  productSelected: false,
  conditions: [],
  productImages: [],
  productListingCreated: false,
})

export const getters = {
  getSearchResults: state => {
    return state.searchResults
  },
  getSearchResultType: state => {
    return state.searchResultType
  },
  getSelectedProduct: state => {
    return state.selectedProduct
  },
  isProductSelected: state => {
    return state.productSelected
  },
  getConditions: state => {
    return state.conditions
  },
  getProductImages: state => {
    return state.productImages
  },
  isProductListingCreated: state => {
    return state.productListingCreated
  }
}

export const mutations = {
  SET_SEARCH_RESULTS(state, results) {
    state.searchResults = results
  },
  SET_SEARCH_RESULT_TYPE(state, type) {
    state.searchResultType = type
  },
  SELECT_PRODUCT(state, product) {
    state.productSelected = true;
    state.selectedProduct = product;
  },
  SET_CONDITIONS(state, conditions) {
    state.conditions = conditions;
  },
  ADD_PRODUCT_IMAGE(state, image) {
    state.productImages.push(image)
  },
  DELETE_PRODUCT_IMAGE(state, index) {
    state.productImages.splice(index,1)
  },
  SET_PRODUCT_CREATED(state) {
    state.productListingCreated = !state.productListingCreated;
  }
}

export const actions = {
  async search({commit}, term) {
    this.$axios.get(`/products/search/${term}`).then( (response) => {

      if(response.data.items) {
        commit('SET_SEARCH_RESULTS', response.data.items);
        commit("SET_SEARCH_RESULT_TYPE","google");
      } else {
        commit('SET_SEARCH_RESULTS', response.data);
        commit("SET_SEARCH_RESULT_TYPE","ownDB");
      }

    })
  },
  async loadConditions({commit}) {
    let response = await this.$axios.get("/conditions")
    commit('SET_CONDITIONS', response.data);
  },

  async createProduct({commit, state, dispatch}, {price, condition}) {
    const product = state.selectedProduct
    const productInfo = product.volumeInfo;

    let response = await this.$axios.post("/products/new", {
      title: productInfo.title,
      subtitle: productInfo.subtitle ? productInfo.subtitle : "",
      description: productInfo.description ? productInfo.description : "nicht verfügbar",
      isbn13: productInfo.industryIdentifiers ? productInfo.industryIdentifiers[0].identifier : "nicht verfügbar",
      isbn10: productInfo.industryIdentifiers ? productInfo.industryIdentifiers[1].identifier: "nicht verfügbar",
      authors: await productInfo.authors.map((name) => ({name})),
      listPrice: product.saleInfo.listPrice ? product.saleInfo.listPrice.amount.toString() : "Preis nicht verfügbar",
      imageUrl: productInfo.imageLinks ? productInfo.imageLinks.thumbnail : "kein Bild verfügbar",
      categories: productInfo.categories ? await productInfo.categories.map((title) => ({title})) : [],
      publisher: productInfo.publisher ? productInfo.publisher : "nicht verfügbar",
    }).catch(error => {
      console.log(error)
    })

    if(response.status && response.status === 201) {

      await dispatch("createListing", { productId: response.data.id, price, condition })
      commit("SET_PRODUCT_CREATED");
    }
  },

  async createListing({commit, state}, { productId, price, condition }) {
    let listing = await this.$axios.post("/products/list", {
      productId,
      conditionName: condition.name,
      conditionDescription: condition.description,
      price: Number(price),
      images: state.productImages
    }).catch(error => {
      console.log(error)
    })
  }
}
