const auth = require('../../config/auth')

module.exports = (app) => {
  const unitController = app.controllers.units.unitController

  app.route('/:lng/units')

    .get(async (req, res) => {
      const query = req.query
      try {
        const result = await unitController.list(query);
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        console.log(error);
        return;
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/units/:id')
    .get(async (req, res) => {
      const { id } = req.params
      try {
        const result = await unitController.show(id)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        console.log(error);
        return;
        res.status(error.code).send(error)
      }
    })

}