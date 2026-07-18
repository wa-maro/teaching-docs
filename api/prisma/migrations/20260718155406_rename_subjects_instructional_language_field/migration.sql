/*
  Warnings:

  - You are about to drop the column `instructional_language` on the `subjects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "instructional_language",
ADD COLUMN     "instructionalLanguage" "LanguageChoice" NOT NULL DEFAULT 'EN';
