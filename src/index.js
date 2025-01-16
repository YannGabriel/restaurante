//Dependências 
const express = require("express");
const conexao = require("./db.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const ClientControllers = require("./controllers/clientControllers.js");

const app = express(); //Cria o servidor
app.use(cors()); //Aceitar de outros sem ser de nossa máquina
app.use(bodyParser.json()); //Ler em JSON

//Rotas

//Rota consulta Clientes /clientes
app.get("/clientes", ClientControllers.getClientsController);

//Rota de cadastro
app.post("/clientes", ClientControllers.createClientController);

//Rota de Login
app.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        const query = "SELECT email, senha FROM clientes WHERE email = ?"; //Só retorna se o email for o mesmo enviado na requisição
        const [cliente] = await conexao.query(query, [email]); //Seleciona o email e senha do usuário para verificações
        const decriptSenha = bcrypt.compareSync(cliente.senha, senha); //Comparar senha com senha

        if (decriptSenha) {
            res.status(200).json({
                mensagem: "Login realizado com sucesso" //Caso não haja um usuário
            });
        } else {
            res.status(400).json({
                mensagem: "Usuário ou senha incorretos!"
            });
        }
    }
    catch (error) {
        console.log("Usuário não encontrado!");
    }
});

//Atualização de dados
app.put("/clientes/:id", async (req, res) => {
    const { nome, telefone } = req.body; //dados a se atualizar da requisição
    const id = req.params.id; //Acessa o parâmetro da URL

    try {
        const query = "UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?"; //Setando o valor de atualização
        await conexao.query(query, [nome, telefone, id]); //itens necessários do ? ? ?
        
        res.status(200).json({
            mensagem: "Os dados foram atualizados com sucesso!"
        });
    }
    catch (error) {
        res.status(500).json({
            mensagem: "Os dados não foram atualizados, tente novamente!"
        });
    }
});

//Consulta de usuários
app.get("/clientes/:email", async (req, res) => {
    const email = req.params.email;

    try {
        const query = "SELECT id, nome, email, telefone FROM clientes WHERE email = ?";
        const usuario = await conexao.query(query, [email]);

        res.status(200).json(usuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "O usuário não foi encontrado no momento!"
        });
    }
});

//Delete de usuários
app.delete("/clientes/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const query = "DELETE FROM clientes WHERE clientes.id = ?";
        await conexao.query(query, [id]);

        res.status(200).json({
            mensagem: "O usuário foi deletado com sucesso!"
        });
    }
    catch (error) {
        res.status(500).json({
            mensagem: "O usuário não pode ser excluído no momento, tente novamente mais tarde!"
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
