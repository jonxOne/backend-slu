/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `computadores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numero]` on the table `laboratorios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "computadores_numero_key" ON "computadores"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "laboratorios_numero_key" ON "laboratorios"("numero");
