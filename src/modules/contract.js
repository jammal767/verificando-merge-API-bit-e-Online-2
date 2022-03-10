const Document = require('../models/document');
const GetSimulation = require('../libs/getSimulation');
const Unit = require('../models/unit');
const ejs = require('ejs')
const PDF = require("pdf-creator-node");
const Sales = require('./sales');

// Gera um çodigo html do contrato
const renderTemplate = (doc, simulation, unit) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(`./src/templates/contracts/contract.ejs`, { doc, simulation, unit }, (err, template) => {
            if (err) {
                reject(err)
                return
            }
            resolve(template)
            return
        })
    })
}

//Salva o código html do contrato junto a documentação
exports.generateContent = async ({ simulationId }) => {
    return new Promise(async (resolve) => {
        let doc = await Document.findOne({ simulation: simulationId });
        let simulation = await GetSimulation({ simulationId });
        let unit = await Unit.findById({ _id: simulation.results.unit._id });

        let contract = await renderTemplate(doc, simulation, unit);

        doc.contractContent = contract;
        await doc.save();
        resolve(true);
    })
}


//Gera um arquivo em pdf do contrato e envia para o cliente
exports.generatePDF = async ({ simulationId, sendMail }) => {

    let doc = await Document.findOne({ simulation: simulationId });

    let options = {
        format: "A4",
        orientation: "portrait",
        border: "15mm"
    }

    let document = {
        data: {},
        html: `<!DOCTYPE html>
            <html lang="pt-BRr">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    * {
                        font-family: Arial, Helvetica, sans-serif;
                        color: #111;
                    }
                    
                    body{
                        page-break-before: avoid;
                    }

                    h1 {
                        font-size: 11pt;
                    }

                    h2 {
                        font-size: 10pt;
                    }

                    h3 {
                        font-size: 8pt;
                        text-decoration: underline;
                    }

                    p,
                    li {
                        font-size: 6pt;
                    }

                    table {
                        width: 100%;
                        margin: 30px 0;
                    }

                    tr,
                    th,
                    td {
                        border: 1px solid #ccc;
                        padding: 4px;
                        font-size: 6pt;
                    }
                </style>
            </head>
            <body> 
                ${doc.contractContent}
            </body>
            </html>`,
        path: `./src/storage/contracts/${doc._id}.pdf`
    };

    return PDF.create(document, options)
        .then(res => {
            doc.contractPdf = res.filename;
            doc.save();

            if (sendMail) {
                Sales.sendContract({
                    simulationId, attachments: [
                        {
                            filename: `${doc._id}.pdf`,
                            path: res.filename
                        }
                    ]
                });
            }

            return ({ ...res, success: true, code: 200 })
        })
        .catch(error => {
            return ({ ...error, error: true, code: 402 })
        });

}
