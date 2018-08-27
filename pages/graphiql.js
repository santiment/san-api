import Head from 'next/head'
import { Fragment } from 'react'
import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'
import NoSSR from 'react-no-ssr'
import { parse, print } from 'graphql'

function graphQLFetcher (graphQLParams) {
  if (window) {
    return fetch('https://api-stage.santiment.net//graphql', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams)
    }).then(response => response.json())
  }
}

import React from 'react'

const graphiql = ({ variables, query }) => (
  <Fragment>
    <Head>
      <title>GraphiQL</title>
      <link
        href='https://cdn.jsdelivr.net/npm/graphiql@0.11.10/graphiql.css'
        rel='stylesheet'
      />
      <style>
        {`
        html, body {
          margin: 0;
          overflow: hidden;
          width: 100%;
        }
        html, body, #__next {
          height: 100%;
        }
      `}
      </style>
    </Head>
    <NoSSR>
      <GraphiQL
        fetcher={graphQLFetcher}
        variables={variables}
        query={print(parse(query))}
      />
    </NoSSR>
  </Fragment>
)

graphiql.getInitialProps = function ({ query: { variables, query } }) {
  return { variables, query }
}

export default graphiql
