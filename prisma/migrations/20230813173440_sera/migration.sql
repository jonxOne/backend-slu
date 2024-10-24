/*
  Warnings:

  - You are about to drop the column `emailAluno` on the `laboratorios` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_laboratorios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'aberto',
    "numero" INTEGER NOT NULL,
    "emailMonitor" TEXT NOT NULL,
    CONSTRAINT "laboratorios_emailMonitor_fkey" FOREIGN KEY ("emailMonitor") REFERENCES "monitores" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_laboratorios" ("emailMonitor", "id", "numero", "status") SELECT "emailMonitor", "id", "numero", "status" FROM "laboratorios";
DROP TABLE "laboratorios";
ALTER TABLE "new_laboratorios" RENAME TO "laboratorios";
CREATE UNIQUE INDEX "laboratorios_numero_key" ON "laboratorios"("numero");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
