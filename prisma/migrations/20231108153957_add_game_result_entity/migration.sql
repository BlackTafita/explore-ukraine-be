-- CreateTable
CREATE TABLE "GameResult" (
    "id" SERIAL NOT NULL,
    "questionCategoryId" INTEGER NOT NULL,
    "questionsCount" INTEGER NOT NULL,
    "successAnswerCount" INTEGER NOT NULL,
    "isWin" BOOLEAN NOT NULL,

    CONSTRAINT "GameResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameResult" ADD CONSTRAINT "GameResult_questionCategoryId_fkey" FOREIGN KEY ("questionCategoryId") REFERENCES "QuestionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
