const auth = require('../../config/auth')
const registerLog = require('../../libs/registerLog')
const Tracksale = require('../../services/tracksale')

module.exports = (app) => {

  const ratingController = app.controllers.ratings.ratingController

  app.route('/:lng/ratings')
    .post(auth, async (req, res) => {

      const { name, email, score, justification, simulationId } = req.body;

      const newRating = {
        user: req.decoded.user_id,
        name,
        email,
        score,
        justification,
        simulation: simulationId
      }

      try {
        const result = await ratingController.create(newRating)
        if (result.success) {
          registerLog(req.decoded.user, "Realizou uma avaliação de compra.")
          Tracksale.answerCampaignApp({ name, email, score, justification })
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/ratings/link_tracksale')
    .post(auth, async (req, res) => {
      const { name, email } = req.body;
      try {
        let result = await Tracksale.getLinkCampaign({ name, email })
        res.status(result.code).send(result)
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}