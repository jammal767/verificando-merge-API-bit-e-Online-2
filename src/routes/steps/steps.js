const auth = require('../../config/auth')
const verifyProfile = require('../../libs/verifyProfile')
const registerLog = require('../../libs/registerLog')

module.exports = (app) => {
  
    const stepController = app.controllers.steps.stepController

  app.route('/:lng/steps')
    .get(async (req, res) => {
      try {
        const result = await stepController.list()
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}