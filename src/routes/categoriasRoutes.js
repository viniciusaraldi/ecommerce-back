import express from 'express'
import categoriasController from '../controller/categoriasController.js'

const routes = express.Router()

routes
    .get("/produtos/categorias", categoriasController.listagemCategorias)
    .post("/produtos/categorias", categoriasController.adicionaCategoria)
    .put("/produtos/categorias/:id", categoriasController.atualizaCategoria)
    .delete("/produtos/categorias/:id", categoriasController.deletaCategoria)

export default routes
