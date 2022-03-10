const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')
const registerLog = require('../../../libs/registerLog')

module.exports = (app) => {
  const questionController = app.controllers.questions.questionController

  app.route('/:lng/admin/questions')
    .get(auth, async (req, res) => {
      try {
        const result = await questionController.list()
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
    .post(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { question, response } = req.body

      if (!question || !response) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const newQuestion = {
        question: question,
        response: response
      }

      try {
        const result = await questionController.create(newQuestion)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Adicionou a pergunta')}: "${result.data._id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { _id, question, response } = req.body

      if (!_id) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const editQuestion = {
        _id: _id,
        question: question,
        response: response
      }

      try {
        const result = await questionController.update(editQuestion, req.decoded.user_id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Editou a pergunta')}: "${result.data._id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/admin/questions/:id')
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
        const result = await questionController.delete(id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Removeu a pergunta')}: "${id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}