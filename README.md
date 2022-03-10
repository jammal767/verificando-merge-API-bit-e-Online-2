# RKM - API [v1.0] #
API Restful para fornecer e coletar informações do novo aplicativo da RKM.

## Tecnologias ##
* Nodejs
* MongoDB

## Validação ##
* Json Web Token

## Internacionalização ##
* A api conta com o recurso de internacionalização. Inicialmente o projeto dispõe como default os idiomas Inglês, Português.
* Os arquivos contendo todos idiomas, estão na pasta locales na raiz do projeto.
* Para adicionar um novo idioma a api, basta adionar a chave do idioma no objeto i18n.configure{locales:['en', 'pt']}.
* Os idiomas deverão ser setados nos endpoints com o parametro /lng. Ex.: https://URL_API/users

## Pré-requisitos
- **MongoDB** versão 3.2 ou superior;
- **Node.js** versão 8 ou superior;

## Instalação e Execução
1. Faça o clone do repositório e no terminal e navegue até a pasta;
2. Instale as dependências do projeto com `yarn`;
4. Rode a versão de desenvolvimento com `yarn dev`;

## Configurações
A Api conta com o recurso de variáveis de ambiente. Que devem ser definadas no arquivo .env que se encontra na raiz do projeto.
Inicialmente é disponibilizado um arquivo com o nome '.env-example' com algumas váriaveis default. Esse arquivo deve ser renomenado para '.env'.

## Autenticação
Para os endpoints que necessitam de autenticação será necessário enviar o parâmetro <X-Access-Token> no header da requisição.

## Dependências Utilizadas em Produção ##
* "bcryptjs": "^2.4.3"
* "body-parser": "^1.18.2"
* "cloudinary": "^1.13.2"
* "compression": "^1.7.3"
* "connect-timeout": "^1.9.0"
* "consign": "^0.1.2"
* "cpf_cnpj": "^0.2.0"
* "dotenv": "^8.2.0"
* "ejs": "^3.1.5"
* "email-templates": "^7.0.4"
* "express": "^4.16.4"
* "file-stream-rotator": "0.5.7"
* "helmet": "^3.21.2"
* "i18n": "^0.8.3"
* "jsonwebtoken": "^8.5.0"
* "moment-timezone": "^0.5.32"
* "mongoose": "5.11.15"
* "mongoose-encryption": "^2.0.3"
* "morgan": "^1.9.1"
* "nodemailer": "^6.4.3"
* "nodemailer-mailgun-transport": "^2.0.0"
* "pdf-creator-node": "^1.4.2"
* "pug": "^2.0.0-rc.4"
* "request": "^2.88.2"
* "request-promise": "^4.2.6"
* "simple-onesignal": "^1.0.4"
* "type-of-is": "^3.5.1"
* "xmlhttprequest": "^1.8.0"

## Dependências Dev ##
* "eslint": "^6.8.0"
* "eslint-config-standard": "^14.1.0"
* "eslint-plugin-import": "^2.20.1"
* "eslint-plugin-node": "^11.0.0"
* "eslint-plugin-promise": "^4.2.1"
* "eslint-plugin-standard": "^4.0.1"
* "nodemon": "^2.0.2"

## Linter
É sempre importante seguir um padrão de escrita em nossas aplicações. Com isso, utilizamos a dependência ESLint, que nos ajuda com essa questão.
Para configurar o linter, basta seguir os passos abaixo:

* Após os comandos da instalação, execute a seguinte linha de comando: 'yarn linter_init';
* Selecione 'To check syntax, find problems, and enforce code style';
* Selecione 'CommonJS (require/exports)';
* Selecione 'None of these';
* Na questão 'Does your project use TypeScript?' selecione a opção N;
* Na opção 'Where does your code run?' selecione somente 'Node';
* Selecione 'Use a popular style guide';
* Selecione 'Standard';
* E por último selecione a opção JSON (Isso irá gerar um arquivo de configuração no formato jason)
* Na questão 'Would you like to install them now with npm' selecione 'N';
* Adicione os items abaixo nas configurações rules e globals arquivo .eslintrc.json

`
{
  "rules": {
    "no-underscore-dangle": [0, {
      "allowAfterThis": true
    }],
    "eol-last": ["error", "never"]
  },
  "globals": {
    "__": true,
    "emailjs": true
  }
}
`

* Após todo o processo, rode o comando 'yarn linter_debug' para debugar o código e corrigir as falhas de padronização, caso exista alguma.

## Atenção
* Utilize o Postman para testar suas chamadas. E ter acesso a documentação [https://www.getpostman.com/](https://www.getpostman.com/).
* O arquivo de importação do postman se encontra na raiz da pasta './Pack-RKM'

## Desenvolvido por:
[Za9 Comunicação Digital](https://za9.com.br/).