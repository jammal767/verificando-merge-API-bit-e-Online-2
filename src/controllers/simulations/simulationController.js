const mongoose = require('mongoose');
const Simulation = require('../../models/simulation')

// List All
exports.list = () => {
  return new Promise((resolve, reject) => {
    Simulation.aggregate(
      [{
        $lookup: {
          from: 'steps',
          foreignField: 'number',
          localField: 'step',
          as: 'step'
        }
      },
      {
        $unwind: '$step'
      },
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: 'user',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 1,
          complete: 1,
          canceled: 1,
          results: 1,
          user: 1,
          step: 1,
          createdAt: 1,
          proposal: 1,
          user: {
            avatar: 1,
            name: 1,
            email: 1
          }
        }
      },
      {
        $sort: {
          'createdAt': -1
        }
      }
      ]
    ).exec(async (err, simulations) => {

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao listar as simulações.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: simulations
      }

      resolve(result)
    })
  })
}

// List user simulations
exports.listSimulationsUser = (userId) => {
  return new Promise((resolve, reject) => {
    Simulation.aggregate(
      [{
        $match: {
          user: mongoose.Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: 'steps',
          foreignField: 'number',
          localField: 'step',
          as: 'step'
        }
      },
      {
        $unwind: '$step'
      },
      {
        $sort: {
          'createdAt': -1
        }
      }
      ]
    ).exec(async (err, simulations) => {

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao listar as simulações.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: simulations
      }

      resolve(result)
    })
  })
}


// Create simulation
exports.create = (simulation) => {
  return new Promise((resolve, reject) => {
    new Simulation(simulation).save((err, simulation) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao registrar a simulação')
        }
        return reject(e)
      }

      const result = {
        success: true,
        code: 200,
        msg: __('Simulação registrada com sucesso.'),
        data: simulation
      }
      return resolve(result)
    })
  })
}

// Show Simulation
exports.show = (id) => {
  return new Promise((resolve, reject) => {
    Simulation.aggregate(
      [{
        $match: {
          _id: mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'steps',
          foreignField: 'number',
          localField: 'step',
          as: 'step'
        }
      },
      {
        $unwind: '$step'
      },
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: 'user',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 1,
          complete: 1,
          canceled: 1,
          results: 1,
          user: 1,
          step: 1,
          createdAt: 1,
          proposal: 1,
          user: {
            avatar: 1,
            name: 1,
            email: 1
          }
        }
      },
      {
        $sort: {
          'createdAt': -1
        }
      }
      ]
    ).exec(async (err, simulation) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao exibir os dados da simulação.')
        }
        reject(e)
        return false
      }

      if (!simulation) {
        const e = {
          error: true,
          code: 400,
          msg: __('Simulação não encontrada.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: simulation[0]
      }
      resolve(result)
    })
  })
}

// Update
exports.update = (editSimulation) => {
  return new Promise((resolve, reject) => {
    Simulation.findById(editSimulation._id, (err, simulation) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar os dados da simulação.')
        }
        reject(e)
        return false
      }

      if (!simulation) {
        const e = {
          error: true,
          code: 400,
          msg: __('Simulação não encontrada.')
        }
        reject(e)
        return false
      }

      if (editSimulation.results) {
        simulation.results = editSimulation.results
      }

      if (editSimulation.step) {
        if (editSimulation.step == 5) {
          simulation.complete = true
        } else {
          simulation.complete = false
        }
        simulation.step = editSimulation.step;
      }

      if (editSimulation.complete) {
        simulation.complete = editSimulation.complete
      }

      if (editSimulation.canceled) {
        simulation.canceled = editSimulation.canceled
      }

      if (editSimulation.proposal) {
        simulation.proposal = editSimulation.proposal
      }

      simulation.updatedAt = new Date()

      simulation.save((err, simulation) => {
        if (err) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao atualizar os dados da simulação')
          }
          reject(e)
          return false
        }

        const result = {
          success: true,
          code: 200,
          msg: __('Simulação alterada com sucesso.'),
          data: simulation
        }
        resolve(result)
      })
    })
  })
}

// Remove simulation
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Simulation.findById(id, (erro, simulation) => {
      if (!simulation) {
        const e = {
          error: true,
          code: 400,
          msg: __('Simulação não encontrada.')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao remover a simulação.')
        }
        reject(e)
        return false
      }

      simulation.remove((erro) => {
        const result = {
          success: true,
          code: 200,
          msg: __('Simulação removida com sucesso.')
        }
        resolve(result)
      })
    })
  })
}