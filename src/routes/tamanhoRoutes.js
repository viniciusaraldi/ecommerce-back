import express from 'express'
import tamanhoController from '../controller/tamanhoController.js'
import verificaTokenAdmin from '../middleware/validaToken.js'

const routes = express.Router()

routes
    .get("/produtos/tamanhos", verificaTokenAdmin, tamanhoController.listagemTamanho)
    .post("/produtos/tamanhos", verificaTokenAdmin, tamanhoController.adicionaTamanho)
    .put("/produtos/tamanhos/:id", verificaTokenAdmin, tamanhoController.atualizaTamanho)
    .delete("/produtos/tamanhos/:id", verificaTokenAdmin, tamanhoController.deletaTamanho)

export default routes
