const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')
const registerLog = require('../../../libs/registerLog')
const getStep = require('../../../libs/getStep')
const Sales = require('../../../modules/sales')
const Contract = require('../../../modules/contract')
const mailgunTransport = require('nodemailer-mailgun-transport')

module.exports = (app) => {

  const simulationController = app.controllers.simulations.simulationController

  app.route('/:lng/admin/simulations')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      try {
        const result = await simulationController.list()
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/admin/simulations/:id')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { id } = req.params
      try {
        const result = await simulationController.show(id)
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
          msg: __('O Campo _id é obrigatório')
        })
        return false
      }

      try {
        const result = await simulationController.delete(id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Removeu uma simulação')}: "${id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })


  app.route('/:lng/admin/simulations/step/change')
    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const {
        simulationId,
        step
      } = req.body

      if (!step || !simulationId) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campos obrigatórios.')
        })
        return false
      }

      let Step = await getStep({
        numberStep: step
      });

      if (!Step) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Etapa de venda não encontrada.')
        })
        return false
      }

      const editSimulation = {
        _id: simulationId,
        step: Step.number,
      }


      try {

        if (step == '3') {
          await Contract.generateContent({ simulationId });
        }

        const result = await simulationController.update(editSimulation)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Alterou a etapa da simulação:.')}${simulationId} para ${Step.name}`)
          Sales.stepChangeNotify({ simulationId: result.data._id, step: result.data.step });

          // Gera PDF do contrato e envia para o cliente por e-mail.
          if (result.data.step == '3') {
            Contract.generatePDF({ simulationId: result.data._id });
          }

          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}