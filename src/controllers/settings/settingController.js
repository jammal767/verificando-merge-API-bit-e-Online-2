const Setting = require('../../models/setting')


// Show Setting
exports.show = () => {
  return new Promise((resolve, reject) => {
    Setting.findOne({ type: 'setting' }, (err, setting) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao carregar as configurações')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: setting ? setting : {}
      }
      resolve(result)
    })
  })
}

// Update
exports.setSetting = (editSetting) => {
  return new Promise((resolve, reject) => {

    editSetting.updatedAt = new Date()

    Setting.findOneAndUpdate({ type: 'setting' }, editSetting, { upsert: true, new: true }).exec((err, setting) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar as configurações.')
        }
        reject(e)
        return false
      }

      if (!setting) {
        const e = {
          error: true,
          code: 400,
          msg: __('Configuração não encontrada.')
        }
        reject(e)
        return false
      }

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar os dados da categoria')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        msg: __('Categoria alterada com sucesso.'),
        data: setting
      }

      resolve(result)

    })
  })
}