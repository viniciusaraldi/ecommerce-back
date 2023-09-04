import express from 'express'
import modelosController from '../controller/modelosController.js'
import verificaTokenAdmin from '../middleware/validaToken.js'

const routes = express.Router()

routes
    .get("/produtos/modelos/", modelosController.listagemModelos)
    .post("/produtos/modelos/", verificaTokenAdmin, modelosController.adicionaModelo)
    .put("/produtos/modelos/:id", verificaTokenAdmin, modelosController.atualizaModelo)
    .delete("/produtos/modelos/:id", verificaTokenAdmin, modelosController.deletaModelo)

export default routes
