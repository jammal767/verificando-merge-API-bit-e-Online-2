const auth = require('../../config/auth')
const registerLog = require('../../libs/registerLog')

module.exports = (app) => {

  const favoriteController = app.controllers.favorites.favoriteController


  app.route('/:lng/favorites/verify/:unitId')
    .get(auth, async (req, res) => {
      let userId = req.decoded.user_id;
      const { unitId } = req.params
      try {
        const result = await favoriteController.verifyFavorited({ userId, unitId })
        res.status(result.code).send(result)
      } catch (error) {
        res.status(400).send(error)
      }
    })

  app.route('/:lng/favorites')
    .get(auth, async (req, res) => {
      let userId = req.decoded.user_id;
      try {
        const result = await favoriteController.list(userId)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .post(auth, async (req, res) => {

      let favorite = {
        user: req.decoded.user_id,
        unit: req.body.unitId
      }

      try {
        const result = await favoriteController.create(favorite)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/favorites/:unitId')
    .delete(auth, async (req, res) => {
      let { unitId } = req.params
      let userId = req.decoded.user_id;

      try {
        const result = await favoriteController.delete({ userId, unitId })
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}