import mongoose from 'mongoose'

const modeloSchema = new mongoose.Schema({
    id: {type: String},
    modelo: {type: String, required: true, minLength: 5}
});

const modelos = mongoose.model("modelos", modeloSchema)

export default modelos
