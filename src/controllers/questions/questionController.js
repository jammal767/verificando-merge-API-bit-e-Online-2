const Question = require('../../models/question')

exports.list = () => {
  return new Promise((resolve, reject) => {
    Question.find({}, (err, questions) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_list_questions')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: questions
      }
      resolve(result)
    }).sort({createdAt: -1})
  })
}

exports.create = (question) => {
  return new Promise((resolve, reject) => {
    new Question(question).save((err, question) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_insert_question')
        }
        reject(e)
        return false
      }
      const result = {
        success: true,
        code: 200,
        msg: __('add_question_success'),
        data: question
      }
      resolve(result)
    })
  })
}

// Show question
exports.show = (questionId) => {
  return new Promise((resolve, reject) => {
    Question.findById(questionId, (err, question) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_question_show')
        }
        reject(e)
        return false
      }

      if (!question) {
        const e = {
          error: true,
          code: 404,
          msg: __('question_not_found')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: question
      }
      resolve(result)
    })
  })
}

// Update question
exports.update = (questionEdit) => {
  return new Promise((resolve, reject) => {
    Question.findById(questionEdit._id, (err, question) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_question_update')
        }
        reject(e)
        return false
      }

      if (!question) {
        const e = {
          error: true,
          code: 404,
          msg: __('question_not_found')
        }
        reject(e)
        return false
      }

      if (questionEdit.question) {
        question.question = questionEdit.question
      }

      if (questionEdit.response) {
        question.response = questionEdit.response
      }

      if (questionEdit.updatedAt) {
        question.updatedAt = questionEdit.updatedAt
      }

      question.updatedAt = new Date()

      question.save((erro, question) => {
        if (erro) {
          const e = {
            error: true,
            code: 400,
            msg: __('fail_question_update')
          }
          reject(e)
          return false
        }

        const result = {
          success: true,
          code: 200,
          msg: __('updated_question_success'),
          data: question
        }
        resolve(result)
      })
    })
  })
}

// Remove question
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Question.findById(id, (erro, question) => {
      if (!question) {
        const e = {
          error: true,
          code: 400,
          msg: __('question_not_found')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_question_remove')
        }
        reject(e)
        return false
      }

      question.remove(() => {
        const result = {
          success: true,
          code: 200,
          msg: __('question_removed_success')
        }
        resolve(result)
      })
    })
  })
}