-- CreateEnum
CREATE TYPE "SubjectTypeChoice" AS ENUM ('compulsory', 'optional');

-- CreateTable
CREATE TABLE "form_subjects" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "levelSubjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "SubjectTypeChoice" NOT NULL DEFAULT 'compulsory',

    CONSTRAINT "form_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "form_subjects_formId_levelSubjectId_key" ON "form_subjects"("formId", "levelSubjectId");

-- AddForeignKey
ALTER TABLE "form_subjects" ADD CONSTRAINT "form_subjects_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_subjects" ADD CONSTRAINT "form_subjects_levelSubjectId_fkey" FOREIGN KEY ("levelSubjectId") REFERENCES "level_subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
