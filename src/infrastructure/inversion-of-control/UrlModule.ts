import { Module } from '@nestjs/common';
import { TOKENS } from 'src/application/tokens';
import { UrlRepository } from '../database/repositories/UrlRepository';
import { UrlUseCases } from 'src/application/use-cases/UrlUseCases';
import { UrlController } from 'src/presentation/controllers/url.controller';
import { IUrlRepository } from 'src/application/ports/IUrlRepository';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [
    { provide: TOKENS.UrlRepository, useClass: UrlRepository },
    {
      provide: UrlUseCases,
      useFactory: (urlRepository: IUrlRepository) => {
        return new UrlUseCases(urlRepository);
      },
      inject: [TOKENS.UrlRepository],
    },
  ],
})
export class UrlModule {}