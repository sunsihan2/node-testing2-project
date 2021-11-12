const express = require('express')
const JokesRouter = require('./api/jokesRouter')
const server = express()
server.use(express.json());
server.use('/jokes', JokesRouter)

module.exports = server