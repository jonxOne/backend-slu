-- CreateTable
CREATE TABLE "alunos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "monitores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "administradores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "computadores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'livre',
    "numero" INTEGER NOT NULL,
    "emailAluno" TEXT NOT NULL,
    CONSTRAINT "computadores_emailAluno_fkey" FOREIGN KEY ("emailAluno") REFERENCES "alunos" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "laboratorios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'aberto',
    "numero" INTEGER NOT NULL,
    "emailAluno" TEXT NOT NULL,
    "emailMonitor" TEXT NOT NULL,
    CONSTRAINT "laboratorios_emailAluno_fkey" FOREIGN KEY ("emailAluno") REFERENCES "alunos" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "laboratorios_emailMonitor_fkey" FOREIGN KEY ("emailMonitor") REFERENCES "monitores" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "alunos_email_key" ON "alunos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "monitores_email_key" ON "monitores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "administradores_email_key" ON "administradores"("email");
