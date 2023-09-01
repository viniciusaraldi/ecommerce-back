import express from 'express'
import colecoesController from '../controller/colecoesController.js'


const routes = express.Router()

routes
    .get("/produtos/colecoes", colecoesController.listagemColecoes)
    .post("/produtos/colecoes", colecoesController.adicionaColecao)
    .put("/produtos/colecoes/:id", colecoesController.atualizaColecao)
    .delete("/produtos/colecoes/:id", colecoesController.deletaColecao)

export default routes
