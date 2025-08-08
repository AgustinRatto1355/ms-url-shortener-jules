import { Inject, Injectable } from '@nestjs/common';
import { ShortUrl } from '../models/ShortUrl';
import { IUrlRepository } from 'src/application/ports/IUrlRepository';
import { TOKENS } from 'src/application/tokens';
import { InvalidUrlException } from '../exceptions/InvalidUrlException';

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
    const res = await this.urlRepository.findOriginalUrlBySlug(slug);

    return res;
  }

  validateUrl(url: ShortUrl): void{
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,})(\.[a-z]{2,})?(:[0-9]{1,5})?(\/[\w.-]*)*(\?[^\s#]*)?(#.*)?$/i;
    if(!urlRegex.test(url.originalUrl)){
      throw new InvalidUrlException();
    }
  }
}
