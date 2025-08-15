/*
  Warnings:

  - The values [MON,TUE,WED,THU,FRI,SAT,SUN] on the enum `DayOfWeek` will be removed. If these variants are still used in the database, this will fail.
  - The values [KAKAO,GOOGLE,NAVER] on the enum `Login` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DayOfWeek_new" AS ENUM ('월', '화', '수', '목', '금', '토', '일');
ALTER TABLE "public"."Task" ALTER COLUMN "repeatDays" DROP DEFAULT;
ALTER TABLE "public"."Task" ALTER COLUMN "repeatDays" TYPE "public"."DayOfWeek_new"[] USING ("repeatDays"::text::"public"."DayOfWeek_new"[]);
ALTER TYPE "public"."DayOfWeek" RENAME TO "DayOfWeek_old";
ALTER TYPE "public"."DayOfWeek_new" RENAME TO "DayOfWeek";
DROP TYPE "public"."DayOfWeek_old";
ALTER TABLE "public"."Task" ALTER COLUMN "repeatDays" SET DEFAULT ARRAY[]::"public"."DayOfWeek"[];
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Login_new" AS ENUM ('카카오', '구글', '네이버');
ALTER TABLE "public"."User" ALTER COLUMN "currentLogin" TYPE "public"."Login_new" USING ("currentLogin"::text::"public"."Login_new");
ALTER TYPE "public"."Login" RENAME TO "Login_old";
ALTER TYPE "public"."Login_new" RENAME TO "Login";
DROP TYPE "public"."Login_old";
COMMIT;
