const AlunoService = require("../services/alunoService");
const Validacao = require("../validations/alunoValidations");

const validations = new Validacao();
const userService = new AlunoService();

class AlunoController{
    async createAluno (req, res) {
        try{
            const { nome, email, curso, senha, senhaConfirm } = req.body;
            let busca = await userService.buscaAluno(email);
            await validations.validarCadastro(senhaConfirm, senha, email);
            if (busca) {
                res.json({message: 'ja existe um usuario com esse email'});
            } else {
                try {
                    let user = await userService.createUser(nome, email, curso, senha);
                    res.json({user: user,
                            message: 'create user success'});
                } catch (error) {
                    res.json({error});
                }
            }
        }catch(error){
            res.json({error})
        }
    }

     async LoginAluno(req, res) {
        try{
            const { email, senha } = req.body;
            let searchUser = await userService.buscaAluno(email);
            if (searchUser === null) {
                return res.status(400).json({message: 'user not found'})
            } else {
                res.json({
                    message: "ok",
                    user: searchUser,
                });
            }
        }catch(error){
            res.json({error})
        }
    }

    async updateAlunoSenha(req, res) {
        try{
            const { email, senha } = req.body
            let busca = await userService.buscaAluno(email);
            if (busca === null) {
                return res.status(400).send('user not found')
            } else {
                try {
                    let updateSenha = await userService.updateAluno(email, senha);
                    res.json({ message: "att", user: updateSenha });
                } catch (error) {
                    res.json({error})
                }
            }
        }catch(error){
            res.json({error: error});
        }
    }

    async updateAluno(req, res) {
        try{
            const {id} = req.params;
            let { nome, email, senha, curso } = req.body;
            let userFind = await userService.buscaAlunoPorId(id);
            if (!userFind) {
                res.send("user não encontrado");
            } else {
                try {
                    let updateDeTudo = await userService.updateDataAluno(nome, email, curso, senha)
                    res.json({message: "ok", user: updateDeTudo});
                } catch (erro) {
                    console.log(erro);
                }
            }
        }catch(error){
            res.json({erro: error});
        }
    }

    async PerfilAluno(req, res) {
        try{
            const {id} = req.params;
            const Aluno = await userService.buscaAlunoPorId(id);
            if (!Aluno){
                return res.status(400).json({message: "usuario não encontrado"})
            }
            return res.status(200).json({
                message: "usuario encontrado",
                aluno: Aluno
            });
        }catch(error){
            res.json({erro:error});
        }
    }
}    

module.exports = AlunoController