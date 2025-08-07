import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './infrastructure/database/data-source';
import { UrlModule } from './infrastructure/inversion-of-control/UrlModule';
import { ShortUrlEntity } from './infrastructure/database/mapper/url.entity';

@Module({
  imports: [
    UrlModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([ShortUrlEntity])
  ],
})
export class AppModule {}
