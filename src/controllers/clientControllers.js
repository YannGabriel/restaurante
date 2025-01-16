

// clientControllers.js
const ClientServices = require("../services/clientServices");

async function getClientsController(req, res) {
  try {
    const clientes = await ClientServices.getClientes();
    res.status(200).json(clientes); // Retorna os clientes em JSON
  } catch (error) {
    console.error("Usuários não foram pegos!", error);
    res.status(500).json({
      mensagem: "Erro ao pegar usuários"
    });
  }
}

async function createClientController(req, res) {

  try {
    const { nome, telefone, email, senha } = req.body;
    await ClientServices.createClient({nome, telefone, email, senha})
    res.status(200).json({
      mensagem: "Cliente Criado com sucesso!"
    })
  } catch (error) {
    console.error("O cliente não foi criado!", error)
  }
}

async function loginClientController(req, res){
  try {
    const { nome, telefone, email, senha } = req.body;
    await ClientServices.createClient({nome, telefone, email, senha})
    res.status(200).json({
      mensagem: "Cliente Criado com sucesso!"
    })
  } catch (error) {
    console.error("O cliente não foi criado!", error)
  }
}

async function atualizarUsuarioController(req, res){

  try{
    const {nome, telefone} = req.body
    const id = req.params.id

    ClientServices.atualizarCliente({nome, telefone, id})
    res.status(200).json({
      mensagem: "Usuario atualizado com sucesso!"
    })
  }
  catch(error){
    console.error("Usuário não foi atualizado!", error)
  }
}

async function getClientController(req, res){
  try{
    const email = req.params.email
    const cliente = await ClientServices.getClient({email})
      res.status(200).json(cliente)
  }    catch(error){
    console.error(error)
  }
}

module.exports = { getClientsController, createClientController, loginClientController, atualizarUsuarioController, getClientController };
