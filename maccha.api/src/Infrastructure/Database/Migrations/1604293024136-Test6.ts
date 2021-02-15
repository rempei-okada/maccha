import {MigrationInterface, QueryRunner} from "typeorm";

export class Test61604293024136 implements MigrationInterface {
    name = "Test61604293024136";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post_type_entity` ADD `displayFormat` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post_type_entity` DROP COLUMN `displayFormat`");
    }

}
