
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

async function createClient({ nome, telefone, email, senha }) {

  const hashSenha = bcrypt.hashSync(senha, 10); //Criptografar a senha (10 é padrão)

  try {
    const query = "INSERT INTO clientes (nome, telefone, email, senha) VALUES(?, ?, ?, ?)"; //Query para inserir os dados
    await conexao.query(query, [nome, telefone, email, hashSenha]); //Conexão para enviar os itens ao DataBase
  }
  catch (error) {
    console.error("Erro ao cadastrar usuário: ", error);
  }
}

async function loginUsuario({ email, senha }) {

  try {
    const query = "SELECT email, senha FROM clientes WHERE email = ?"; //Só retorna se o email for o mesmo enviado na requisição
    const [cliente] = await conexao.query(query, [email]); //Seleciona o email e senha do usuário para verificações
    const decriptSenha = bcrypt.compareSync(cliente.senha, senha); //Comparar senha com senha
  } catch (error) {
    console.error(error)
  }
}

async function atualizarCliente ({nome, telefone, id}){
  try {
    const query = "UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?"; //Setando o valor de atualização
    await conexao.query(query, [nome, telefone, id]); //itens necessários do ? ? ?
}
catch (error) {
  console.error(error)
}
}

async function getClient ({email}){
  try {
    const query = "SELECT id, nome, email, telefone FROM clientes WHERE email = ?";
    const usuario = await conexao.query(query, [email]);
    return usuario
}
catch (error) {
    console.error(error);
}
}

module.exports = { getClientes, createClient, loginUsuario, atualizarCliente, getClient}