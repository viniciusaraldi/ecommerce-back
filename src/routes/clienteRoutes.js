import express from 'express';
import clienteController from '../controller/clienteController.js';
import verificaTokenAdmin from '../middleware/validaToken.js';

const routes = express.Router()

routes
    .get("/clientes", verificaTokenAdmin, clienteController.listagemClientes)
    .get("/clientes/busca", verificaTokenAdmin, clienteController.listagemClientesPorBusca)
    .get("/clientes/:id", verificaTokenAdmin, clienteController.listagemClientesPorId)
    .post("/clientes/", clienteController.adicionarClientes)
    .post("/clientes/login/", clienteController.loginClientes)
    .put("/clientes/recupera-senha", clienteController.recuperaSenha)
    .put("/clientes/:id", verificaTokenAdmin, clienteController.atualizarClientes)
    .delete("/clientes/:id", verificaTokenAdmin, clienteController.deleteClientes)

export default routes
