-- CreateEnum
CREATE TYPE "LevelChoice" AS ENUM ('ordinary', 'advanced');

-- CreateTable
CREATE TABLE "levels" (
    "id" TEXT NOT NULL,
    "name" "LevelChoice" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "levels_name_key" ON "levels"("name");
