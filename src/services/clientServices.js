
const conexao = require("../db");
const bcrypt = require("bcrypt"); //Criptografia da senha

async function getClientes() {
  const query = "SELECT * FROM clientes"; //Pegando os usuários do Banco de Dados
  try {
    const [clientes] = await conexao.query(query); //Pedir um item pelo query (já que a conexão é uma pool)
    return clientes
  }
  catch (error) {
    console.error("O erro foi:", error); //erro de promise
  }
}


async function createClient(req, res, nome, telefone, email, senha) {

  //O ERRO TA AQUI!
  
  const { nome, telefone, email, senha } = req.body; //Dados atribuidos aos nomes das variáveis (mesmo nome aqui e no formulário)
  const hashSenha = bcrypt.hashSync(senha, 10); //Criptografar a senha (10 é padrão)

  try {
    const query = "INSERT INTO clientes (nome, telefone, email, senha) VALUES(?, ?, ?, ?)"; //Query para inserir os dados
    await conexao.query(query, [nome, telefone, email, hashSenha]); //Conexão para enviar os itens ao DataBase
    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!"
    }); //Mensagem de resposta positiva
  }
  catch (error) {
    console.error("Erro ao cadastrar usuário: ", error);
    res.status(500).json({
      mensagem: "Erro interno!"
    }); //Mensagem caso de mensagem negativa
  }
}

module.exports = { getClientes, createClient }