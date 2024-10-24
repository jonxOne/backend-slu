import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function buscaEmail(email) {
    let busca = await prisma.alunos.findUnique({
        where: {
            email
        }
    });
    return busca;
}

async function buscaId(id) {
    let buscaId = await prisma.alunos.findUnique({
        where: {
            id: Number(id)
        }
    });
    return buscaId;
}

module.exports = {
    buscaEmail,
    buscaId
}