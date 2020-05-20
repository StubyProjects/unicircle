export const state = () => ({
  isActive: false,
  message: ""
})

export const getters = {
  getMessage: state => {
    return state.message
  },
  isActive: state => {
    return state.isActive
  }
}

export const mutations = {
  OPEN(state) {
    state.isActive = true
  },
  CLOSE(state) {
    state.isActive = false
  },
  SET_MESSAGE(state, message) {
    state.message = message
  },
}

export const actions = {
  setMessage({commit}, message) {
    commit('SET_MESSAGE', message)
    commit('OPEN', message)

    setTimeout( () => {
      commit('CLOSE')
    },3500)
  }
}
