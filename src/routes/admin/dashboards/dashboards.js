const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')

module.exports = (app) => {

  const dashboardController = app.controllers.dashboards.dashboardController

  app.route('/:lng/admin/dashboards')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {


      try {
        let clients = await dashboardController.clients()
        let logs = await dashboardController.logs()
        let simulations = await dashboardController.simulations()
        let schedules = await dashboardController.schedules()

        let result = {
          clients: clients.data,
          totalClients: clients.total,
          logs: logs.data,
          totalLogs: logs.total,
          simulations: simulations.data,
          totalSimulations: simulations.total,
          schedules: schedules.data,
          totalSchedules: schedules.total,
        }

        res.status(200).send(result)

      } catch (error) {
        console.log(error)
        return;
        res.status(error.code).send(error)
      }
    })
}
