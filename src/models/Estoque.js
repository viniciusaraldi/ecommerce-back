import mongoose from 'mongoose'

const estoqueSchema = new mongoose.Schema({
    id: {type: String},
    idProduct: {type: mongoose.Types.ObjectId, ref: "produtos", required: true},
    quantity: {type: Number, required: true, default: 0}
});

const estoqueProdutos = mongoose.model("estoqueProdutos", estoqueSchema)

export default estoqueProdutos
