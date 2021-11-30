const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root','Autoglass@2020',{
    host:'localhost',
    dialect: 'mysql'
});

module.exports = connection;