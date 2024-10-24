/*
  Warnings:

  - Added the required column `numeroLaboratorio` to the `computadores` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_computadores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'livre',
    "numero" INTEGER NOT NULL,
    "emailAluno" TEXT NOT NULL,
    "numeroLaboratorio" INTEGER NOT NULL,
    CONSTRAINT "computadores_emailAluno_fkey" FOREIGN KEY ("emailAluno") REFERENCES "alunos" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "computadores_numeroLaboratorio_fkey" FOREIGN KEY ("numeroLaboratorio") REFERENCES "laboratorios" ("numero") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_computadores" ("emailAluno", "id", "numero", "status") SELECT "emailAluno", "id", "numero", "status" FROM "computadores";
DROP TABLE "computadores";
ALTER TABLE "new_computadores" RENAME TO "computadores";
CREATE UNIQUE INDEX "computadores_numero_key" ON "computadores"("numero");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
