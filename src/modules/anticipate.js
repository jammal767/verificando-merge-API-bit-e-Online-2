const moment = require('moment-timezone');

const Unit = require('../models/unit');



// O valor das minhas parcelas mensais é de 15384.62
// Vou adiantr uma parcela em 5 meses 
// (Parcela 6 vai ser paga no mês 1)
// Considerando o juros de 0.25% a.m.

// O desconto será de R$ 190,87
// correspondendo à - 1,24%

class Anticipate {



    



    anticipate({ taxa, periodo, valorParcela }) {


        
        valorParcela = parseFloat(valorParcela).toFixed(2);
        let parteZero = 1 + taxa;
        let primeiraParte = Math.pow(parteZero, periodo);
        let segundaParte = valorParcela / primeiraParte;
        let terceiraParte = valorParcela - segundaParte;
        let valorDoDesconto = parseFloat(terceiraParte).toFixed(2);
        let porcentagemDoDesconto = parseFloat(valorDoDesconto / valorParcela * 100).toFixed(2);


        porcentagemDoDesconto = porcentagemDoDesconto.replace('.', ',');
        valorDoDesconto = valorDoDesconto.replace('.', ',');

        const result = {
            descontos: {
                valorDoDesconto: valorDoDesconto,
                porcentagemDoDesconto: porcentagemDoDesconto,
            }
        }

        return result;


    }



}

module.exports = Anticipate;