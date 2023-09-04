import express from 'express'
import estoquesController from '../controller/estoquesController.js'
import verificaTokenAdmin from '../middleware/validaToken.js'

const routes = express.Router()

// .post("/produtos/estoques", estoquesController.adicionaEstoque)
routes
    .get("/produtos/estoques", estoquesController.listagemEstoques)
    .put("/produtos/estoques/:id", verificaTokenAdmin, estoquesController.atualizaEstoque)
    .delete("/produtos/estoques/:id", verificaTokenAdmin, estoquesController.deletaEstoque)

export default routes
