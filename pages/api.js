import { Fragment } from 'react'

if (typeof window !== 'undefined') {
  window.addEventListener('message', ({ origin, data }) => {
    if (origin === 'http://api.localhost:8000') {
      console.log(data.storage)
    }
  })
}

export default () => (
  <Fragment>
    <iframe src='http://api.localhost:8000/' />
    <iframe src='https://api.santiment.net/graphiql' />
    <style jsx>{`
    iframe:first-of-type {
      display: none;
    }

    iframe {
      width: 100%;
      height: 100%;
    }
  `}</style>

  </Fragment>
) // <iframe
//   src='https://app-stage.santiment.net/apiexamples'
//   title='API documentation'
//   className='apidocs-iframe'
// />
