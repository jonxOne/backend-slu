/*
  Warnings:

  - You are about to drop the column `emailAluno` on the `computadores` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_computadores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'livre',
    "numero" INTEGER NOT NULL,
    "numeroLaboratorio" INTEGER NOT NULL,
    CONSTRAINT "computadores_numeroLaboratorio_fkey" FOREIGN KEY ("numeroLaboratorio") REFERENCES "laboratorios" ("numero") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_computadores" ("id", "numero", "numeroLaboratorio", "status") SELECT "id", "numero", "numeroLaboratorio", "status" FROM "computadores";
DROP TABLE "computadores";
ALTER TABLE "new_computadores" RENAME TO "computadores";
CREATE UNIQUE INDEX "computadores_numero_key" ON "computadores"("numero");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
