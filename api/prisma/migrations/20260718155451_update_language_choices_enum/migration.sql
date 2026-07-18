/*
  Warnings:

  - The values [SW,EN,FR,ZH,AR] on the enum `LanguageChoice` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LanguageChoice_new" AS ENUM ('sw', 'en', 'fr', 'zh', 'ar');
ALTER TABLE "public"."subjects" ALTER COLUMN "instructionalLanguage" DROP DEFAULT;
ALTER TABLE "subjects" ALTER COLUMN "instructionalLanguage" TYPE "LanguageChoice_new" USING ("instructionalLanguage"::text::"LanguageChoice_new");
ALTER TYPE "LanguageChoice" RENAME TO "LanguageChoice_old";
ALTER TYPE "LanguageChoice_new" RENAME TO "LanguageChoice";
DROP TYPE "public"."LanguageChoice_old";
ALTER TABLE "subjects" ALTER COLUMN "instructionalLanguage" SET DEFAULT 'en';
COMMIT;

-- AlterTable
ALTER TABLE "subjects" ALTER COLUMN "instructionalLanguage" SET DEFAULT 'en';
