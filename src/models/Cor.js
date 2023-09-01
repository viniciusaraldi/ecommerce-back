import mongoose from "mongoose";

const corSchema = new mongoose.Schema({
    id: {type: String},
    cor: {type: String, required: true}
})

const cores = mongoose.model("cores", corSchema)

export default cores
