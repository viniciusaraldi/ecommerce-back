// Importações Bibliotecas
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
// Importações Projetos
import db from './config/db.js';
import clientes from './routes/clienteRoutes.js'
import cores from './routes/corRoutes.js'
import tamanhos from './routes/tamanhoRoutes.js'
import produtos from './routes/produtoRoutes.js'
import pedidos from './routes/pedidosRoutes.js'
import categorias from './routes/categoriasRoutes.js'
import estoques from './routes/estoqueRoutes.js'
import modelos from './routes/modelosRoutes.js'
import status from './routes/statusRoutes.js'
import colecoes from './routes/colecaoRoutes.js'
import verificaTokenAdmin from './middleware/validaToken.js';

db.on('error', () => console.log("Erro ao conectar"))
db.once('open', () => console.log("Sucesso ao conectar o banco de dados"))

const app = express()

app.use(
    cors(),
    express.json(),
    clientes,
    pedidos,
    produtos,
    categorias,
    estoques,
    modelos,
    status,
    colecoes,
    cores,
    tamanhos,
    verificaTokenAdmin,
    )

export default app