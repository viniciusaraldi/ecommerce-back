import erroSolicitacao from '../middleware/erroSolicitacao.js';
import cores from '../models/Cor.js'

class corController {

    static listagemCor = async (req, res) => {
        try {
            const dados = await cores.find();
            if (!dados || dados.length === 0) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "Cores inexistentes"
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Cores encontrados com sucesso!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static adicionaCor = async (req, res) => {
        try {
            const dados = new cores(req.body)
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

    static atualizaCor = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await cores.findByIdAndUpdate(id, req.body, {new: true})
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

    static deletaCor = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await cores.findByIdAndDelete(id)
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

export default corController
