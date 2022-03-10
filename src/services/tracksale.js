const request = require('request-promise')
const baseUrl = 'https://api.tracksale.co/v2'
const req = {
    headers: {
        'Authorization': `bearer ${process.env.TRACKSALE_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Request-Promise'
    },
    json: true
}

exports.listCapain = () => {
    req.method = 'GET'
    req.url = `${baseUrl}/campaign`
    request(req).then(res => {

        console.log(res)
    }).catch(error => {
        console.log(error)
    })
}

// Responder uma Campanha
exports.answerCampaignApp = ({ name, email, score, justification }) => {
    req.method = 'POST'
    req.url = `${baseUrl}/answer`
    req.body = {
        campaign_code: '10',
        answers: [
            {
                name: name,
                email: email,
                score: parseInt(score),
                justification: justification,
                create_time: new Date(),
            }
        ]
    }

    request(req).then(res => {
        console.log('Respondeu uma pesquisa na Tracksale:', res)
    }).catch(error => {
        console.log(error.body.message)
    })
}

// Responder uma Campanha
exports.getLinkCampaign = ({ name, email }) => {
    req.method = 'POST'
    req.url = `${baseUrl}/campaign/${10}/survey-links`
    req.body = {
        customers: [
            {
                name: name,
                email: email,
            }
        ]
    }

    return request(req).then(res => {
        return {
            code: 200,
            success: true,
            link: res.customers_links[0].survey_link
        }
    }).catch(error => {
        let e = {
            error: true,
            code: 400,
            msg: error.message
        }
        return e
    })
}


