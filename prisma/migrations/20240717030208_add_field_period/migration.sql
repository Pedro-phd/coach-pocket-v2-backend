/*
  Warnings:

  - You are about to drop the `Diet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Food` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `member_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workout_item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Diet" DROP CONSTRAINT "Diet_memberId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Meal" DROP CONSTRAINT "Meal_dietId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Meal" DROP CONSTRAINT "Meal_foodId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Meal" DROP CONSTRAINT "Meal_mealId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Workout" DROP CONSTRAINT "Workout_memberId_fkey";

-- DropForeignKey
ALTER TABLE "public"."member_history" DROP CONSTRAINT "member_history_memberId_fkey";

-- DropForeignKey
ALTER TABLE "public"."workout_item" DROP CONSTRAINT "workout_item_exercise_id_fkey";

-- DropTable
DROP TABLE "public"."Diet";

-- DropTable
DROP TABLE "public"."Exercise";

-- DropTable
DROP TABLE "public"."Food";

-- DropTable
DROP TABLE "public"."Meal";

-- DropTable
DROP TABLE "public"."Member";

-- DropTable
DROP TABLE "public"."Workout";

-- DropTable
DROP TABLE "public"."member_history";

-- DropTable
DROP TABLE "public"."workout_item";

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "coach_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3),
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "zipcode" TEXT,
    "address_details" TEXT,
    "house_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member_history" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "coach_id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_item" (
    "id" TEXT NOT NULL,
    "reps" TEXT,
    "weight" TEXT,
    "interval" TEXT,
    "exercise_id" TEXT NOT NULL,

    CONSTRAINT "workout_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "thumbUrl" TEXT,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kcal" TEXT NOT NULL,
    "carbohydrate" TEXT NOT NULL,
    "protein" TEXT NOT NULL,
    "fat" TEXT NOT NULL,
    "reference_value" TEXT NOT NULL,
    "coach_id" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diet" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "mealId" TEXT,
    "dietId" TEXT,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_document_key" ON "Member"("document");

-- CreateIndex
CREATE INDEX "Exercise_coachId_title_idx" ON "Exercise"("coachId", "title");

-- CreateIndex
CREATE INDEX "Food_name_coach_id_idx" ON "Food"("name", "coach_id");

-- AddForeignKey
ALTER TABLE "member_history" ADD CONSTRAINT "member_history_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_item" ADD CONSTRAINT "workout_item_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
