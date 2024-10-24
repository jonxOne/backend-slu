const recuperarSenhaService = require("../services/recuperarsenhaService");
const sendEmail = require("../services/envioDeEmail");

const recuperandoSenha = async (req, res) => {
    try{
        const { email } = req.body;
        var searchUser = await recuperarSenhaService.buscaEmail(email);
        try {
            if (searchUser === null) {
                return res.status(400).json({message: 'user not found'})
            } else {
                await sendEmail.mailerEnviaEmail(email);
                res.json({message: "ok", data: searchUser});
            }
        }catch(erro){
            res.json({erro});
        }
    }catch(error){
        res.json({erro: error});
    }
}

module.exports =  recuperandoSenha;