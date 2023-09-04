import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    id: {type: String},
    idUser: {type: mongoose.Types.ObjectId, ref: "clientes", required: true},
    itens: [{
        idProduct: {type: mongoose.Types.ObjectId, ref: "produtos"},
        quantityProduct: {type: Number, required: true},
    }],
    status: {type: String},
    datePedido: {type: Date, defaul: new Date()},
    quantityProductFinal: {type: Number, required: true},
    total: {type: mongoose.Types.Decimal128, required: true},
});

const pedidos = mongoose.model("pedidos", pedidoSchema);

export default pedidos;
