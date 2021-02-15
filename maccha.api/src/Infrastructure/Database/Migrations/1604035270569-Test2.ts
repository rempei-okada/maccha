import {MigrationInterface, QueryRunner} from "typeorm";

export class Test21604035270569 implements MigrationInterface {
    name = "Test21604035270569";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `scheme_entity` ADD `sort` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `scheme_entity` DROP COLUMN `sort`");
    }

}
