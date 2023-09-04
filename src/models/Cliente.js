import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    id: {type: String},
    user: {type: String, required: true, unique: true,},
    cpf: {type: Number, required: true, unique: true, min: 9, max: 11},
    email: {type: String, required: true, unique: true, lowercase: true},
    nameUser: {type: String, required: true, unique: true,},
    password: {type: String, required: true, minLength: 8},
    cep: {type: Number},
    adreess: {type: String},
    adreessNumber: {type: Number},
    adreessComplement: {type: String},
    dateRegister: {type: Date, default: new Date()},
    typeUser: {type: String, required: true, default: "normal"}
}, {
    versionKey: false
})

const clientes = mongoose.model("clientes", clienteSchema)

export default clientes
