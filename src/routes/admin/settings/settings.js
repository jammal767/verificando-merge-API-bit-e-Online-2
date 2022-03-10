const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')
const registerLog = require('../../../libs/registerLog')

module.exports = (app) => {

  const settingController = app.controllers.settings.settingController

  app.route('/:lng/admin/settings')
    .get(async (req, res) => {
      try {
        const result = await settingController.show()
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })


    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { termsOfUse, privacyPolicy, aboutUs, numberWhatsApp, textWhatsApp } = req.body


      const editSetting = {
        termsOfUse,
        privacyPolicy,
        aboutUs,
        numberWhatsApp,
        textWhatsApp
      }

      try {
        const result = await settingController.setSetting(editSetting)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Alterou os termos de uso e politica de privacidade')}`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })


}