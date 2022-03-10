const getStep = require('../libs/getStep')
const getSimulation = require('../libs/getSimulation')
const sendMail = require('../libs/sendMail')

exports.stepChangeNotify = async ({ simulationId, step, attachments }) => {
  let simulation = await getSimulation({ simulationId });
  let infoStep = await getStep({ numberStep: step });

  sendMail.send({
    emailTo: simulation.user.email,
    subject: `Simulação da Unid.: ${simulation.results.unit.number} - RKM`,
    tamplateName: `change_step_simulation`,
    params: {
      step: infoStep,
      simulation: simulation
    },
    attachments
  })
}



exports.sendContract = async ({ simulationId, attachments }) => {
  let simulation = await getSimulation({ simulationId });
  sendMail.send({
    emailTo: simulation.user.email,
    subject: `Simulação da Unid.: ${simulation.results.unit.number} - RKM`,
    tamplateName: `send_contract`,
    params: {
      simulation: simulation
    },
    attachments
  })
}

exports.repproveDocsNotify = async ({ simulationId, reasonRepprove }) => {
  let simulation = await getSimulation({ simulationId });

  let infoStep = {
    number: 2,
    name: "Documentação Reprovada",
    description: reasonRepprove
  };

  sendMail.send({
    emailTo: simulation.user.email,
    subject: `Simulação da Unid.: ${simulation.results.unit.number} - RKM`,
    tamplateName: `change_step_simulation`,
    params: {
      step: infoStep,
      simulation: simulation
    }
  })

}