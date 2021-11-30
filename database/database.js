const Sequelize = require('sequelize');


//tabela, usuario, senhaok
const connection = new Sequelize('marin974_guiadeperguntas','marin974_gdp','Autoglass@2020',{
    host:'108.167.188.87',
    dialect: 'mysql'
});

module.exports = connection;