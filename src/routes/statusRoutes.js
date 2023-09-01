import express from 'express'
import statusController from '../controller/statusController.js'


const routes = express.Router()

routes
    .get("/produtos/status", statusController.listagemStatus)
    .post("/produtos/status", statusController.adicionaStatus)
    .put("/produtos/status/:id", statusController.atualizaStatus)
    .delete("/produtos/status/:id", statusController.deletaStatus)

export default routes
