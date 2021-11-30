//importando...
const Sequelize = require("sequelize");
const connection = require("./database"); //código de conexão com o banco

// criando Model;;;
const Resposta = connection.define("respostas",{ //nome da tabela
    corpo:{
        type: Sequelize.TEXT, //texto da resposta
        allowNull: false //sempre preenchido
    }, 
    //qual pergunta essa resposta pertence?
    perguntaId:{ //relacionamento cru
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force:false});//sincronizar com BD

module.exports = Resposta;//exportar aplicação