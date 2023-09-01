import mongoose from 'mongoose'

const statusSchema = new mongoose.Schema({
    id: {type: String},
    statusPedido: {type: String, required: true, minLength: 5}
});

const status = mongoose.model("status", statusSchema)

export default status
