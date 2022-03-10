const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')

module.exports = (app) => {
  
  const logController = app.controllers.logs.logController

  app.route('/:lng/admin/logs')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      
      const query = req.query

      try {
        let result = await logController.list(query)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}
