import express from 'express'
import categoriasController from '../controller/categoriasController.js'
import verificaTokenAdmin from '../middleware/validaToken.js'

const routes = express.Router()

routes
    .get("/produtos/categorias", categoriasController.listagemCategorias)
    .post("/produtos/categorias", verificaTokenAdmin, categoriasController.adicionaCategoria)
    .put("/produtos/categorias/:id", verificaTokenAdmin, categoriasController.atualizaCategoria)
    .delete("/produtos/categorias/:id", verificaTokenAdmin, categoriasController.deletaCategoria)

export default routes
