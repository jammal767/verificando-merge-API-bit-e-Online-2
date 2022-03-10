'use strict'
const onesignal = require('simple-onesignal')

onesignal.configure(process.env.ONE_SIGNAL_ID, process.env.ONE_SIGNAL_KEY)

module.exports = (title, message, type) => {
  onesignal.sendMessage({
    headings: {
      en: title
    },
    contents: {
      en: message
    },
    included_segments: ['All'],
    ios_badgeType: 'Increase',
    ios_badgeCount: 1,
    priority: 10,
    data: {
      type: type
    }
  }, (err, resp) => {
    if (err) {
      // Handle error
      console.log(`Erro ao enviar push: ${err}`)
    } else {
      console.log(`Push enviado ${resp}`)
    }
  })
}