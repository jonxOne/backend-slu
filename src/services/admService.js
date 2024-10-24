import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class AdmService{
    async createMonitor(nome, email, curso, senha) {
        const novoMonitor = await prisma.monitores.create({
            data: {
                nome,
                email,
                curso,
                senha,
            },
        });
        return novoMonitor;
    }

    async deleteMonitor(email) {
        let del = await prisma.monitores.delete({
            where: {
                email
            },
        });
        return del;
    }

    async deleteUsuario(email) {
        let del = await prisma.alunos.delete({
            where: {
                email
            },
        });
        return del;
    }

    async buscaMonitor(email) {
        let userFind = await prisma.monitores.findUnique({
            where: { 
                email 
            }
        });
        return userFind;
    }

    async buscaAluno(email) {
        let userFind = await prisma.alunos.findUnique({
            where: {
                email
            }
        });
        return userFind;
    }

    async buscaAdm(email) {
        let userFind = await prisma.administradores.findUnique({
            where: {
                email
            }
        });
        return userFind;
    }

    async buscaUsuarioADeletar(email) {
        let userFind = await prisma.alunos.findUnique({
            where: {
                email
            }
        });
        return userFind;
    }

    async buscaAlunos () {
        let users = await prisma.alunos.findMany();
        return users;
    }

    async adicionarLaboratorios(numero, monitor){
        let newLab = await prisma.laboratorios.create({
            data: {
                numero: Number(numero),
                emailMonitor: monitor.email,
            },
            include:{
                monitor: true,
            },
        });
        return newLab;

    }

    async buscaLab(numero) {
        let busca = await prisma.laboratorios.findFirst({
            where: {
                numero: Number(numero)
            },
            include:{
                computadores: true
            }
        });
        return busca;
    }

    async buscaLabs() {
        let busca = await prisma.laboratorios.findMany();
        return busca;
    }

    async buscaMonitores() {
        let busca = await prisma.monitores.findMany();
        return busca;
    }

    async buscaAdmPorId(id){
         let buscaAdmPorId = await prisma.administradores.findUnique({
              where : {id : Number(id)}
         });
         return buscaAdmPorId;
    }

    async createComputador(numero, laboratorio){
        let novoComp = await prisma.computadores.create({
            data: {
                numero: Number(numero),
                numeroLaboratorio: Number(laboratorio.numero),
            },
            include:{
                laboratorio: true,
            },
        });
        return novoComp;
    }

    async buscaComputador(numero){
        let buscaComp = await prisma.computadores.findUnique({
            where:{numero: Number(numero)}
        });
        return buscaComp;
    }

} 

module.exports = AdmService;