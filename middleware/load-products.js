
export default async function({store}){
  await store.dispatch('catalog/loadAll');
  await store.dispatch('catalog/loadAllUniversities');
}
