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

module.exports = {
    buscaEmail
}