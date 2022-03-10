const auth = require('../../config/auth')
const registerLog = require('../../libs/registerLog')
const Simulation = require('../../modules/simulation');
const Sales = require('../../modules/sales');
const { $where } = require('../../models/unit');

module.exports = (app) => {

  const simulationController = app.controllers.simulations.simulationController

  app.route('/:lng/simulations/init')
    .post(async (req, res) => {
      const { unitId, additionals } = req.body;

      try {
        const simulation = await new Simulation(unitId, additionals);

        if (simulation) {
          const result = simulation.getResultDefault();
          res.status(200).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/simulations/simulate/:unitId')
    .post(auth, async (req, res) => {
      const { unitId } = req.params;
      const userId = req.decoded.user_id;
      const { entrada, mensal, semestral, chaves, additionals } = req.body

      if (!entrada.toString() || !mensal.toString() || !semestral.toString() || !chaves.toString()) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }
     
      const simulation = await new Simulation(unitId, additionals);

      try {
        const result = await simulation.simulate({ entrada, mensal, semestral, chaves })
        if (result) {
          registerLog(userId, `${__('Realizou uma simulação da unidade')}: "${result.unit.number}" na plataforma.`);
          res.status(200).send(result)
        }
      } catch (error) {
        console.log(error)
        res.status(error.code).send(error)
      }
    })


  app.route('/:lng/simulations/proposal')
    .post(auth, async (req, res) => {
      const { _id, proposal } = req.body

      if (!proposal) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Dados obrigatórios')
        })
        return false
      }

      const editSimulation = {
        _id,
        proposal,
      }

      try {
        const result = await simulationController.update(editSimulation)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Enviou uma proposta customizada para uma simulação no app.')}`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/simulations')
    .get(auth, async (req, res) => {
      let userId = req.decoded.user_id;
      try {
        const result = await simulationController.listSimulationsUser(userId)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .post(auth, async (req, res) => {
      const { results } = req.body

      if (!results) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Dados obrigatórios')
        })
        return false
      }

      const newSimulation = {
        results,
        user: req.decoded.user_id,
        step: '1'
      }

      try {
        const result = await simulationController.create(newSimulation)

        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Realizou uma simulação no app.')}`);
          Sales.stepChangeNotify({ simulationId: result.data._id, step: 1 });
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/simulations/:id')
    .get(auth, async (req, res) => {
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
  app.route('/:lng/simulations/cancel')
    .put(auth, async (req, res) => {
      const { _id } = req.body

      const editSimulation = {
        _id,
        canceled: true,
      }

      try {
        const result = await simulationController.update(editSimulation)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Cancelou a simulação')}: "${_id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}