export const actions = {
  async nuxtServerInit({dispatch}) {
    await dispatch('listing/loadConditions');
  }
}
