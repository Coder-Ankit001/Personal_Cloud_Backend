/*
  Warnings:

  - The values [blue,emerald,rose,gray,violet,amber,sky,pink,teal,orange] on the enum `Color` will be removed. If these variants are still used in the database, this will fail.
  - The `color` column on the `Node` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Color_new" AS ENUM ('BLUE', 'EMERALD', 'ROSE', 'GRAY', 'VIOLET', 'AMBER', 'SKY', 'PINK', 'TEAL', 'ORANGE');
ALTER TABLE "Node" ALTER COLUMN "color" TYPE "Color_new" USING ("color"::text::"Color_new");
ALTER TYPE "Color" RENAME TO "Color_old";
ALTER TYPE "Color_new" RENAME TO "Color";
DROP TYPE "public"."Color_old";
COMMIT;

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "color",
ADD COLUMN     "color" "Color" NOT NULL DEFAULT 'BLUE';
