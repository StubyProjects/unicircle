export const state = () => ({
  userprofile: {},
  settingTabs: [
    {
      name: 'Einstellungen',
      component: 'Settings'
    }
    ],
  uploadFiles: [],
})

export const getters = {
  getUserProfile: state => {
    return state.userprofile
  },
  getSettingTabs: state => {
    return state.settingTabs
  },
  getUploadFiles: state => {
    return state.uploadFiles
  }
}

export const mutations = {
  DELETE_UPLOAD_FILES(state, index) {
    state.uploadFiles.splice(index, 1)
  },
  UPLOAD_FILES(state, files) {
    state.uploadFiles = files
  },
  SET(state, user) {
    state.userprofile = user
  },
  ACTIVATE_PROFILE(state) {
    state.settingTabs.push({
        name: 'Versand',
        component: 'Shipping'
      },
      {
        name: 'Bezahlung',
        component: 'Wallet'
      })

  }
}

export const actions = {
  async updateProfile({dispatch,commit}, {firstName, lastName, birthday}) {
    await this.$axios.patch("/user/update", {
      firstName,
      lastName,
      birthday: Number(birthday) + 60*60*2
    }).catch(error => {
      console.log(error)
    })

    await dispatch('getUserProfile');
    await this.$auth.fetchUser();
    dispatch('snackbar/setMessage',"Profil aktualisiert", { root: true })
  },

  async updateUserAddress({dispatch,commit}, Address) {
    await this.$axios.patch("/user/updateUserAddress", {
      Address
    }).catch(error => {
      console.log(error)
    })
    await dispatch('getUserProfile');
    dispatch('snackbar/setMessage',"Adresse aktualisiert", { root: true })
  },

  async getUserProfile({state,commit}) {
    const response = await this.$axios.get('/user');
    commit('SET', response.data)

    if(state.settingTabs.length < 3 && state.userprofile.profileIsCompleted) {
      commit('ACTIVATE_PROFILE')
    }

  },

  async completeUser({dispatch,commit, state}, {firstName, lastName, birthday}) {
    await this.$axios.post('/user',{
      firstName,
      lastName,
      birthday: Number(birthday) + 60*60*2,
      email: state.userprofile.userAuth0.email
    }).catch(error => {
      console.log(error)
    })

    await dispatch('getUserProfile');
    await dispatch('notifications/loadNotification', {}, { root: true });
    await this.$auth.fetchUser();
    dispatch('snackbar/setMessage',"Profil vervollständigt", { root: true })
  },

  async kycEmailChange({state}) {
    console.log(state.uploadFiles)
  }
}
