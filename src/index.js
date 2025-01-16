//Dependências 
const express = require("express");
const conexao = require("./db.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const ClientControllers = require("./controllers/clientControllers.js");

const app = express(); //Cria o servidor
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); //Aceitar de outros sem ser de nossa máquina
app.use(bodyParser.json()); //Ler em JSON

//Rotas

//Rota consulta Clientes /clientes
app.get("/clientes", ClientControllers.getClientsController);

//Rota de cadastro
app.post("/clientes", ClientControllers.createClientController);

//Rota de Login
app.post("/login", ClientControllers.loginClientController);

//Atualização de dados
app.put("/clientes/:id", ClientControllers.atualizarUsuarioController);

//Consulta de usuários
app.get("/clientes/:email", ClientControllers.getClientController);

//Delete de usuários
app.delete("/clientes/:id", ClientControllers.deleteUserController);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
