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
        let savedShortenedUrl;

        try {
            savedShortenedUrl = await this.shortUrlRepository.save(shortenedUrl);
        } catch (error) {
            //In case the generated slug already exists — which is very unlikely, since 6 characters give us around 69 billion possible URLs.
            const shortenedValue = nanoid(6);
            const shortenedUrl = new ShortenedUrl(shortenedValue, url);
            savedShortenedUrl = await this.shortUrlRepository.save(shortenedUrl);
        }
        return savedShortenedUrl;
    }
}
