import erroSolicitacao from '../middleware/erroSolicitacao.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import clientes from '../models/Cliente.js'
import { secret_key } from '../middleware/validaToken.js';

class clienteController {

    static listagemClientes = async (req, res) => {
        try {
            const dados = await clientes.find().sort({dateRegister: 1});
            if (!dados || dados.length === 0) {
                return res.status(404).send({
                    success: true,
                    status: 404,
                    message: "Clientes inexistentes"
                })
            }
            return res.status(200).send({
                success: true,
                status: 200,
                message: "Clientes encontrados com sucesso!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static listagemClientesPorBusca = async (req, res) => {
        try {
            const {user,cpf,email,nameUser,cep,dateRegister,typeUser} = await req.body;
            const busca = {}
            
            if (user) busca.user = user
            if (cpf) busca.cpf = cpf
            if (email) busca.email = email
            if (nameUser) busca.nameUser = nameUser
            if (cep) busca.cep = cep
            if (dateRegister) busca.dateRegister = dateRegister
            if (typeUser) busca.typeUser = typeUser

            const userFounded = await clientes.find(busca)
            if (!userFounded || userFounded.length === 0) {
                return res.status(404).send({
                    success: true,
                    status: 404,
                    message: "Clientes inexistentes"
                })
            }
            return res.status(200).send({
                success: true,
                status: 200,
                message: "Clientes encontrados com sucesso!",
                data: userFounded
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static listagemClientesPorId = async (req, res) => {
        try {
            const {id} = req.params
            const dados = await clientes.findById(id);
            if (!dados || dados.length === 0) {
                return res.status(404).send({
                    success: true,
                    status: 404,
                    message: "Cliente não encontrado"
                })
            }
            return res.status(200).send({
                success: true,
                status: 200,
                message: "Id encontrado com sucesso!",
                data: dados
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static loginClientes = async (req, res) => {
        try {
            const {email,user, cpf, password} = req.body
            const busca = {}

            if (email) {busca.email = email};
            if (user) {busca.user = user};
            if (cpf) {busca.cpf = cpf};

            const userBusca = await clientes.findOne(busca)

            if(userBusca) {
                const correctPassword = await bcrypt.compare(password, userBusca.password)
                if (correctPassword) {
                    const token = jwt.sign({userBusca}, secret_key)
                    const decoded = jwt.verify(token, secret_key)
                    return res.status(200).send({
                        success: true,
                        status: 200,
                        message: "Feito Login com sucesso!",
                        data: {
                            token: token,
                            usuario: decoded.userBusca
                        }
                    })
                } else {
                    return res.status(404).send({
                        success: false,
                        status: 404,
                        message: "Credenciais incorretas!"
                    })
                }
            } else {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "Credenciais incorretas!"
                })
            }
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static adicionarClientes = async (req, res) => {
        try {
            const salt = 10;
            const {user,cpf,email,nameUser,password,cep,adreess,adreessNumber,adreessComplement,dateRegister} = await req.body;
            const hashSenha = await bcrypt.hash(password, salt)

            const userFounded = await clientes.findOne({
                nameUser: nameUser,
                email: email,
                cpf: cpf, 
                user: user
            });
            
            if (userFounded) {
                return res.status(422).send({
                    success: true,
                    status: 422,
                    message: "Nome de Usuário já existente!"
                })
            }

            const newUser = new clientes({
                user: user,
                cpf: cpf,
                email: email,
                nameUser: nameUser,
                password: hashSenha,
                cep: cep,
                adreess: adreess,
                adreessNumber: adreessNumber,
                adreessComplement: adreessComplement,
                dateRegister: dateRegister
            })
            await newUser.save()
            return res.status(201).send({
                success: true,
                status: 201,
                message: "Adicionado com sucesso!",
                data: newUser
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static atualizarClientes = async (req, res) => {
        try {
            const {id} = req.params
            const {user,cpf,email,nameUser, cep, adreess, adreessNumber, adreessComplement, typeUser} = req.body
            const busca = {}
            
            const userFounded = await clientes.findOne({
                nameUser: nameUser,
                email: email,
                cpf: cpf, 
                user: user
            });
            
            if (userFounded) {
                return res.status(422).send({
                    success: true,
                    status: 422,
                    message: "Nome de Usuário já existente!"
                })
            }

            if (user) busca.user = user
            if (cpf) busca.cpf = cpf
            if (email) busca.email = email
            if (nameUser) busca.nameUser = nameUser
            if (cep) busca.cep = cep
            if (adreess) busca.adreess = adreess
            if (adreessNumber) busca.adreessNumber = adreessNumber
            if (adreessComplement) busca.adreessComplement = adreessComplement
            if (typeUser) busca.typeUser = typeUser

            const dadosEnvio = await clientes.findByIdAndUpdate(id, busca, {new: true})
            return res.status(200).send({
                success: true,
                status: 200,
                message: "Atualizado com sucesso!",
                data: dadosEnvio
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static recuperaSenha = async (req, res) => {
        try {
            const {user,cpf,email,nameUser,password} = req.body;
            const busca = {};
            if (user) busca.user = user
            if (cpf) busca.cpf = cpf
            if (email) busca.email = email
            if (nameUser) busca.nameUser = nameUser

            const userFounded = await clientes.findOne(busca)

            if (!userFounded || userFounded.length === 0) {
                return res.status(404).send({
                    success: true,
                    status: 404,
                    message: "Usuário não encontrado",
                })
            } else {
                const salt = 10;
                const hashSenha = await bcrypt.hash(password, salt)
                const dadosEnvio = await clientes.findOneAndUpdate(busca, {password: hashSenha}, {new: true})
                return res.status(200).send({
                    success: true,
                    status: 200,
                    message: "Senha alterada!",
                    data: dadosEnvio
                })
            }
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

    static deleteClientes = async (req, res) => {
        try {
            const {id} = req.params
            const dadosEnvio = await clientes.findByIdAndDelete(id)
            return res.status(200).send({
                success: true,
                status: 200,
                message: "Deletado com sucesso!",
                data: dadosEnvio
            })
        } catch (err) {
            return erroSolicitacao(err, req, res)
        }
    }

}

export default clienteController
