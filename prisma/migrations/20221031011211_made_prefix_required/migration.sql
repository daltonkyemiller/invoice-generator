/*
  Warnings:

  - Made the column `prefixId` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "notes" TEXT DEFAULT 'Thank you!',
    "prefixId" INTEGER NOT NULL,
    CONSTRAINT "Company_prefixId_fkey" FOREIGN KEY ("prefixId") REFERENCES "Prefix" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("address", "city", "id", "name", "notes", "prefixId") SELECT "address", "city", "id", "name", "notes", "prefixId" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
