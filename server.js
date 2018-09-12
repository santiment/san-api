const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    handle(req, res, parsedUrl)
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})

// const PORT = 8000

// app.prepare().then(() => {
//   const server = express()

//   const httpServer = http.createServer(function (req, res) {
//     file.serve(req, res)
//   })

//   server.use(
//     vhost('app.localhost', function (req, res) {
//       httpServer.emit('request', req, res)
//     })
//   )
//   server.use(
//     vhost('api.localhost', (req, res, next) => {
//       return handle(req, res, parse(req.url, true))
//     })
//   )

//   server.listen(PORT, err => {
//     if (err) throw err
//     console.log(`Server ready on http://api.localhost:${PORT}`)
//   })
// })
