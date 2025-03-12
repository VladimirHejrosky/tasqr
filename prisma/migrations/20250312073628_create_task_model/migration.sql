-- CreateEnum
CREATE TYPE "Repeat" AS ENUM ('none', 'daily', 'weekly', 'monthly');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(100) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "repeat" "Repeat" NOT NULL DEFAULT 'none',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
