const mongoose = require('mongoose')

let host = ''
if (process.env.DB_PROD === 'true') {
  host = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
} else {
  host = `mongodb://localhost:27017/${process.env.DB_NAME}`
}

mongoose.connect(host, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.Promise = global.Promise

mongoose.connection.on('connected', () => {
  if (process.env.DB_PROD === 'true') {
    console.log('MongoDb - Prod. Connected')
  } else {
    console.log('MongoDb - Dev. Connected')
  }
})

mongoose.connection.on('error', (err) => {
  console.log(`MongoDB: ${err}`)
})

module.exports = mongoose