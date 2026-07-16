-- CreateEnum
CREATE TYPE "LanguageChoice" AS ENUM ('SW', 'EN', 'FR', 'ZH', 'AR');

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "instructional_language" "LanguageChoice" NOT NULL DEFAULT 'EN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");
