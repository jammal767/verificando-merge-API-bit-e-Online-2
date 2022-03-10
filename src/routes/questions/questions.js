const auth = require('../../config/auth')
const verifyProfile = require('../../libs/verifyProfile')
const registerLog = require('../../libs/registerLog')

module.exports = (app) => {
  const questionController = app.controllers.questions.questionController

  app.route('/:lng/questions')
    .get(async (req, res) => {
      try {
        const result = await questionController.list()
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/questions/:id')
    .get(auth, async (req, res) => {
      const { id } = req.params
      try {
        const result = await questionController.show(id)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}