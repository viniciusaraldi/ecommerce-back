import erroSolicitacao from '../middleware/erroSolicitacao.js';
import colecoes from '../models/Colecao.js'

class colecoesController {

    static listagemColecoes = async (req, res) => {
        try {
            const dados = await colecoes.find();
            if (!dados || dados.length === 0) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "colecoes inexistentes"
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "colecoes encontrados com sucesso!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static adicionaColecao = async (req, res) => {
        try {
            const dados = new colecoes(req.body)
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

    static atualizaColecao = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await colecoes.findByIdAndUpdate(id, req.body, {new: true})
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

    static deletaColecao = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await colecoes.findByIdAndDelete(id)
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

export default colecoesController
