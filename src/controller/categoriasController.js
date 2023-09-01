import erroSolicitacao from '../middleware/erroSolicitacao.js';
import categorias from '../models/Categoria.js'

class categoriasController {

    static listagemCategorias = async (req, res) => {
        try {
            const dados = await categorias.find();
            if (!dados || dados.length === 0) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "categorias inexistentes"
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "categorias encontrados com sucesso!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static adicionaCategoria = async (req, res) => {
        try {
            const dados = new categorias(req.body)
            const dadosEnvio = await dados.save({new: true})
            return res.status(201).send({
                sucess: true,
                status: 201,
                message: "Adicionado com sucesso!",
                data: dadosEnvio
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static atualizaCategoria = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await categorias.findByIdAndUpdate(id, req.body, {new: true})
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Atualizado com sucesso!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static deletaCategoria = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await categorias.findByIdAndDelete(id)
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Excluido com sucesso!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

}

export default categoriasController
