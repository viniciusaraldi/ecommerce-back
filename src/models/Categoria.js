import mongoose from 'mongoose'

const categoriaSchema = new mongoose.Schema({
    id: {type: String},
    categoria: {type: String, required: true, minLength: 3}
});

const categorias = mongoose.model("categorias", categoriaSchema)

export default categorias
