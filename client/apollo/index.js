import fetch from 'cross-fetch'
import getConfig from 'next/config'
import { ApolloClient, HttpLink, split, from } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { cache } from 'src/stores/cache'
import { typeDefs } from 'src/stores/schema'

const { publicRuntimeConfig } = getConfig()

const wsLink = token => process.browser ? new WebSocketLink({
    uri: publicRuntimeConfig.SUBSCRIPTION_PATH,
    options: {
      reconnect: true,
      timeout: 3000,
      connectionParams: () => {
        if(token) {
          return {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        }
      }
      // connectionParams: () => {
      //   if(token) {
      //     return {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // }
    }
  }) : null

// const httpLink = token => new HttpLink({
//   uri: publicRuntimeConfig.API_PATH,
//   fetch: (uri, options) => {
//     options.headers.Authorization = token ? `Bearer ${token}` : "";
//     return fetch(uri, options);
//   }
// })
const httpLink = token => createUploadLink({
  uri: publicRuntimeConfig.API_PATH,
  fetch: (uri, options) => {
    options.headers.Authorization = token ? `Bearer ${token}` : "";
    return fetch(uri, options);
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations, undefined, 2)}, Path: ${JSON.stringify(path, undefined, 2)}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const splitLink = token => process.browser ? split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink(token),
    httpLink(token)
  ) : httpLink(token)

const getClient = (token) => {
  return new ApolloClient({
    cache,
    link: from([errorLink, splitLink(token)]),
    typeDefs,
    connectToDevTools: process.env.NODE_ENV !== 'production',
    name: 'concat7-web-client',
    version: '1.0.0',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    }
  })
}

export default getClient