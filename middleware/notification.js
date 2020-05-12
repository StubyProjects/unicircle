
export default async function({store}){
  if(store.state.auth.loggedIn) {
    await store.dispatch('notifications/loadNotification');
  }
}
