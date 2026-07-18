/*
  Warnings:

  - You are about to drop the column `type` on the `form_subjects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "form_subjects" DROP COLUMN "type",
ADD COLUMN     "subjectType" "SubjectTypeChoice" NOT NULL DEFAULT 'compulsory';

-- CreateTable
CREATE TABLE "syllabi" (
    "id" TEXT NOT NULL,
    "levelSubjectId" TEXT NOT NULL,
    "publishedYear" INTEGER NOT NULL,
    "revisedYear" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "syllabi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "syllabi_levelSubjectId_publishedYear_key" ON "syllabi"("levelSubjectId", "publishedYear");

-- AddForeignKey
ALTER TABLE "syllabi" ADD CONSTRAINT "syllabi_levelSubjectId_fkey" FOREIGN KEY ("levelSubjectId") REFERENCES "level_subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
