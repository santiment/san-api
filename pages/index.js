import { Fragment } from 'react'
import Code from '../components/Code'
import Example from '../components/Example'
import Head from 'next/head'

const host = process.env.NODE_ENV === 'development'
  ? 'api.localhost:8000'
  : 'api.santiment.net'

export default () => (
  <Fragment>
    <Head>
      <link rel='stylesheet' href='http://api.santiment.net/markdown.css' />
    </Head>
    <main role='main'>
      <ol>
        <li>
          <a href='#explorer'>Using the Sanbase API via explorer</a>
        </li>
        <li>
          <a href='#terminal'>Using the Sanbase API from the command line</a>
        </li>
        <li>
          <a href='#examples'>Example metrics provided by our API</a>
        </li>
      </ol>
      <p><a name='explorer' /></p>
      <h1>Using the Sanbase API explorer</h1>
      <p>
        Our
        {' '}
        <a href={`http://${host}/graphiql`} target='_blank'>
          GraphQL Explorer
        </a>
        {' '}
        allows you to experiment with our API.
        You can:
      </p>
      <ul>
        <li>
          Run sample queries on the left pane
        </li>
        <li>
          Read the compiled documentation of our GraphQL schema on the right sidebar
        </li>
      </ul>
      <p>
        <strong>Note:</strong>
        {' '}
        Some of the queries require authorization and a stake of 1000
        {' '}
        <code className='inline'>SAN</code>
        to return realtime data or historical data before 3 months.
      </p>
      <p><a name='terminal' /></p>
      <h1>Using the Sanbase API from the command line</h1>
      <p>
        Our API can be also accessed from the command line. The endpoint is:
        {' '}
        <code className='inline'>http://api.santiment.net/graphql</code>
        .
        You can copy&paste the provided
        {' '}
        <code className='inline'>curl</code>
        {' '}
        examples in the terminal to explore the sample queries.
      </p>
      <p><a name='examples' /></p>
      <h1>Example metrics provided by our API</h1>
      <p>
        Here are some examples of interesting metrics provided by our API. On top of every example there is
        {' '}
        <code className='inline'>Run in explorer</code>
        {' '}
        link.
        Clicking this link will lead you to the Explorer window with prefilled query. All sample queries are accompanied with a
        {' '}
        <code className='inline'>curl</code>
        example that can be run in the terminal.
      </p>

      <Example
        title='Daily Active Addresses'
        description={`Fetch daily active addresses for a project within a given time period. Projects are referred to by a unique identifier (slug).\n\nThis metric includes the number of unique addresses that participated in the transfers of given token during the day.\n\nGrouping by interval works by taking the mean of all daily active address records in the interval. The default value of the interval is 1 day, which yields the exact number of unique addresses for each day.`}
        variables='{}'
        query={`query{dailyActiveAddresses(slug:"santiment",from:"2018-06-01 16:00:00Z",to:"2018-06-05 16:00:00Z",interval:"1d"){activeAddresses,datetime}}`}
      />

      <h3>Token aging (burn rate)</h3>
      <p>
        Fetch burn rate for a project within a given time period, grouped by interval.
        Projects are referred to by a unique identifier (slug).
      </p>
      <p>
        Each transaction has an equivalent burn rate record. The burn rate is calculated
        by multiplying the number of tokens moved by the number of blocks in which they appeared.
        Spikes in burn rate could indicate large transactions or movement of tokens that have been held for a long time.
      </p>
      <p>
        Grouping by interval works by summing all burn rate records in the interval.
      </p>
      <p>
        <a
          href={`http://${host}/graphiql?variables=%7B%7D&query=query%20%7B%0A%20%20burnRate(%0A%20%20%20%20slug:%20%22santiment%22,%0A%20%20%20%20from:%20%222018-01-01%2016:00:00Z%22,%0A%20%20%20%20to:%20%222018-06-05%2016:00:00Z%22,%0A%20%20%20%20interval:%20%221h%22)%20%7B%0A%20%20%20%20%20%20burnRate,%0A%20%20%20%20%20%20datetime%0A%20%20%20%20%7D%0A%7D%0A`}
          target='_blank'
        >
          Run in explorer
        </a>
      </p>
      <Code type='graphql'>{`query {
        burnRate(
          slug: "santiment",
          from: "2018-01-01 16:00:00Z",
          to: "2018-06-05 16:00:00Z",
          interval: "1h") {
            burnRate,
            datetime
          }
        }`}</Code>
      <p>Run in terminal</p>
      <Code type='bash'>{`curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "query {\n  burnRate(\n    slug: \"santiment\",\n    from: \"2018-01-01 16:00:00Z\",\n    to: \"2018-06-05 16:00:00Z\",\n    interval: \"1h\") {\n      burnRate,\n      datetime\n    }\n}\n" }' \
  http://api.santiment.net/graphql`}</Code>
      <h3>Transaction volume</h3>
      <p>
        Fetch total amount of tokens for a project that were transacted on the blockchain, grouped by interval.
        Projects are referred to by a unique identifier (slug).
      </p>
      <p>
        This metric includes only on-chain volume, not volume in exchanges.
      </p>
      <p>
        Grouping by interval works by summing all transaction volume records in the interval.
      </p>
      <p>
        <a
          href={`http://${host}/graphiql?variables=%7B%7D&query=query%20%7B%0A%20%20transactionVolume(%0A%20%20%20%20slug:%20%22santiment%22,%0A%20%20%20%20from:%20%222018-01-01%2016:00:00Z%22,%0A%20%20%20%20to:%20%222018-06-05%2016:00:00Z%22,%0A%20%20%20%20interval:%20%2215m%22)%20%7B%0A%20%20%20%20%20%20transactionVolume,%0A%20%20%20%20%20%20datetime%0A%20%20%20%20%7D%0A%7D%0A`}
          target='_blank'
        >
          Run in explorer
        </a>
      </p>
      <Code type='graphql'>{`query {
        transactionVolume(
          slug: "santiment",
          from: "2018-01-01 16:00:00Z",
          to: "2018-06-05 16:00:00Z",
          interval: "15m") {
            transactionVolume,
            datetime
          }
        }`}</Code>
      <p>Run in terminal</p>
      <Code type='bash'>{`curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "query {\n  transactionVolume(\n    slug: \"santiment\",\n    from: \"2018-01-01 16:00:00Z\",\n    to: \"2018-06-05 16:00:00Z\",\n    interval: \"15m\") {\n      transactionVolume,\n      datetime\n    }\n}\n" }' \
  http://api.santiment.net/graphql`}</Code>
      <h3>Github Activity</h3>
      <p>
        Returns a list of github activity for a given slug and time interval.
      </p>
      <p>Arguments description:</p>
      <ul>
        <li>
          interval - an integer followed by one of:
          {' '}
          <code className='inline'>s</code>
          ,
          {' '}
          <code className='inline'>m</code>
          ,
          {' '}
          <code className='inline'>h</code>
          ,
          {' '}
          <code className='inline'>d</code>
          {' '}
          or
          {' '}
          <code className='inline'>w</code>
        </li>
        <li>
          <p>transform - one of the following:</p>
          <ol>
            <li>
              None (default)
            </li>
            <li>
              movingAverage
            </li>
          </ol>
        </li>
        <li>
          movingAverageIntervalBase - used only if transform is
          {' '}
          <code className='inline'>movingAverage</code>
          .
          An integer followed by one of:
          {' '}
          <code className='inline'>s</code>
          ,
          {' '}
          <code className='inline'>m</code>
          ,
          {' '}
          <code className='inline'>h</code>
          ,
          {' '}
          <code className='inline'>d</code>
          {' '}
          or
          {' '}
          <code className='inline'>w</code>
          , representing time units.
          It is used to calculate the moving avarage interval.
        </li>
      </ul>
      <p>
        <a
          href='http://medium.com/santiment/tracking-github-activity-of-crypto-projects-introducing-a-better-approach-9fb1af3f1c32'
          target='_blank'
        >
          An article explaining our approach to tracking github activity
        </a>
      </p>
      <p>
        <a
          href={`http://${host}/graphiql?variables=%7B%7D&query=query%20%7B%0A%20%20githubActivity(%0A%20%20%20%20slug:%20%22santiment%22,%0A%20%20%20%20from:%20%222017-06-13%2016:00:00Z%22,%0A%20%20%20%20interval:%20%2224h%22)%20%7B%0A%20%20%20%20%20%20activity%0A%20%20%20%20%7D%0A%7D%0A`}
          target='_blank'
        >
          Run in explorer
        </a>
      </p>
      <Code type='graphql'>{`query {
        githubActivity(
          slug: "santiment",
          from: "2017-06-13 16:00:00Z",
          interval: "24h") {
            activity
          }
        }`}</Code>
      <p>Run in terminal</p>
      <Code type='bash'>{`curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "query {\n  githubActivity(\n    slug: \"santiment\",\n    from: \"2017-06-13 16:00:00Z\",\n    interval: \"24h\") {\n      activity\n    }\n}\n" }' \
  http://api.santiment.net/graphql`}</Code>
      <h3>ERC20 Exchange Funds Flow</h3>
      <p>
        Fetch the exchange funds flow for all ERC20 projects in the given interval.
      </p>
      <p>Arguments description:</p>
      <ul>
        <li>
          from - a string representation of datetime value according to the iso8601 standard, e.g. "2018-04-16T10:02:19Z"
        </li>
        <li>
          to - a string representation of datetime value according to the iso8601 standard, e.g. "2018-05-23T10:02:19Z"
        </li>
      </ul>
      <p>Fields description:</p>
      <ul>
        <li>
          ticker - The ticker of the project
        </li>
        <li>
          contract - The contract identifier of the project
        </li>
        <li>
          exchangeIn - How many tokens were deposited in the given period
        </li>
        <li>
          exchangeOut - How many tokens were withdrawn in the given period
        </li>
        <li>
          exchangeDiff - The difference between the deposited and the withdrawn tokens: exchangeIn - exchangeOut
        </li>
        <li>
          exchangeInUsd - How many tokens were deposited in the given period converted to USD based on the daily average price of the token
        </li>
        <li>
          exchangeOutUsd - How many tokens were withdrawn in the given period converted to USD based on the daily average price of the token
        </li>
        <li>
          exchangeDiffUsd - The difference between the deposited and the withdrawn tokens in USD: exchangeInUsd - exchangeOutUsd
        </li>
        <li>
          percentDiffExchangeDiffUsd - The percent difference between exchangeDiffUsd for the current period minus the exchangeDiffUsd for the previous period based on exchangeDiffUsd for the current period: (exchangeDiffUsd for current period - exchangeDiffUsd for previous period) * 100 / abs(exchangeDiffUsd for current period)
        </li>
        <li>
          exchangeVolumeUsd - The volume of all tokens in and out for the given period in USD: exchangeInUsd + exchangeOutUsd
        </li>
        <li>
          percentDiffExchangeVolumeUsd - The percent difference between exchangeVolumeUsd for the current period minus the exchangeVolumeUsd for the previous period based on exchangeVolumeUsd for the current period: (exchangeVolumeUsd for current period - exchangeVolumeUsd for previous period) * 100 / abs(exchangeVolumeUsd for current period)
        </li>
        <li>
          exchangeInBtc - How many tokens were deposited in the given period converted to BTC based on the daily average price of the token
        </li>
        <li>
          exchangeOutBtc - How many tokens were withdrawn in the given period converted to BTC based on the daily average price of the token
        </li>
        <li>
          exchangeDiffBtc - The difference between the deposited and the withdrawn tokens in BTC: exchangeInBtc - exchangeOutBtc
        </li>
        <li>
          percentDiffExchangeDiffBtc - The percent difference between exchangeDiffBtc for the current period minus the exchangeDiffBtc for the previous period based on exchangeDiffBtc for the current period: (exchangeDiffBtc for current period - exchangeDiffBtc for previous period) * 100 / abs(exchangeDiffBtc for current period)
        </li>
        <li>
          exchangeVolumeBtc - The volume of all tokens in and out for the given period in BTC: exchangeInBtc + exchangeOutBtc
        </li>
        <li>
          percentDiffExchangeVolumeBtc - The percent difference between exchangeVolumeBtc for the current period minus the exchangeVolumeBtc for the previous period based on exchangeVolumeBtc for the current period: (exchangeVolumeBtc for current period - exchangeVolumeBtc for previous period) * 100 / abs(exchangeVolumeBtc for current period)
        </li>
      </ul>
      {/* <p>
        <a
          href={`http://${host}/graphiql?variables=%7B%7D&query=query%20%7B%0A%20%20erc20ExchangeFundsFlow(%0A%20%20%20%20from:%20%222018-04-16T10:02:19Z%22,%0A%20%20%20%20to:%20%222018-05-23T10:02:19Z%22)%20%7B%0A%20%20%20%20%20%20ticker,%0A%20%20%20%20%20%20contract,%0A%20%20%20%20%20%20exchangeIn,%0A%20%20%20%20%20%20exchangeOut,%0A%20%20%20%20%20%20exchangeDiff,%0A%20%20%20%20%20%20exchangeInUsd,%0A%20%20%20%20%20%20exchangeOutUsd,%0A%20%20%20%20%20%20exchangeDiffUsd,%0A%20%20%20%20%20%20percentDiffExchangeDiffUsd,%0A%20%20%20%20%20%20exchangeVolumeUsd,%0A%20%20%20%20%20%20percentDiffExchangeVolumeUsd,%0A%20%20%20%20%20%20exchangeInBtc,%0A%20%20%20%20%20%20exchangeOutBtc,%0A%20%20%20%20%20%20exchangeDiffBtc,%0A%20%20%20%20%20%20percentDiffExchangeDiffBtc,%0A%20%20%20%20%20%20exchangeVolumeBtc,%0A%20%20%20%20%20%20percentDiffExchangeVolumeBtc%0A%20%20%20%20%7D%0A%7D%0A`}
          target='_blank'
        >
          Run in explorer
        </a> */}
      {/* </p>
      <Code type='graphql'>{`query {
        erc20ExchangeFundsFlow(
          from: "2018-04-16T10:02:19Z",
          to: "2018-05-23T10:02:19Z") {
            ticker,
            contract,
            exchangeIn,
            exchangeOut,
            exchangeDiff,
            exchangeInUsd,
            exchangeOutUsd,
            exchangeDiffUsd,
            percentDiffExchangeDiffUsd,
            exchangeVolumeUsd,
            percentDiffExchangeVolumeUsd,
            exchangeInBtc,
            exchangeOutBtc,
            exchangeDiffBtc,
            percentDiffExchangeDiffBtc,
            exchangeVolumeBtc,
            percentDiffExchangeVolumeBtc
          }
        }`}</Code> */}
      {/* <p>Run in terminal</p>
      <Code type='bash'>{`curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "query {\n  erc20ExchangeFundsFlow(\n    from: \"2018-04-16T10:02:19Z\",\n    to: \"2018-05-23T10:02:19Z\") {\n      ticker,\n      contract,\n      exchangeIn,\n      exchangeOut,\n      exchangeDiff,\n      exchangeInUsd,\n      exchangeOutUsd,\n      exchangeDiffUsd,\n      percentDiffExchangeDiffUsd,\n      exchangeVolumeUsd,\n      percentDiffExchangeVolumeUsd,\n      exchangeInBtc,\n      exchangeOutBtc,\n      exchangeDiffBtc,\n      percentDiffExchangeDiffBtc,\n      exchangeVolumeBtc,\n      percentDiffExchangeVolumeBtc\n    }\n}\n" }' \
  http://api.santiment.net/graphql`}</Code> */}

      <Example
        title='ERC20 Exchange Funds Flow'
        description={'#test'}
        variables={'{}'}
        query={`query{erc20ExchangeFundsFlow(from:"2018-04-16T10:02:19Z",to:"2018-05-23T10:02:19Z"){ticker,contract,exchangeIn,exchangeOut,exchangeDiff,exchangeInUsd,exchangeOutUsd,exchangeDiffUsd,percentDiffExchangeDiffUsd,exchangeVolumeUsd,percentDiffExchangeVolumeUsd,exchangeInBtc,exchangeOutBtc,exchangeDiffBtc,percentDiffExchangeDiffBtc,exchangeVolumeBtc,percentDiffExchangeVolumeBtc}}`}
      />
      <h3>Social Volume</h3>
      <p>
        Returns a list of mentions count for a given project and time interval.
      </p>
      <p>Arguments description:</p>
      <ul>
        <li>
          slug - a string uniquely identifying a project
        </li>
        <li>
          interval - an integer followed by one of:
          {' '}
          <code className='inline'>m</code>
          ,
          {' '}
          <code className='inline'>h</code>
          ,
          {' '}
          <code className='inline'>d</code>
          ,
          {' '}
          <code className='inline'>w</code>
        </li>
        <li>
          from - a string representation of datetime value according to the iso8601 standard, e.g. "2018-04-16T10:02:19Z"
        </li>
        <li>
          to - a string representation of datetime value according to the iso8601 standard, e.g. "2018-04-16T10:02:19Z"
        </li>
        <li>
          <p>socialVolumeType - one of the following:</p>
          <ol>
            <li>
              PROFESSIONAL_TRADERS_CHAT_OVERVIEW
            </li>
            <li>
              TELEGRAM_CHATS_OVERVIEW
            </li>
            <li>
              TELEGRAM_DISCUSSION_OVERVIEW
              It is used to select the source of the mentions count.
            </li>
          </ol>
        </li>
      </ul>
      <p>
        <a
          href={`http://${host}/graphiql?variables=%7B%7D&query=query%20%7B%0A%20%20socialVolume(%0A%20%20%20%20slug:%20%22dragonchain%22,%0A%20%20%20%20from:%20%222018-04-16T10:02:19Z%22,%0A%20%20%20%20to:%20%222018-05-23T10:02:19Z%22,%0A%20%20%20%20interval:%221h%22,%0A%20%20%20%20socialVolumeType:%20TELEGRAM_DISCUSSION_OVERVIEW%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20mentionsCount,%0A%20%20%20%20%20%20datetime%0A%20%20%20%20%7D%0A%7D%0A`}
          target='_blank'
        >
          Run in explorer
        </a>
      </p>
      <Code type='graphql'>{`query {
  socialVolume(
    slug: "dragonchain",
    from: "2018-04-16T10:02:19Z",
    to: "2018-05-23T10:02:19Z",
    interval:"1h",
    socialVolumeType: TELEGRAM_DISCUSSION_OVERVIEW
    ) {
      mentionsCount,
      datetime
    }
}`}</Code>

      <p>Run in terminal</p>
      <Code type='bash'>{`curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "query {\n  socialVolume(\n    slug: \"dragonchain\",\n    from: \"2018-04-16T10:02:19Z\",\n    to: \"2018-05-23T10:02:19Z\",\n    interval:\"1h\",\n    socialVolumeType: TELEGRAM_DISCUSSION_OVERVIEW\n    ) {\n      mentionsCount,\n      datetime\n    }\n}\n" }' \
  http://api.santiment.net/graphql`}</Code>

      <h3>Social Volume Projects</h3>
      <p>Returns a list of slugs for which there is social volume data.</p>
      <p>
        <a
          href={`http://${host}/graphiql?variables=%7B%7D&query=query%20%7B%0A%20%20socialVolumeProjects%0A%7D%0A`}
          target='_blank'
        >
          Run in explorer
        </a>
      </p>
      <Code type='graphql'>{`query {
  socialVolumeProjects
}`}</Code>

      <p>Run in terminal</p>
      <Code type='bash'>{`curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "query {\n  socialVolumeProjects\n}\n" }' \
  http://api.santiment.net/graphql`}</Code>
    </main>
  </Fragment>
)
