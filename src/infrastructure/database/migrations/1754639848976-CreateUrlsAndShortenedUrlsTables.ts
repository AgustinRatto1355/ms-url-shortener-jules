import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUrlsAndShortenedUrlsTables1754639848976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`urls\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`value\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`shortened_urls\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`value\` varchar(255) NOT NULL,
                \`url_id\` int NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`FK_dc4 shortened_url_url\` FOREIGN KEY (\`url_id\`) REFERENCES \`urls\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \`shortened_urls\`");
        await queryRunner.query("DROP TABLE \`urls\`");
    }

}
