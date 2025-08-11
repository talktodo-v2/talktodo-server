/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kakaoEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[naverEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."Login" AS ENUM ('KAKAO', 'GOOGLE', 'NAVER');

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "currentLogin" "public"."Login",
ADD COLUMN     "googleEmail" VARCHAR(255),
ADD COLUMN     "kakaoEmail" VARCHAR(255),
ADD COLUMN     "naverEmail" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "User_kakaoEmail_key" ON "public"."User"("kakaoEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_naverEmail_key" ON "public"."User"("naverEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleEmail_key" ON "public"."User"("googleEmail");
