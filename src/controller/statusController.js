import erroSolicitacao from '../middleware/erroSolicitacao.js';
import status from '../models/Status.js'

class statusController {

    static listagemStatus = async (req, res) => {
        try {
            const dados = await status.find();
            if (!dados || dados.length === 0) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "status inexistentes"
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "status encontrados com sucesso!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static adicionaStatus = async (req, res) => {
        try {
            const dados = new status(req.body)
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

    static atualizaStatus = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await status.findByIdAndUpdate(id, req.body, {new: true})
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

    static deletaStatus = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await status.findByIdAndDelete(id)
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

export default statusController
