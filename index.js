// Modulos
require('dotenv').config()
const express = require('express')
const consign = require('consign')
const app = express()

consign({
  verbose: false,
  cwd: 'src',
  loggingType: 'info',
  locale: 'pt-br'
}).include('config/middlewares.js').then('controllers').then('routes').into(app)
app.listen(process.env.PORT, () => {
  console.log(`API ${process.env.API_NAME} Started - PORT: ${process.env.PORT}`)
})

// Pasta publica
app.use(express.static('src/public'))

module.exports = app