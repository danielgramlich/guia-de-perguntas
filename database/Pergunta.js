//define o moddel
const Sequelize = require("sequelize");
const connection = require("./database");

//define os campos e os tipos
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});
//passar model para o banco
Pergunta.sync({force:false}).then(()=>{});

module.exports = Pergunta;
