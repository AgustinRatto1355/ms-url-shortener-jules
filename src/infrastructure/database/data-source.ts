// src/infrastructure/database/data-source.ts

import { DataSource } from 'typeorm';
import { getDatabaseConfig } from './database-config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const db = getDatabaseConfig();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  synchronize: db.syncronize, 
  namingStrategy: new SnakeNamingStrategy()
});
