const auth = require('../../config/auth')
const verifyProfile = require('../../libs/verifyProfile')
const registerLog = require('../../libs/registerLog')
const Anticipate = require('../../modules/anticipate');


module.exports = (app) => {
  const anticipateController = app.controllers.anticipate.anticipateController
  const unitController = app.controllers.units.unitController

  app.route('/:lng/anticipate')
    .get(async (_req, res) => {
      try {
        const result = await anticipateController.list()
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/anticipate')
    .post(async (req, res) => {
      const { periodo, valorParcela, unitId } = req.body
      
      const anticipate = await new Anticipate();

      const unidade = await unitController.show(unitId);

      const taxa = unidade.data.interestRate/100;

      const result = await anticipate.anticipate({ taxa, periodo, valorParcela })
      try {
        if (result) {
          res.status(200).send(result)
        }
      } catch (error) {
        res.status(404).send(error)
      }
    })
}