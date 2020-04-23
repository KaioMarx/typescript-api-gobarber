import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddAvatarFieldToUsers1587578929199
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
