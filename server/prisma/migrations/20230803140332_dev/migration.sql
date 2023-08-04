-- CreateTable
CREATE TABLE "Lootbox" (
    "id" TEXT NOT NULL,
    "entryCost" INTEGER NOT NULL,
    "payout" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "payoutDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lootbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lootbox_id_key" ON "Lootbox"("id");

-- AddForeignKey
ALTER TABLE "Lootbox" ADD CONSTRAINT "Lootbox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
