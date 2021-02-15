import {MigrationInterface, QueryRunner} from "typeorm";

export class Test41604157098965 implements MigrationInterface {
    name = "Test41604157098965";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `content_entity` CHANGE `publishIn` `publishIn` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `content_entity` CHANGE `publishIn` `publishIn` datetime NOT NULL");
    }

}
