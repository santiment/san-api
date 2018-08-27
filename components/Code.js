import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.string
}

const Code = ({ content, children, type }) => {
  const render = content || children
  return <pre><code className={type}>{render}</code></pre>
}

Code.propTypes = propTypes

export default Code
