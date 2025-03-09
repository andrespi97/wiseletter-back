/*
  Warnings:

  - You are about to drop the column `userId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `Newsletter` table. All the data in the column will be lost.
  - The primary key for the `Rate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `newsletterId` on the `Rate` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Rate` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `idUser` to the `Folder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNewsletter` to the `Rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `Rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNewsletter` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Folder_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Folder" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Folder";
DROP TABLE "Folder";
ALTER TABLE "new_Folder" RENAME TO "Folder";
CREATE TABLE "new_Newsletter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "idFolder" INTEGER,
    "idUserCreator" INTEGER NOT NULL,
    "language" TEXT,
    CONSTRAINT "Newsletter_idFolder_fkey" FOREIGN KEY ("idFolder") REFERENCES "Folder" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Newsletter_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Newsletter" ("active", "createdAt", "description", "id", "idUserCreator", "language", "title", "updatedAt", "url") SELECT "active", "createdAt", "description", "id", "idUserCreator", "language", "title", "updatedAt", "url" FROM "Newsletter";
DROP TABLE "Newsletter";
ALTER TABLE "new_Newsletter" RENAME TO "Newsletter";
CREATE UNIQUE INDEX "Newsletter_url_key" ON "Newsletter"("url");
CREATE TABLE "new_Rate" (
    "idUser" INTEGER NOT NULL,
    "idNewsletter" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("idUser", "idNewsletter"),
    CONSTRAINT "Rate_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rate_idNewsletter_fkey" FOREIGN KEY ("idNewsletter") REFERENCES "Newsletter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rate" ("createdAt", "updatedAt", "value") SELECT "createdAt", "updatedAt", "value" FROM "Rate";
DROP TABLE "Rate";
ALTER TABLE "new_Rate" RENAME TO "Rate";
CREATE TABLE "new_Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "idNewsletter" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Subscription_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscription_idNewsletter_fkey" FOREIGN KEY ("idNewsletter") REFERENCES "Newsletter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subscription" ("createdAt", "id") SELECT "createdAt", "id" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
CREATE UNIQUE INDEX "Subscription_idUser_idNewsletter_key" ON "Subscription"("idUser", "idNewsletter");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
