import mongoose from 'mongoose'

const colecaoSchema = new mongoose.Schema({
    id: {type: String},
    colecao: {type: String, required: true, minLength: 5}
});

const colecoes = mongoose.model("colecoes", colecaoSchema)

export default colecoes
