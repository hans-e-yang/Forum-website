-- RedefineIndex
DROP INDEX "User_username_key";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
