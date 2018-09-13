import Example from './Example'
import DocsHeader from './DocsHeader'
import { graphql } from 'react-apollo'
import { introspectionQuery, buildClientSchema } from 'graphql'
import gql from 'graphql-tag'

const examples = [
  {
    name: 'dailyActiveAddresses',
    title: 'Daily Active Addresses'
  },
  {
    name: 'burnRate',
    title: 'Token aging (burn rate)'
  },
  {
    name: 'transactionVolume',
    title: 'Transaction volume'
  },
  {
    name: 'exchangeFundsFlow',
    title: 'Exchange Funds Flow'
  },
  {
    name: 'githubActivity',
    title: 'Github Activity',
    skipArgs: ['movingAverageIntervalBase', 'ticker', 'to', 'transform'],
    notes: `\n\n\n[An article explaining our approach to tracking github activity](https://medium.com/santiment/tracking-github-activity-of-crypto-projects-introducing-a-better-approach-9fb1af3f1c32){:target="_blank"}`
  },
  {
    name: 'erc20ExchangeFundsFlow',
    title: 'ERC20 Exchange Funds Flow'
  },
  {
    name: 'socialVolume',
    title: 'Social Volume'
  },
]

const defaults = {
  slug: `"dragonchain"`,
  from: `"2018-08-01 16:00:00Z"`,
  to: `"2018-08-05 16:00:00Z"`,
  interval: `"1d"`,
  source: 'TELEGRAM',
  searchText: `"btc moon"`,
  socialVolumeType: 'TELEGRAM_DISCUSSION_OVERVIEW'
}

const getDefaultArgValue = arg =>
  (arg.defaultValue ? `"${arg.defaultValue}"` : defaults[arg.name])

const constructQueryArguments = (args, skipArgs = []) =>
  args
    .filter(arg => !skipArgs.includes(arg.name))
    .map(arg => arg.name + ':' + getDefaultArgValue(arg))
    .join(',')

const constructRecursiveProperties = type => {
  const fields = type.getFields()
  console.log(type.getFields())
  return Object.keys(fields)
    .map(
      field =>
        `${fields[field].name}{${constructPropertiesFromType(fields[field].type)}}`
    )
    .join(',')
}

const constructPropertiesFromType = type => {

  let res = type.ofType
    ? console.log('type.ofType', type.ofType) && Object.keys(type.ofType.getFields()).join(',')
    : console.log('type', type) && constructRecursiveProperties(type)
  
  console.log(res)
  return res
}
const getObjectClassName = obj => obj && obj.constructor.name

const formatQueryToString = ({ name, type, args }, skipArgs) => {
  if (getObjectClassName(type.ofType) === 'GraphQLScalarType') {
    return name
  }
  return `${name}(${constructQueryArguments(args, skipArgs)}){${constructPropertiesFromType(type)}}`
}

const Docs = ({ data }) => {
  console.log('TCL: props', data)
  let schema
  let queryFields
  if (data.__schema) {
    schema = buildClientSchema(data)
    queryFields = schema.getQueryType().getFields()
    console.log('queryFields: ', queryFields)
  }
  return (
    <main role='main'>
      <DocsHeader />
      <p><a name='explorer' /></p>
      <h1>Using the Sanbase API explorer</h1>
      {queryFields &&
        examples.map(({ name, title, skipArgs, notes }) => {
          const field = queryFields[name]
          console.log(field)
          return (
            <Example
              key={name}
              title={title}
              description={field.description}
              notes={notes}
              variables={{}}
              query={`query{${formatQueryToString(field, skipArgs)}}`}
            />
          )
        })}

    </main>
  )
}

// export default Docs
export default graphql(gql(introspectionQuery))(Docs)
