import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export default `1. [Using the Sanbase API via explorer](#explorer)
2. [Using the Sanbase API from the command line](#terminal)
3. [Example metrics provided by our API](#examples)

<a name='explorer'></a>

# Using the Sanbase API explorer

Our [GraphQL Explorer](${publicRuntimeConfig.backendUrl}/graphiql){target="_blank"} allows you to experiment with our API.
You can:
* Run sample queries on the left pane
* Read the compiled documentation of our GraphQL schema on the right sidebar

**Note:** Some of the queries require authorization and a stake of ${publicRuntimeConfig.requiredSanStakeFullAccess || '1000'} \`SAN\`
to return realtime data or historical data before 3 months.

<a name='terminal'></a>

# Using the Sanbase API from the command line

Our API can be also accessed from the command line. The endpoint is: \`${publicRuntimeConfig.backendUrl}\`.
You can copy&paste the provided \`curl\` examples in the terminal to explore the sample queries.

<a name='examples'></a>

# Example metrics provided by our API

Here are some examples of interesting metrics provided by our API. On top of every example there is \`Run in explorer\` link.
Clicking this link will lead you to the Explorer window with prefilled query. All sample queries are accompanied with a \`curl\`
example that can be run in the terminal.`
