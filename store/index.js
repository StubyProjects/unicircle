export const state = () => ({
  profileDropDownActivated: false,
  notificationDropdownActivated: false
})

export const getters = {
  isProfileDropDownActivated: state => {
    return state.profileDropDownActivated
  },
  isNotificationDropDownActivated: state => {
    return state.notificationDropdownActivated
  }
}

export const mutations = {
  TOGGLE_PROFILE_DROPDOWN(state) {
    state.profileDropDownActivated = !state.profileDropDownActivated
  },
  CLOSE_PROFILE_DROPDOWN(state) {
    state.profileDropDownActivated = false
  },
  TOGGLE_NOTIFICATION_DROPDOWN(state) {
    state.notificationDropdownActivated = !state.notificationDropdownActivated
  },
  CLOSE_NOTIFICATION_DROPDOWN(state) {
    state.notificationDropdownActivated = false
  },
}
