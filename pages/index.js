import Head from 'next/head'
import Docs from '../components/Docs/Docs'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import errorLink from '../components/apollo/error-link'
import retryLink from '../components/apollo/retry-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { from } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'
import getConfig from 'next/config'
import { argumentDefaults } from '../defaults'
import './markdown.css'

const { publicRuntimeConfig } = getConfig()

const httpLink = createHttpLink({
  uri: `${publicRuntimeConfig.backendUrl}/graphql`,
  fetch
})

const client = new ApolloClient({
  link: from([httpLink, errorLink, retryLink]),
  cache: new InMemoryCache()
})

argumentDefaults.from = `"${new Date(
  Date.now() - 1000 * 60 * 60 * 24 * 30
).toISOString()}"`
argumentDefaults.to = `"${new Date(
  Date.now() - 1000 * 60 * 60 * 24 * 16
).toISOString()}"`

const IndexPage = props => {
  return (
    <ApolloProvider client={client}>
      <Head>
        <link rel='stylesheet' href='/_next/static/style.css' />
      </Head>
      <Docs />
    </ApolloProvider>
  )
}

export default IndexPage
