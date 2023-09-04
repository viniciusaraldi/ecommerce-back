import express from 'express'
import colecoesController from '../controller/colecoesController.js'
import verificaTokenAdmin from '../middleware/validaToken.js'

const routes = express.Router()

routes
    .get("/produtos/colecoes", colecoesController.listagemColecoes)
    .post("/produtos/colecoes", verificaTokenAdmin, colecoesController.adicionaColecao)
    .put("/produtos/colecoes/:id", verificaTokenAdmin, colecoesController.atualizaColecao)
    .delete("/produtos/colecoes/:id", verificaTokenAdmin, colecoesController.deletaColecao)

export default routes
