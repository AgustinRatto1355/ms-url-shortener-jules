import { Module } from '@nestjs/common';
import { TOKENS } from 'src/application/tokens';
import { UrlRepository } from '../database/repositories/UrlRepository';
import { UrlUseCases } from 'src/application/use-cases/UrlUseCases';
import { UrlController } from 'src/presentation/controllers/url.controller';
import { IUrlRepository } from 'src/application/ports/IUrlRepository';
import { ShortUrlService } from 'src/domain/services/short.url.service';
import { UrlService } from 'src/domain/services/url.service';
import { ShortUrlRepository } from '../database/repositories/ShortUrlRepository';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [
    { provide: TOKENS.UrlRepository, useClass: UrlRepository },
    { provide: TOKENS.ShortUrlRepository, useClass: ShortUrlRepository },
    {
      provide: UrlUseCases,
      useFactory: (
        shortUrlService: ShortUrlService,
        urlService: UrlService
      ) => {
        const baseUrl = process.env.SHORT_URL_BASE || 'http://localhost:3000';
        return new UrlUseCases(shortUrlService, urlService, baseUrl);
      },
      inject: [ShortUrlService,UrlService],
    },
    ShortUrlService,
    UrlService
  ],
})
export class UrlModule {}