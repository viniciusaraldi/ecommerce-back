import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import erroSolicitacao from './erroSolicitacao.js';

export const secret_key = process.env.SETTING_TOKEN

async function verificaTokenAdmin(req, res, next) {
    try {
        const token = await req.headers.authorization;
        const decoded = jwt.verify(token.split(" ")[1], secret_key)
        if(!token) {
            return res.status(401).send({
                success: false,
                status: 401,
                message: "token não fornecido!"
            })
        }
        if (decoded.userBusca.typeUser === 'admin') {
            next()
        } else {
            return res.status(403).send({
                success: false,
                status: 403,
                message: "Acesso não autorizado"
            });
        }
    } catch (err) {
        erroSolicitacao(err, req, res);
    }
}

export default verificaTokenAdmin
