import AdmService from '../services/admService';

const admService = new AdmService();

class AdmController{
    async AdmLogin(req, res) {
        try{
            const { email } = req.body;
            let buscaAdm = await admService.buscaAluno(email);
            try {
                if (buscaAdm === null) {
                        return res.status(400).send('user not found');
                } else {
                        res.json({user: buscaAdm});
                }
            }catch (error) {
                    res.json({error});
            }
        }catch(error){
                res.json({error});
        }
    }

    async buscaTodosOsAlunos(req, res) {
        try {
            const alunos = await admService.buscaAlunos();
            return res.json({
                success: true,
                data: alunos,
                message: "alunos found successfully",
            });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    async buscaTodosOsLaboratorios(req, res) {
        try {
            const laboratorios = await admService.buscaLabs();
            return res.json({
                success: true,
                data: laboratorios,
                message: "laboratorios found successfully",
            });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    async buscaTodosOsMonitores(req, res) {
        try {
            const monitores = await admService.buscaMonitores();
            return res.json({
                success: true,
                data: monitores,
                message: "monitores found successfully",
            });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    async cadastroMonitor(req, res) {
        try {
            const { nome, email, curso, senha } = req.body;
            let busca = await admService.buscaMonitor(email);
            if (busca) {
                res.json({message: "alredy user"});
            } else {
                try {
                    let novoMonitor = await admService.createMonitor(nome, email, curso, senha);
                    res.json({message: "ok", user: novoMonitor});
                } catch (error) {
                    res.json({erro: error});
                }
            }
        } catch (erro) {
            res.json({erro: erro});
        }
    }

    async delMonitor(req, res) {
        try{
            const { email } = req.body;
            let buscaADeletarMonitor = await admService.buscaMonitor(email);
            try {
                if (buscaADeletarMonitor) {
                    try {
                        monitorADeletar = await admService.deleteMonitor(email);
                        res.json({message:"deleted", user: monitorADeletar});
                    } catch (erro) {
                        res.json({message: erro});
                    }
                }
            } catch (error) {
                res.json({error});
            }
        }catch(error){
            res.json({error});
        }
    }

    async delAluno(req, res) {
        try{
            const { email } = req.body;
            let buscaADeletar = await admService.buscaUsuarioADeletar(email);
            try {
                if (buscaADeletar) {
                    try {
                        let alunoADeletar = await admService.deleteUsuario(email);
                        res.json({message: "aluno deletado", user: alunoADeletar});
                    } catch (erro) {
                        res.json({erro: erro});
                    }
                }
            } catch (error) {
                res.json({error});
            }
        }catch(error){
            res.json({error});
        }
    }

    async addLab(req, res) {
        try {
            const {numero, emailMonitor } = req.body;
            let monitor = await admService.buscaMonitor(emailMonitor);
            let buscaLaboatorio = await admService.buscaLab(numero);
            if (monitor){
                if(buscaLaboatorio){
                    let newLab = await admService.adicionarLaboratorios(numero, monitor);
                    res.json({
                         message: "laboratorio criado com sucesso",
                         data: newLab
                    });
                }else{
                    res.json({message: "laboratorio ja existe"});
                }
            }else{
                res.json({message: "monitor não encontrado"})
            }
        }catch(erro){
            return res.json({erro: erro});
        }
    }

    async perfil(req, res) {
            try{
                const {id} = req.params;
                const adm = await admService.buscaAdmPorId(id);
                if (!adm){
                    return res.status(400).json({message: "usuario não encontrado"})
                }
                return res.status(200).json({
                    message: "usuario encontrado",
                    adm: adm
                });
            }catch(error){
                res.json({erro:error});
            }
    }

    async buscaLab(req, res){
        try{
            const {numero} = req.body;
            const lab = await admService.buscaLab(numero);
            if(lab){
                res.json({
                    lab: lab
                });
            }else{
                res.json({
                    message:"lab não encontrado"
                });
            }
        }catch(error){
            res.json({erro: error});
        }
    }

    async adicionaComputador(req, res){
        try{
            const {numeroComputador, numeroLaboratorio} = req.body;
            const buscaLaboratorio = await admService.buscaLab(numeroLaboratorio);
            const buscaComputador = await admService.buscaComputador(numeroComputador);
            if (buscaLaboratorio){
                if(buscaComputador){
                    res.json({message: "ja existe um computador com esse numero"});
                }else{
                    try{
                        let computador = await admService.createComputador(numeroComputador, buscaLaboratorio);
                        res.json({message: "criado", computador: computador});
                    }catch(error){
                        res.json({erro:"o erro é: " + error});
                    }
                }
            }else{
                res.json({message: "laboratorio não encontrado"});
            }
        }catch(error){
            res.json({erro: error})
        }
    }
}

module.exports = AdmController
