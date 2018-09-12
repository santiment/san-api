import { parse, print } from 'graphql'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import Code from './Code'
import markdownIt from 'markdown-it'

const md = markdownIt()

const host = process.env.NODE_ENV === 'development'
  ? 'localhost:3000'
  : 'api.santiment.net'

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  variables: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired
}

const Example = ({ title, description, variables, query, notes = '' }) => {
  return (
    <Fragment>
      <h3>{title}</h3>
      <div
        className='description'
        dangerouslySetInnerHTML={{
          __html: md.render(description + notes)
        }}
      />
      <p>
        <a
          href={`http://${host}/graphiql?variables=${encodeURIComponent(JSON.stringify(variables))}&query=${encodeURIComponent(query)}`}
          target='_blank'
        >
          Run in explorer
        </a>
      </p>
      <Code type='graphql'>{print(parse(query))}</Code>
      <p>Run in terminal</p>
      <Code type='bash'>{`curl \\\n  -X POST \\\n  -H "Content-Type: application/json" \\\n  --data '{ "query": ${JSON.stringify(query)} }' \\\n  https://api.santiment.net/graphql`}</Code>
    </Fragment>
  )
}

Example.propTypes = propTypes

export default Example
