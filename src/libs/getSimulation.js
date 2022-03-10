const Simulation = require('../models/simulation')
const mongoose = require('mongoose');

module.exports = ({
  simulationId
}) => {
  return new Promise((resolve, reject) => {
    Simulation.aggregate(
      [{
        $match: {
          _id: mongoose.Types.ObjectId(simulationId)
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
    ).exec(async (error, simulation) => {
      if (error) return;
      resolve(simulation[0])
    })
  })
}