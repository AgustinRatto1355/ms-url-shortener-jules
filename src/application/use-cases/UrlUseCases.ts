import { Injectable } from '@nestjs/common';
import { UrlNotFoundException } from 'src/domain/exceptions/NotFoundUrlException';
import { Url } from 'src/domain/models/Url';
import { ShortenedUrl } from 'src/domain/models/ShortenedUrl';
import { ShortUrlService } from 'src/domain/services/short.url.service';
import { UrlService } from 'src/domain/services/url.service';

@Injectable()
export class UrlUseCases {
    constructor(
        private readonly shortUrlService: ShortUrlService,
        private readonly urlService: UrlService,
        private readonly baseUrl: string
    ) {}

    async shortenUrl(originalUrl: string): Promise<ShortenedUrl> {
        this.urlService.validateUrl(originalUrl);
        const url = await this.urlService.getUrlByValue(originalUrl);

        const shortenedUrl = await this.shortUrlService.saveShortenedUrl(url);
        shortenedUrl.addDomain(this.baseUrl);
        return shortenedUrl;
    }

    async getOriginalUrl(slug: string): Promise<Url> {
        const url = await this.urlService.getUrlBySlug(slug);
        if(!url){
            throw new UrlNotFoundException();
        }
        return url;
    }
}