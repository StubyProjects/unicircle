export default async function({store, redirect}){
  if(store.state.auth.loggedIn) {
    await store.dispatch('profile/getUserProfile');

    if(store.getters['profile/getUserProfile'].userAuth0.identities[0].isSocial) {
      return redirect('/profile')
    }
  }
}
