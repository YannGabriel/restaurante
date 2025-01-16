

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

module.exports = { getClientsController, createClientController, loginClientController };
