-- CreateTable
CREATE TABLE "specific_competences" (
    "id" TEXT NOT NULL,
    "mainCompetenceId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specific_competences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specific_competences_mainCompetenceId_position_key" ON "specific_competences"("mainCompetenceId", "position");

-- AddForeignKey
ALTER TABLE "specific_competences" ADD CONSTRAINT "specific_competences_mainCompetenceId_fkey" FOREIGN KEY ("mainCompetenceId") REFERENCES "main_competences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
