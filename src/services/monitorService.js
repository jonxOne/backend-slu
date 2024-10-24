import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class MonitorService{
    async buscaMonitor(email) {
        let userFind = await prisma.monitores.findUnique({
            where: {
                email
            }
        });
        return userFind;
    }

    async buscaMonitorPorId(id){
          let buscaMonitorPorId = await prisma.monitores.findFirst({
              where : {id : Number(id)},
              include:{
                laboratorios: true
              }
          });
          return buscaMonitorPorId;
        }
}

module.exports = MonitorService