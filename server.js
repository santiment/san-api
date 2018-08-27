const express = require('express')
const next = require('next')
const { parse } = require('url')
const http = require('http')

const vhost = require('vhost')
const st = require('node-static')
const file = new st.Server('.')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = 8000

app.prepare().then(() => {
  const server = express()

  const httpServer = http.createServer(function (req, res) {
    file.serve(req, res)
  })

  server.use(
    vhost('app.localhost', function (req, res) {
      httpServer.emit('request', req, res)
    })
  )
  server.use(
    vhost('api.localhost', (req, res, next) => {
      return handle(req, res, parse(req.url, true))
    })
  )

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`Server ready on http://api.localhost:${PORT}`)
  })
})
