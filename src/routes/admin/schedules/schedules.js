const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')
const registerLog = require('../../../libs/registerLog')

module.exports = (app) => {

  const scheduleController = app.controllers.schedules.scheduleController

  app.route('/:lng/admin/schedules')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const query = req.query;
      try {
        const result = await scheduleController.list(query)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })


    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { _id, status } = req.body

      if (!_id) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campos obrigatórios')
        })
        return false
      }

      const editSchedule = {
        _id: _id,

        status: status
      }

      try {
        const result = await scheduleController.update(editSchedule)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Editou o agendamento na plataforma')}`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/admin/schedules/:id')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
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

    .delete(auth, verifyProfile.allow(['Admin']), async (req, res) => {
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
          registerLog(req.decoded.user_id, `${__('Removeu a agendamento')}: "${id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}