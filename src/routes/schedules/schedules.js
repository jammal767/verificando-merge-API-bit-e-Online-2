const auth = require('../../config/auth')
const registerLog = require('../../libs/registerLog')

module.exports = (app) => {

  const scheduleController = app.controllers.schedules.scheduleController

  app.route('/:lng/schedules')
    .get(auth, async (req, res) => {
      const query = req.query;
      query.user = req.decoded.user_id;
      try {
        const result = await scheduleController.list(query)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .post(auth, async (req, res) => {
      const { unit, date, enterprise } = req.body

      if (!date || !unit) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Todos os campos são obrigatórios')
        })
        return false
      }

      const newSchedule = {
        user: req.decoded.user_id,
        unit,
        date,
        enterprise,
      }

      try {
        const result = await scheduleController.create(newSchedule)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Solicitou um agendamento na platagorma')}`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })


  app.route('/:lng/schedules/:id')
    .get(auth, async (req, res) => {
      const { id } = req.params
      try {
        const result = await scheduleController.show(id)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .delete(auth, async (req, res) => {
      const { id } = req.params
      if (!id) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      try {
        const result = await scheduleController.delete(id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Removeu o agendamento')}: "${id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}