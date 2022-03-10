const Schedule = require('../../models/schedule')

// List All Schedules
exports.list = (query) => {
  return new Promise((resolve, reject) => {
    Schedule.find({ ...query }, async (err, schedules) => {

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao listar os agendamentos')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: schedules
      }

      resolve(result)
    }).populate('user unit', 'number name avatar phone photos').populate({
      path: 'unit',
      select: '_id number enterprise',
      populate: { path: 'enterprise', select: '_id name' }
    }).sort({ createdAt: -1 })
  })
}


// Create schedule
exports.create = (schedule) => {
  return new Promise((resolve, reject) => {
    new Schedule(schedule).save((err, schedule) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao adicionar o agendamento')
        }
        return reject(e)
      }

      const result = {
        success: true,
        code: 200,
        msg: __('Agendamento adicionado com sucesso.'),
        data: schedule
      }
      return resolve(result)
    })
  })
}

// Show Schedule
exports.show = (id) => {
  return new Promise((resolve, reject) => {
    Schedule.findById(id, (err, schedule) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao exibir os dados da agendamento.')
        }
        reject(e)
        return false
      }

      if (!schedule) {
        const e = {
          error: true,
          code: 400,
          msg: __('Agendamento não encontrada.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: schedule
      }
      resolve(result)
    }).populate('user unit', 'number name avatar photos')
  })
}

// Update
exports.update = (editSchedule) => {
  return new Promise((resolve, reject) => {
    Schedule.findById(editSchedule._id, (err, schedule) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar os dados do agendamento.')
        }
        reject(e)
        return false
      }

      if (!schedule) {
        const e = {
          error: true,
          code: 400,
          msg: __('Agendamento não encontrado.')
        }
        reject(e)
        return false
      }

      if (editSchedule.date) {
        schedule.date = editSchedule.date
      }

      if (editSchedule.status) {
        schedule.status = editSchedule.status
      }


      schedule.updatedAt = new Date()

      schedule.save((err, schedule) => {
        if (err) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao atualizar os dados da agendamento')
          }
          reject(e)
          return false
        }

        const result = {
          success: true,
          code: 200,
          msg: __('Agendamento alterada com sucesso.'),
          data: schedule
        }
        resolve(result)
      })
    })
  })
}

// Remove schedule
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Schedule.findById(id, (erro, schedule) => {
      if (!schedule) {
        const e = {
          error: true,
          code: 400,
          msg: __('Agendamento não encontrado.')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao remover a agendamento.')
        }
        reject(e)
        return false
      }

      schedule.remove((erro) => {
        const result = {
          success: true,
          code: 200,
          msg: __('Agendamento removido com sucesso.')
        }
        resolve(result)
      })
    })
  })
}