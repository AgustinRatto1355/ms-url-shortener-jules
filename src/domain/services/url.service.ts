import { Inject, Injectable } from '@nestjs/common';
import { ShortUrl } from '../models/ShortUrl';
import { IUrlRepository } from 'src/application/ports/IUrlRepository';
import { TOKENS } from 'src/application/tokens';

@Injectable()
export class UrlService {
  constructor(
    @Inject(TOKENS.UrlRepository)
    private readonly urlRepository: IUrlRepository
  ) {}

  async saveUrl(url: ShortUrl): Promise<ShortUrl>{
    return this.urlRepository.save(url);
  }

  async getOriginalUrlBySlug(slug: string): Promise<ShortUrl|undefined>{
    return this.urlRepository.findOne({where: {slug}});
  }

  validateUrl(url: ShortUrl): void{

  }
}
