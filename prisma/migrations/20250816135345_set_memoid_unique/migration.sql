/*
  Warnings:

  - A unique constraint covering the columns `[memoId]` on the table `Memo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Memo_taskId_idx" ON "public"."Memo"("taskId");

-- CreateIndex
CREATE INDEX "Memo_authorId_idx" ON "public"."Memo"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Memo_memoId_key" ON "public"."Memo"("memoId");
