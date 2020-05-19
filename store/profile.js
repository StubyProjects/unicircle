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
  async updateProfile({commit}, {firstName, lastName, birthday}) {
    await this.$axios.patch("/user/update", {
      firstName,
      lastName,
      birthday: Number(birthday) + 60*60*2
    }).catch(error => {
      console.log(error)
    })
    await this.$auth.fetchUser();
  },

  async getUserProfile({commit}) {
    const response = await this.$axios.get('/user');
    commit('SET', response.data)
  },

  async completeUser({commit, state}, {firstName, lastName, birthday}) {
    await this.$axios.post('/user',{
      firstName,
      lastName,
      birthday: Number(birthday) + 60*60*2,
      email: state.userprofile.userAuth0.email
    }).catch(error => {
      console.log(error)
    })
  }
}
