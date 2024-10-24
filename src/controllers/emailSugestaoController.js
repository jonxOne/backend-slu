const sugestaoService = require("../services/sugestaoService");
const sendEmail = require("../services/envioDeEmail");

const enviandoSugestao = async (req, res) => {
    try{
        const {id} = req.params;
        const { email, sugestao, nome } = req.body;
        var searchUser = await sugestaoService.buscaId(id);
        if (!searchUser) {
            return res.status(400).json({message: 'user not found'})
        } else {
            await sendEmail.mailerEnviaEmail(email, sugestao, nome);
            res.status(200).json({message: "sugestão enviada", corpo_email:sugestao, usuario: email});
        }
    }catch(error){
        res.json({erro: error});
    }
}

module.exports = enviandoSugestao;