import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class AlunoService{
    async createUser (nome, email, curso, senha) {
        const user = await prisma.alunos.create({
            data: {
                nome,
                email,
                curso,
                senha
            }
        });
        return user;    
    }

    async updateAluno(email, senha) {
        let updateSenha = await prisma.alunos.update({
        where:{
                email,
        },
        data:{
                senha,
        }, 
        });
        return updateSenha;
    }

    async updateDataAluno(nome, email,curso,senha){
        let updateData = await prisma.alunos.update({
            where:{
                email
            },
            data:{
                nome, curso, senha
            }
        });
        return updateData;
    }

    async buscaAluno(email) {
        let userFind = await prisma.alunos.findUnique({
            where:{
                email
            }
        });
        return userFind;
    }

    async buscaAlunoPorId(id){
        let buscaIdAluno = await prisma.alunos.findUnique({
            where : {id : Number(id)}
        });
        return buscaIdAluno
    }
}

module.exports = AlunoService