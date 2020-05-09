export const state = () => ({
  userprofile: {},
})

export const getters = {
  getUserProfile: state => {
    return state.userprofile
  }
}

export const mutations = {
  SET(state, user) {
    state.userprofile = user
  },
}

export const actions = {
  async updateProfile({commit}, { fullname }) {

    const response = await this.$axios.patch("/user/updatePicture", {
      picture: 'https://lh3.googleusercontent.com/-uJzSPc6dTDs/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPONA_Pnu6BqCRxT_oN4ZEADZaRbA/photo.jpg',
      name: fullname !== this.$auth.user.name ? fullname: this.$auth.user.name
    })
    await this.$auth.fetchUser();
  },

  async getUserProfile({commit}) {
    const response = await this.$axios.get('/user');
    commit('SET', response.data)
  }

}
