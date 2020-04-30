export const state = () => ({
  profileDropDownActivated: false
})

export const getters = {
  isDropDownActivated: state => {
    return state.profileDropDownActivated
  }
}

export const mutations = {
  TOGGLE_PROFILE_DROPDOWN(state) {
    console.log(state.profileDropDownActivated)
    state.profileDropDownActivated = !state.profileDropDownActivated
  },
}
