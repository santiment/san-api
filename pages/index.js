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

const httpLink = createHttpLink({
  uri: 'https://api-stage.santiment.net/graphql',
  fetch
})

const client = new ApolloClient({
  link: from([httpLink, errorLink, retryLink]),
  cache: new InMemoryCache()
})

const IndexPage = props => {
  console.log('TCL: props', props)

  return (
    <ApolloProvider client={client}>
      <Head>
        <link rel='stylesheet' href='http://api.santiment.net/markdown.css' />
      </Head>
      <Docs />
    </ApolloProvider>
  )
}

export default IndexPage
