import pedidos from '../models/Pedido.js';
import produtos from '../models/Produto.js';
import erroSolicitacao from '../middleware/erroSolicitacao.js';
import estoqueProdutos from '../models/Estoque.js';

class pedidosController {

    static listagemPedidos = async (req, res) => {
        try {
            const dados = await pedidos.find().populate("idUser").populate("itens.idProduct").exec()
            if(!dados || dados.length === 0) {
                return res.status(404).send({
                    sucess: false,
                    status: 404,
                    message: "Pedido não encontrado",
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Pedidos encontrados!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static listagemPedidosPorId = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await pedidos.findById(id)
            if(!dados || dados.length === 0) {
                return res.status(404).send({
                    sucess: false,
                    status: 404,
                    message: "Pedido não encontrado",
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Pedido encontrado!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static listagemPedidosPorBusca = async (req, res) => {
        try {
            const { idUser, user, email, nameUser, idProduct, status, datePedido, total } = req.params
            const busca = {}

            if (user) busca.user = user
            if (idUser) busca.idUser = idUser
            if (email) busca.email = email
            if (nameUser) busca.nameUser = nameUser
            if (idProduct) busca.idProduct = idProduct
            if (status) busca.status = status 
            if (datePedido) busca.datePedido = datePedido 
            if (total) busca.total = total 

            const dadosEnvio = await pedidos.find(busca).populate("idUser").populate("itens.idProduct").exec()
            if(!dadosEnvio || dadosEnvio.length === 0) {
                return res.status(404).send({
                    sucess: false,
                    status: 404,
                    message: "Pedido não encontrado",
                })
            }
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Pedido(s) encontrado(s)!",
                data: dadosEnvio
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static adicionaPedidos = async (req, res) => {
        try {
            const dados = new pedidos(req.body)
            await pedidos.populate(dados, [
                { path: 'itens' },
                { path: 'idUser' }
            ], {new: true});
            const dadosEnvio = await dados.save()
            const estoque = await validacaoEstoque(dadosEnvio)
            if (!estoque) {
                return res.status(404).send({
                    sucess: false,
                    status: 404,
                    message: "Sem estoque desse produto!",
                })
            }
            return res.status(201).send({
                sucess: true,
                status: 201,
                message: "Pedido adicionado!",
                data: dadosEnvio
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static deletaPedidos = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await pedidos.findByIdAndDelete(id)
            return res.status(200).send({
                sucess: true,
                status: 200,
                message: "Pedido deletado!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    } 

}

async function validacaoEstoque(dadosPedido) {
    const pegaEstoque = await estoqueProdutos.findOne({itens: produtos._id}).populate("idProduct").exec();
    if (pegaEstoque.quantity === 0 || pegaEstoque.quantity <= 0) {
        return false;
    }

    const abateEstoque = pegaEstoque.quantity - dadosPedido.quantityProductFinal
    pegaEstoque.quantity = abateEstoque
    await pegaEstoque.save()
    return true
}


export default pedidosController
