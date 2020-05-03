export const actions = {
  async updateProfile({commit}, {fullname,url}) {

    const response = await this.$axios.patch("/user/updatePicture", {
      picture: 'https://lh3.googleusercontent.com/-uJzSPc6dTDs/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPONA_Pnu6BqCRxT_oN4ZEADZaRbA/photo.jpg',
      name: fullname !== this.$auth.user.name ? fullname: this.$auth.user.name
    })
    await this.$auth.fetchUser();
  }
}
