const Step = require('../models/step')

module.exports = ({
  numberStep
}) => {
  return new Promise((resolve, reject) => {
    Step.findOne({
      number: numberStep
    }, (error, step) => {

      if (error) return;

      let result = {
        _id: step._id,
        name: step.name,
        description: step.description,
        number: step.number,
      }
      resolve(result)
    })
  })
}