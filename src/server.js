const express = require('express')
const server = express()

require('dotenv').config()

const { PORT } = process.env

server.use(express.static('build'))
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))