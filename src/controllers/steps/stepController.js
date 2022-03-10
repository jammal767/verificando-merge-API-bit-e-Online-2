const Step = require('../../models/step')

// List All Steps
exports.list = () => {
  return new Promise((resolve, reject) => {
    Step.find({}, async (err, steps) => {

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_list_steps')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: steps
      }

      resolve(result)
    }).sort({ number: 1 })
  })
}


// Create step
exports.create = (step) => {
  return new Promise((resolve, reject) => {
    new Step(step).save((err, step) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao adicionar a etapa')
        }
        return reject(e)
      }

      const result = {
        success: true,
        code: 200,
        msg: __('Etapa adicionada com sucesso.'),
        data: step
      }
      return resolve(result)
    })
  })
}

// Show Step
exports.show = (id) => {
  return new Promise((resolve, reject) => {
    Step.findById(id, (err, step) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao exibir os dados da etapa.')
        }
        reject(e)
        return false
      }

      if (!step) {
        const e = {
          error: true,
          code: 400,
          msg: __('Etapa não encontrada.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: step
      }
      resolve(result)
    })
  })
}

// Update
exports.update = (editStep) => {
  return new Promise((resolve, reject) => {
    Step.findById(editStep._id, (err, step) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar os dados do etapa.')
        }
        reject(e)
        return false
      }

      if (!step) {
        const e = {
          error: true,
          code: 400,
          msg: __('Etapa não encontrado.')
        }
        reject(e)
        return false
      }

      if (editStep.name) {
        step.name = editStep.name
      }

      if (editStep.description) {
        step.description = editStep.description
      }

      if (editStep.number) {
        step.number = editStep.number
      }
      

      step.updatedAt = new Date()

      step.save((err, step) => {
        if (err) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao atualizar os dados da etapa')
          }
          reject(e)
          return false
        }

        const result = {
          success: true,
          code: 200,
          msg: __('Etapa alterada com sucesso.'),
          data: step
        }
        resolve(result)
      })
    })
  })
}

// Remove step
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Step.findById(id, (erro, step) => {
      if (!step) {
        const e = {
          error: true,
          code: 400,
          msg: __('Etapa não encontrado.')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao remover a etapa.')
        }
        reject(e)
        return false
      }

      step.remove((erro) => {
        const result = {
          success: true,
          code: 200,
          msg: __('Etapa removida com sucesso.')
        }
        resolve(result)
      })
    })
  })
}