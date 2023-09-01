import mongoose from "mongoose";

const tamanhosSchema = new mongoose.Schema({
    id: {type: String},
    faixa: {type: Array, required: true}
})

const tamanhos = mongoose.model("tamanhos", tamanhosSchema)

export default tamanhos
