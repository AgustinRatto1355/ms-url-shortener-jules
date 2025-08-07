import { Module } from '@nestjs/common';
import { TOKENS } from 'src/application/tokens';
import { UrlRepository } from '../database/repositories/UrlRepository';
import { UrlUseCases } from 'src/application/use-cases/UrlUseCases';
import { UrlService } from 'src/domain/services/url.service';
import { SlugService } from 'src/domain/services/slug.service';
import { UrlController } from 'src/presentation/controllers/url.controller';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [
    UrlService,
    SlugService,
    { provide: TOKENS.UrlRepository, useClass: UrlRepository },
    UrlUseCases,
  ],
})
export class UrlModule {}