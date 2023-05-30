
// Query Params = ?nome=Node.js - parametros q passamos em frente da rota
// Route Params =  :   => /curso/id2
// Request Body = { nome: "Node.js", tipo: "bakend"} envia um objeto dentro do corpo da requisição

// PRIMEIRA ROTA DA APLICAÇAO do tipo GET (buscando informaçãoes) e podemos acessar pelo navegador



const express = require('express');
//console.log(express);

const server = express();

server.use(express.json());   // enviando uma estrutura json para o express

const cursos = ["Node js", "JavaScript", "React Native"];


//                  MiddleWares Global

// Um middleware no Express é a maneira de fazer alguma coisa antes da
// requisição ser processada. Coisas como verificar se o usuário está
// autenticado, logar algum dado para análise ou qualquer coisa que precise ser
// feita antes de devolver uma resposta para a requisição.

server.use((req, res, next)=>{
    console.log(`URL CHAMADA: ${req.url} Ola mundo deu certo - MIDDLEWARE`);

    return next();

})



// localhost:3000/curso


                    // READ  -   GET   -   BUSCANDO   -- LER  //


    // FAZENDO REQUISIÇÃO TIPO  - get()


    server.get('/cursos', (req, res) => {

        return res.json(cursos);   // retonando todos os cursos

    });


    // buscando UM curso

    server.get("/cursos/:index", (req, res) => {

        const { index } = req.params;

        return res.json(cursos[index]);   // retonando UM curso

    });




                     //  CREATE  -   POST()    -   CRIANDO   //


    // CRIANDO UM NOVO CURSO     - post()

    server.post('/cursos/', (req, res) => {

        // pegando do corpo da aplicação - esperando que o usuaio envie um nome xxx

        const { name } = req.body;        // pegando do corpo da aplicação o name do usuario
        cursos.push(name);

        return res.json(cursos);

    });




                    // - UPDATE   -  put()   - EDITANDO   //


    // editar um curso q ja existe

    server.put("/cursos/:index", (req, res)=>{  // precisa enviar o id

        const { index } = req.params; // pegando o index

        const { name } = req.body     // pegar qual o nome ele quer subistituir // mandando o nome

        cursos[index]  = name;         // aqui vai susbistituir pelo nome q ele mandar

        return res.json(cursos);      //  retornando os cursos atualizados


    })



                    // DELETE


    server.delete("/cursos/:index", (req, res)=>{

        const { index } = res.json(cursos);  // desestruturação para saber qual o index
                                             // ele esta mandando pela url

        cursos.splice(index, 1)    // splice() para deletar item 1 no array do index

        // return res.json(cursos);

        return res.json({message: "Curso deletado com sucesso!"});

    })


    // CRUD
    // create, read,  upDate,   delete
    // criar,  ler,  atualizar, deletar

    // put()    = atualizar
    // get()    = buscar
    // post()   = enviar
    // splice() = deletar


    server.listen(3000); // listem() para ouvir alguama porta // ouvindo a porta 3000



    // primeiro parametro é para acessar a rota barra curso
    // segundo  parametro é uma função q rece 2 parametros
    // req -> dados da apolicação
    // res -> informações pra gente retornar uma resposata para o frontEnd

    //const id = req.params.id;             // Route Paramns
    //return res.json({curso: `Curso: ${id}`});

    // const nome = req.query.nome;         // query params
    // return  res.json({curso: `Aprendendo ${nome}`});  // retornando um objeto //

    // return res.send("Hello World");
    // console.log("Acessou a rota..");



//  meddlewares = funcao q esta entre o pedido da requisição e entre
//                a resposta final para o front end = ROTAS