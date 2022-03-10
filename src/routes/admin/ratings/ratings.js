const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')

module.exports = (app) => {

  const ratingController = app.controllers.ratings.ratingController

  app.route('/:lng/admin/ratings')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {

      const query = req.query

      try {
        let result = await ratingController.list(query)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}
