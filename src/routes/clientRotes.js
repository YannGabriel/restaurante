

const express = require('express');
const router = express.Router();
const clientControllers = require('../controllers/clientControllers');

router.get('/clientes', clientControllers.getClientsController);

router.post("/clientes", clientControllers.createClientController)

router.post("/clientes", clientControllers.loginClientController)

router.put("/clientes/:id", clientControllers.atualizarUsuarioController)

router.get("/clientes/:email", clientControllers.getClientController)

router.delete("/clientes/:id", clientControllers.deleteUserController)

module.exports = router;