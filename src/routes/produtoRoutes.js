import express from 'express';
import produtoController from '../controller/produtoController.js';
import verificaTokenAdmin from '../middleware/validaToken.js';

const routes = express.Router()

routes
    .get("/produtos/", produtoController.listagemProduto)
    .get("/produtos/busca", produtoController.listagemProdutoPorBusca)
    .get("/produtos/busca/:id", produtoController.listagemProdutoPorId)
    .post("/produtos/adiciona/", verificaTokenAdmin, produtoController.adicionaProduto)
    .put("/produtos/atualiza/:id", verificaTokenAdmin, produtoController.atualizaProduto)
    .delete("/produtos/delete/:id", verificaTokenAdmin,produtoController.deletaProduto)

export default routes
