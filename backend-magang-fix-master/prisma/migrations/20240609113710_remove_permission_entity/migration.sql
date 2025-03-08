/*
  Warnings:

  - You are about to drop the `PermissionRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PermissionRoles" DROP CONSTRAINT "PermissionRoles_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionRoles" DROP CONSTRAINT "PermissionRoles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserPermissions" DROP CONSTRAINT "UserPermissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "UserPermissions" DROP CONSTRAINT "UserPermissions_userId_fkey";

-- DropTable
DROP TABLE "PermissionRoles";

-- DropTable
DROP TABLE "Permissions";

-- DropTable
DROP TABLE "UserPermissions";
