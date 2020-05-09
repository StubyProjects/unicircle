export const state = () => ({
  products: [],
})

export const getters = {
  getProducts: state => {
    return state.products
  }
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  CREATE(state, product) {
    state.products = state.products.concat(product)
  }
}

export const actions = {
  async loadAll({commit}) {
    let {data: products} = await this.$axios.get('products', {params: {page: 1}});

    commit('SET_PRODUCTS', products)
  },
  async create({commit, state}, product) {
    let response = await this.$axios.post('/products', product)

    let newProduct = response.data;

    commit('CREATE', newProduct)

  }
}
