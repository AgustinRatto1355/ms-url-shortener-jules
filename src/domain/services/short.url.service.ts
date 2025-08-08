import { Inject, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { ShortenedUrl } from '../models/ShortenedUrl';
import { Url } from '../models/Url';
import { TOKENS } from 'src/application/tokens';
import { IShortUrlRepository } from 'src/application/ports/IShortUrlRepository';

@Injectable()
export class ShortUrlService {
    
    constructor(
        @Inject(TOKENS.ShortUrlRepository)
        private readonly shortUrlRepository: IShortUrlRepository,
    ) {}

    async saveShortenedUrl(url: Url): Promise<ShortenedUrl> {
        const shortenedValue = nanoid(6);
        const shortenedUrl = new ShortenedUrl(shortenedValue, url);
        return this.shortUrlRepository.save(shortenedUrl);
    }
}
