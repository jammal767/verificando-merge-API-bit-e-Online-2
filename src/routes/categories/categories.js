const auth = require('../../config/auth')
const verifyProfile = require('../../libs/verifyProfile')
const registerLog = require('../../libs/registerLog')

module.exports = (app) => {
  
    const categoryController = app.controllers.categories.categoryController

  app.route('/:lng/categories')
    .get(async (req, res) => {
      try {
        const result = await categoryController.list()
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}