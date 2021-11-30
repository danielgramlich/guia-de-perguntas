const express = require ("express"); //importando o módulo
const app = express(); //criando uma cópia dentro da variável
const bodyParser = require("body-parser"); //enviar dados dos form para o backend
const connection= require("./database/database"); //database
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//conexão com o servidor
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão do servidor bem sucedida")
    })
    .catch((msgErro)=>{
        console.log(msgErro)
    })

//Utilizando o ejs como view engine
app.set("view engine", "ejs");
app.use(express.static('public'));//aplicação aceita arquivos estáticos
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()); //rotas

//rotas
app.get("/",(req,res)=>{
    Pergunta.findAll({raw:true, order:[
        ['id','DESC'] //ASC crescente DESC decrescente
    ]}).then(perguntas =>{
        console.log(perguntas)
        res.render("index",{
            perguntas: perguntas,
        });
    }); //SELECT ALL * FROM PERGUNTAS e o raw é para informações simplificadas
    
});

app.get("/perguntar",(req,res)=>{  
    res.render("perguntar");
});

app.get("/erro",(req,res)=>{  
    res.render("erro");
});

app.post("/salvarpergunta",(req,res)=>{
    var titulo=req.body.titulo;
    var descricao = req.body.descricao;
    if(titulo!=""||descricao!=""){
        Pergunta.create({
            titulo: titulo,
            descricao: descricao
        }).then(() =>{
            res.redirect("/");
        }) 
        }else{
            res.redirect("/erro");            
    }    
})

//criando paginas separadas por pergunta
app.get("/pergunta/:id",(req,res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta => {
        if(pergunta != undefined){//pergunta encontrada
            Resposta.findAll({
                //order:[['id', 'DESC']], ordem recente, com duas chaves mesmo. daria pra colocar dentro
                where:{perguntaId: pergunta.id},
                order:[['id','DESC']]
            }).then(respostas =>{
                res.render("pergunta",{
                pergunta:pergunta,
                respostas: respostas
                });
            });
        }else{ //pergunta não encontrada
            res.redirect("/");
        }
    })
});

app.post("/responder", (req,res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    if(corpo!=""){
        Resposta.create({
            corpo: corpo,
            perguntaId: perguntaId
        }).then(()=>{
            res.redirect(`pergunta/${perguntaId}`) //res.redirect("pergunta/4");
        })
    }else{
        res.redirect("/erro");
    }
})

app.listen(process.env.PORT || 8080,()=>{
    console.log("App rodando");});