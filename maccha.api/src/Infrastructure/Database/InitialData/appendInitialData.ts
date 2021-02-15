import { RoleType } from "@/Models/Users/role.enum";
import { hash } from "bcrypt";
import { QueryRunner } from "typeorm";
import { v4 } from "uuid";

const html = `
`;

export async function appendInitialData(queryRunner: QueryRunner): Promise<void> {
    await addAdminUser(queryRunner);
    await addDefaultWebSite(queryRunner);
    // await addDefaultPost("sample_site", queryRunner);
}

export async function addAdminUser(queryRunner: QueryRunner) {
    const password = await hash("admin", 10);
    await queryRunner.query("INSERT INTO `user_entity`(`userId`, `name`, `avatar`, `email`, `password`,`role`, `isActive`) VALUES('admin', '管理者ユーザー', '','admin@admin.com','" + password + "', " + RoleType.Admin + ", 1)");

}

export async function addDefaultWebSite(queryRunner: QueryRunner) {
    await queryRunner.query("INSERT INTO `web_site_entity`(`webSiteId`, `name`, `displayName`, `host`,`description`) VALUES('sample_site', 'sample_site', 'サンプルサイト', 'https://example.com','サンプルサイトです.ここに管理するサイトを追加してください.');");
}

export async function addDefaultPost(identifier: string, queryRunner: QueryRunner): Promise<void> {
    const postTypeId = v4();
    const postId = v4();
    await queryRunner.query("INSERT INTO `post_type_entity`(`postTypeId`, `name`, `displayName`, `description`, `identifier`, `isDeleted`) VALUES ('" + postTypeId + "', 'blog', 'ブログ', 'ブログの投稿です.', '" + identifier + "', 0);");
    await queryRunner.query("INSERT INTO `post_entity`(`postId`, `title`, `content`, `metadata`,`thumbnail`, `media`, `identifier`, `status`, `postTypeId`, `createdBy`, `publishIn`) VALUES ('" + postId + "', '初めての投稿', '" + html + "', '','', '', '" + identifier + "', 1, '" + postTypeId + "', 'admin', '2020-09-26 0:0:0')");
}