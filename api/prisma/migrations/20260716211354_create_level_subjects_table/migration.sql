-- CreateTable
CREATE TABLE "level_subjects" (
    "id" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "level_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "level_subjects_code_key" ON "level_subjects"("code");

-- CreateIndex
CREATE UNIQUE INDEX "level_subjects_levelId_subjectId_key" ON "level_subjects"("levelId", "subjectId");

-- AddForeignKey
ALTER TABLE "level_subjects" ADD CONSTRAINT "level_subjects_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "level_subjects" ADD CONSTRAINT "level_subjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
