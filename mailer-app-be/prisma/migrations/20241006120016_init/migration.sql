-- CreateTable
CREATE TABLE "Mail" (
    "id" UUID NOT NULL,
    "sender" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "subject" TEXT,
    "body" TEXT,

    CONSTRAINT "Mail_pkey" PRIMARY KEY ("id")
);
