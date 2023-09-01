import erroSolicitacao from '../middleware/erroSolicitacao.js';
import estoques from '../models/Estoque.js'

class estoquesController {

    static listagemEstoques = async (req, res) => {
        try {
            const dados = await estoques.find().populate("idProduct").exec();
            if (!dados || dados.length === 0) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "estoques inexistentes"
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "estoques encontrados com sucesso!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    // static adicionaEstoque = async (req, res) => {
    //     try {
    //         const dados = new estoques(req.body)
    //         const dadosEnvio = await dados.save({new: true})
    //         return res.status(201).send({
    //             sucess: true,
    //             status: 201,
    //             message: "Adicionado com sucesso!",
    //             data: dadosEnvio
    //         })
    //     } catch (err) {
    //         return erroSolicitacao(err, req, res)
    //     }
    // }

    static atualizaEstoque = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await estoques.findByIdAndUpdate(id, req.body, {new: true})
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

    static deletaEstoque = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await estoques.findByIdAndDelete(id)
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

export default estoquesController
