import mongoose from "mongoose";

const produtosSchema = new mongoose.Schema({
    id: {type: String},
    nome: {type: String, required: true},
    descricao: {type: String, required: true},
    dataRegister: {type: Date, default: new Date()},
    preco: {type: mongoose.Types.Decimal128, required: true},
    cor: {type: mongoose.Types.ObjectId, ref: "cores", required: true},
    tamanhos: {type: mongoose.Types.ObjectId, ref: "tamanhos", required: true},
    estoque: {type: mongoose.Types.ObjectId, ref: "estoqueProdutos"},
    disponivel: {type: mongoose.Types.ObjectId, ref: "status", required: true},
    colecao: {type: mongoose.Types.ObjectId, ref: "colecoes", required: true},
    categoria: {type: mongoose.Types.ObjectId, ref: "categorias", required: true},
    modelo: {type: mongoose.Types.ObjectId, ref: "modelos", required: true},
}, {
    versionKey: false
})

const produtos = mongoose.model("produtos", produtosSchema)

export default produtos
