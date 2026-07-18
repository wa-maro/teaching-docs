-- CreateTable
CREATE TABLE "main_competences" (
    "id" TEXT NOT NULL,
    "syllabusId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "main_competences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "main_competences_syllabusId_position_key" ON "main_competences"("syllabusId", "position");

-- AddForeignKey
ALTER TABLE "main_competences" ADD CONSTRAINT "main_competences_syllabusId_fkey" FOREIGN KEY ("syllabusId") REFERENCES "syllabi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
