-- CreateTable
CREATE TABLE "Thread" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,
    CONSTRAINT "Thread_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,
    "threadid" INTEGER NOT NULL,
    CONSTRAINT "Post_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_threadid_fkey" FOREIGN KEY ("threadid") REFERENCES "Thread" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
-- Change user.username into name 
ALTER TABLE "User" RENAME COLUMN "username"
TO "name";