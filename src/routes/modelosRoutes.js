import express from 'express'
import modelosController from '../controller/modelosController.js'
const routes = express.Router()

routes
    .get("/produtos/modelos/", modelosController.listagemModelos)
    .post("/produtos/modelos/", modelosController.adicionaModelo)
    .put("/produtos/modelos/:id", modelosController.atualizaModelo)
    .delete("/produtos/modelos/:id", modelosController.deletaModelo)

export default routes
