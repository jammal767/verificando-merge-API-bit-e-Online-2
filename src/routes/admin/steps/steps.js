const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')
const registerLog = require('../../../libs/registerLog')

module.exports = (app) => {
  
    const stepController = app.controllers.steps.stepController

  app.route('/:lng/admin/steps')
    .get(auth, async (req, res) => {
      try {
        const result = await stepController.list()
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .post(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { name, description, number } = req.body

      if (!name || !number) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const newCategory = {
        name,
        description,
        number
      }

      try {
        const result = await stepController.create(newCategory)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Adicionou a etapa')}: "${result.data.name}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { _id, name, description, number } = req.body

      if (!_id) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const editCategory = {
        _id: _id,
        name: name,
        description: description,
        number: number
      }

      try {
        const result = await stepController.update(editCategory)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Editou a etapa')}: "${result.data.name}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/admin/steps/:id')
    .get(auth, async (req, res) => {
      const { id } = req.params
      try {
        const result = await stepController.show(id)
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
        const result = await stepController.delete(id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Removeu a etapa')}: "${id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}