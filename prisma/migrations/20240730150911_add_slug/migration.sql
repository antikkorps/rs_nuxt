/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `salons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `salons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "salons" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "salons_slug_key" ON "salons"("slug");
