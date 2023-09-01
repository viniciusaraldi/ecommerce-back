import erroSolicitacao from '../middleware/erroSolicitacao.js';
import tamanhos from '../models/Tamanho.js'

class tamanhoController {

    static listagemTamanho = async (req, res) => {
        try {
            const dados = await tamanhos.find();
            if (!dados || dados.length === 0) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "Tamanhos inexistentes"
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Tamanhos encontrados com sucesso!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static adicionaTamanho = async (req, res) => {
        try {
            const dados = new tamanhos(req.body)
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

    static atualizaTamanho = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await tamanhos.findByIdAndUpdate(id, req.body, {new: true})
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

    static deletaTamanho = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await tamanhos.findByIdAndDelete(id)
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

export default tamanhoController
