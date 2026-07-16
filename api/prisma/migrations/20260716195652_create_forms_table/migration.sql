-- CreateEnum
CREATE TYPE "FormChoice" AS ENUM ('one', 'two', 'three', 'four', 'five', 'six');

-- CreateTable
CREATE TABLE "forms" (
    "id" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "name" "FormChoice" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "forms_levelId_name_key" ON "forms"("levelId", "name");

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
