/*
  Warnings:

  - The primary key for the `Memo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `memoId` on the `Memo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Memo_authorId_idx";

-- DropIndex
DROP INDEX "public"."Memo_memoId_key";

-- DropIndex
DROP INDEX "public"."Memo_taskId_idx";

-- AlterTable
ALTER TABLE "public"."Memo" DROP CONSTRAINT "Memo_pkey",
DROP COLUMN "memoId",
ADD CONSTRAINT "Memo_pkey" PRIMARY KEY ("taskId");
