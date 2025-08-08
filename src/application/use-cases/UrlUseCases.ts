import { Inject, Injectable } from '@nestjs/common';
import { UrlNotFoundException } from 'src/domain/exceptions/NotFoundUrlException';
import { Url } from 'src/domain/models/Url';
import { IUrlRepository } from '../ports/IUrlRepository';
import { ShortenedUrl } from 'src/domain/models/ShortenedUrl';
import { TOKENS } from '../tokens';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlUseCases {
    constructor(
        @Inject(TOKENS.UrlRepository)
        private readonly urlRepository: IUrlRepository,
    ) {}

    async shortenUrl(originalUrl: string): Promise<ShortenedUrl> {
        let url = await this.urlRepository.findUrlByValue(originalUrl);

        if (!url) {
            url = await this.urlRepository.save(new Url(0, originalUrl));
        }

        const shortenedValue = nanoid(6);
        const shortenedUrl = new ShortenedUrl(0, shortenedValue, url);

        return this.urlRepository.saveShortenedUrl(shortenedUrl);
    }

    async getOriginalUrl(slug: string): Promise<Url> {
        const url = await this.urlRepository.findUrlBySlug(slug);
        if(!url){
            throw new UrlNotFoundException();
        }
        return url;
    }
}