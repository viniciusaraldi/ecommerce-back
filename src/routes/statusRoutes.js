import express from 'express'
import statusController from '../controller/statusController.js'
import verificaTokenAdmin from '../middleware/validaToken.js'


const routes = express.Router()

routes
    .get("/produtos/status", statusController.listagemStatus)
    .post("/produtos/status", verificaTokenAdmin, statusController.adicionaStatus)
    .put("/produtos/status/:id", verificaTokenAdmin, statusController.atualizaStatus)
    .delete("/produtos/status/:id", verificaTokenAdmin, statusController.deletaStatus)

export default routes
