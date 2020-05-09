export const state = () => ({
  notifications: [],
})

export const getters = {
  getNotifications: state => {
    return state.notifications
  }
}

export const mutations = {
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications
  }
}

export const actions = {
  async loadNotification({commit}) {
    const response = await this.$axios.get('/notification/user')
    commit('SET_NOTIFICATIONS', response.data)
  },
  async deleteNotification({commit}, id) {
    await this.$axios.patch(`/notification/user/${id}`)
  }
}
