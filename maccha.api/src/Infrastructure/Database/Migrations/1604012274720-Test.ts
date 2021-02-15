import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1604012274720 implements MigrationInterface {
    name = "Test1604012274720";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `FK_a1169144cd45b3aecb09037507b` ON `field_entity`");
        await queryRunner.query("ALTER TABLE `field_entity` CHANGE `type` `schemeId` varchar(128) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `field_entity` CHANGE `schemeId` `type` varchar(128) NOT NULL");
        await queryRunner.query("CREATE INDEX `FK_a1169144cd45b3aecb09037507b` ON `field_entity` (`contentId`)");
    }

}
