import express from 'express'
import estoquesController from '../controller/estoquesController.js'

const routes = express.Router()

// .post("/produtos/estoques", estoquesController.adicionaEstoque)
routes
    .get("/produtos/estoques", estoquesController.listagemEstoques)
    .put("/produtos/estoques/:id", estoquesController.atualizaEstoque)
    .delete("/produtos/estoques/:id", estoquesController.deletaEstoque)

export default routes
