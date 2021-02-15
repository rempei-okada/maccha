import {MigrationInterface, QueryRunner} from "typeorm";

export class Test31604153594991 implements MigrationInterface {
    name = "Test31604153594991";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `scheme_entity` ADD `metadata` varchar(2048) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `scheme_entity` DROP COLUMN `metadata`");
    }

}
