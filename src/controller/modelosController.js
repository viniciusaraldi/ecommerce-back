import erroSolicitacao from '../middleware/erroSolicitacao.js';
import modelos from '../models/Modelo.js'

class modelosController {

    static listagemModelos = async (req, res) => {
        try {
            const dados = await modelos.find({});
            if (!dados || dados.length === 0) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "modelos inexistentes"
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "modelos encontrados com sucesso!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static adicionaModelo = async (req, res) => {
        try {
            const dados = new modelos(req.body)
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

    static atualizaModelo = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await modelos.findByIdAndUpdate(id, req.body, {new: true})
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

    static deletaModelo = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await modelos.findByIdAndDelete(id)
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

export default modelosController
