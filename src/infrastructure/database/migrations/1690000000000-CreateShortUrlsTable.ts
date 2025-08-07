import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShortUrlsTable1690000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE short_urls (
        id SERIAL PRIMARY KEY,
        original_url TEXT NOT NULL,
        slug VARCHAR(6) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE short_urls;
    `);
  }
}