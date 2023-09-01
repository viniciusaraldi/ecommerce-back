import erroSolicitacao from '../middleware/erroSolicitacao.js';
import produtos from '../models/Produto.js'
import estoques from '../models/Estoque.js'

const camposPopulated = [
    { path: "cor", select: "cor -_id" },
    { path: "tamanhos", select: "faixa -_id" },
    { path: "disponivel", select: "statusPedido -_id" },
    { path: "estoque", select: "quantity -_id" },   
    { path: "colecao", select: "colecao -_id" },    
    { path: "modelo", select: "modelo -_id" },
    { path: "categoria", select: "categoria -_id" }
]

class produtoController {

    static listagemProduto = async (req, res) => {
        try {
            const dados = await produtos.find().populate(camposPopulated).sort({"_id": -1}).exec();
            if(!dados || dados.length === 0) {
                return res.status(404).send({
                    sucess: false,
                    status: 404,
                    message: "Produto não encontrado",
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Produtos encontrados!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        } 
    }

    static listagemProdutoPorBusca = async (req, res) => {
        try {
            const { ...dados } = req.query;
            const produtoFounded = await produtos.find(dados).populate(camposPopulated).exec()
            console.log(produtoFounded)
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Produtos encontrados!",
                data: produtoFounded
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static listagemProdutoPorId = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await produtos.findById(id).populate(camposPopulated).exec();
            if(!dados || dados.length === 0) {
                return res.status(404).send({
                    sucess: false,
                    status: 404,
                    message: "Produto não encontrado",
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Produtos encontrados!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        } 
    }

    static adicionaProduto = async (req, res) => {
        try {
            const {estoque, ...dados} = req.body
            const dadosEnvio = new produtos(dados)
            await produtos.populate(dadosEnvio, camposPopulated)
            await dadosEnvio.save()
            const novoEstoque = new estoques({
                idProduct: dadosEnvio._id,
                quantity: estoque
            })
            await novoEstoque.save();
            await produtos.findOneAndUpdate({nome: dados.nome}, {estoque: novoEstoque._id})
            return res.status(201).send({
                sucess: true,
                status: 201,
                message: "Produto adicionado com sucesso!",
                data: dadosEnvio
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        } 
    }
    
    static atualizaProduto = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await produtos.findByIdAndUpdate(id, req.body, {new: true}).populate(camposPopulated).exec();;
            if(!dados || dados.length === 0) {
                return res.status(404).send({
                    sucess: false,
                    status: 404,
                    message: "Produto não encontrado",
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Produtos atualizado!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        } 
    }
    
    static deletaProduto = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await produtos.findByIdAndDelete(id).populate(camposPopulated).exec();
            if(!dados || dados.length === 0) {
                return res.status(404).send({
                    sucess: false,
                    status: 404,
                    message: "Produto não encontrado",
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Produtos deletado!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        } 
    }

}

export default produtoController
