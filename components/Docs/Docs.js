import Example from '../Example'
import DocsHeader from './Header'
import { graphql } from 'react-apollo'
import { introspectionQuery, buildClientSchema } from 'graphql'
import { examples } from '../../defaults'
import { formatQueryToString } from './utils'
import gql from 'graphql-tag'

const Docs = ({ data }) => {
  let schema
  let queryFields
  if (data.__schema) {
    schema = buildClientSchema(data)
    queryFields = schema.getQueryType().getFields()
  }
  return (
    <main role='main'>
      <DocsHeader />
      <h1>Using the Sanbase API explorer</h1>
      {queryFields &&
        examples.map(({ name, title, skipArgs, notes }) => {
          const field = queryFields[name]
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
