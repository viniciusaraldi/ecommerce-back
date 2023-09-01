import express from 'express';
import pedidoController from '../controller/pedidosController.js';
import verificaTokenAdmin from '../middleware/validaToken.js';

const routes = express.Router()

routes
    .get("/pedidos", verificaTokenAdmin,pedidoController.listagemPedidos)
    .get("/pedidos/busca", verificaTokenAdmin, pedidoController.listagemPedidosPorBusca)
    .get("/pedidos/:id", verificaTokenAdmin, pedidoController.listagemPedidosPorId)
    .post("/pedidos/", verificaTokenAdmin, pedidoController.adicionaPedidos)
    // .put("/pedidos/pedidos", pedidoController.atualizaPedidos)
    .delete("/pedidos/:id", verificaTokenAdmin, pedidoController.deletaPedidos)

export default routes
