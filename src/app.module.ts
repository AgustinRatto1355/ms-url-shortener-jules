import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './infrastructure/database/data-source';
import { UrlModule } from './infrastructure/inversion-of-control/UrlModule';

@Module({
  imports: [
    UrlModule,
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
})
export class AppModule {}
