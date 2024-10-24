class Validacao{
    async validarCadastro(senhaDeConfirmacao, senha, email) {
        if (senhaDeConfirmacao != senha) {
            res.send("senhas não batem, por favor volte e corrija");
        } else if (!email.includes("@alu.ufc.br")) {
            res.send("por favor volte e insira um email da ufc");
        }
    }
}

module.exports = Validacao;