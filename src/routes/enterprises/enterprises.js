const auth = require('../../config/auth')

module.exports = (app) => {
  const enterpriseController = app.controllers.enterprises.enterpriseController

  app.route('/:lng/enterprises')

    .get(async (req, res) => {
      const query = req.query

      try {
        const result = await enterpriseController.listAll(query);
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/enterprises/:id')
    .get(async (req, res) => {
      const { id } = req.params
      try {
        const result = await enterpriseController.show(id)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

}