const nodemailer = require('nodemailer')
const mailgunTransport = require('nodemailer-mailgun-transport')
const ejs = require('ejs')

class SendMail {
  constructor() {
    const mailgunOptions = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
      }
    }
    const transport = mailgunTransport(mailgunOptions)
    this.transporter = nodemailer.createTransport(transport)
  }

  renderTemplate({ tamplateName, params }) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(`./src/templates/emails/${tamplateName}.ejs`, params, (err, template) => {
        if (err) {
          reject(err)
          return
        }
        resolve(template)
      })
    })
  }

  sendMail({ emailTo, html, subject, attachments }) {
    const mailOptions = {
      from: `${process.env.MAIL_REMETENTE_NAME} <noreply@rkmengenharia.com.br>`,
      replyTo: 'noreply@rkmengenharia.com.br',
      to: emailTo,
      subject: subject,
      html,
      attachments: attachments,
    }

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log(`Email - [${subject}] enviado para ${emailTo} com sucesso!`)
      }
    }
    )
  }

  async send({ emailTo, subject, tamplateName, params, attachments }) {
    const html = await this.renderTemplate({ tamplateName, params })
    this.sendMail({
      emailTo,
      subject,
      html,
      attachments
    })
  }
}

module.exports = new SendMail()