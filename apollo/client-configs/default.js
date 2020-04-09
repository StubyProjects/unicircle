import {InMemoryCache} from "apollo-cache-inmemory";

export default () => ({
  httpEndpoint: 'http://localhost:8000/graphql/',
  httpLinkOptions: {
    credentials: 'same-origin'
  },
  tokenName: 'auth._token.auth0',
  cache: new InMemoryCache({
    addTypename: false
  })
})
