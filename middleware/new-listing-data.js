export default async function({store}){
  await store.dispatch('listing/loadConditions');
}
