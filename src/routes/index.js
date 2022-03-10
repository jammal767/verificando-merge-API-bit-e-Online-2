module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({
      api: process.env.API_NAME,
      version: process.env.API_VERSION
    })
  })
}