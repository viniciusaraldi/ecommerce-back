import express from 'express'
import corController from '../controller/corController.js'
import verificaTokenAdmin from '../middleware/validaToken.js'

const routes = express.Router()

routes
    .get("/produtos/cores", corController.listagemCor)
    .post("/produtos/cores", verificaTokenAdmin, corController.adicionaCor)
    .put("/produtos/cores/:id", verificaTokenAdmin, corController.atualizaCor)
    .delete("/produtos/cores/:id", verificaTokenAdmin, corController.deletaCor)

export default routes
