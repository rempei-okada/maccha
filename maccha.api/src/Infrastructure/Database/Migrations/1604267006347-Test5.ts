import {MigrationInterface, QueryRunner} from "typeorm";

export class Test51604267006347 implements MigrationInterface {
    name = "Test51604267006347";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `field_entity` ADD `taxonomyId` varchar(255) NOT NULL");
        await queryRunner.query("CREATE INDEX `IDX_a1169144cd45b3aecb09037507` ON `field_entity` (`contentId`)");
        await queryRunner.query("CREATE INDEX `IDX_028f4e10f831a0d4026c4fc663` ON `field_entity` (`taxonomyId`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_028f4e10f831a0d4026c4fc663` ON `field_entity`");
        await queryRunner.query("DROP INDEX `IDX_a1169144cd45b3aecb09037507` ON `field_entity`");
        await queryRunner.query("ALTER TABLE `field_entity` DROP COLUMN `taxonomyId`");
    }

}
