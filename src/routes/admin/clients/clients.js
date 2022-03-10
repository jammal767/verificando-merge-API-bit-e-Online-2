const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')

module.exports = (app) => {
  const userController = app.controllers.users.userController

  app.route('/:lng/admin/clients')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const query = req.query
      query.profile = 'Client'
      try {
        const result = await userController.list(query)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}