import mongoose from "mongoose";

async function erroSolicitacao(err, req, res) {
    return (res.status(500).send({
        success: false,
        status: 500,
        message: err.message
    }));
}

export default erroSolicitacao
