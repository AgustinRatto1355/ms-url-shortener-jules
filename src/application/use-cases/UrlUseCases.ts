import { Injectable } from '@nestjs/common';
import { UrlNotFoundException } from 'src/domain/exceptions/NotFoundUrlException';
import { ShortUrl } from 'src/domain/models/ShortUrl';
import { SlugService } from 'src/domain/services/slug.service';
import { UrlService } from 'src/domain/services/url.service';

@Injectable()
export class UrlUseCases {
    constructor(
        private readonly slugService: SlugService,
        private readonly urlService: UrlService
    ) {}

    async shortenUrl(url: ShortUrl): Promise<ShortUrl> {
        this.urlService.validateUrl(url);
        this.slugService.generateSlug(url);
        const savedUrl = await this.urlService.saveUrl(url);
        savedUrl.addDomain();
        return savedUrl;
    }

    async getOriginalUrlBySlug(slug: string): Promise<ShortUrl> {
        const url = await this.urlService.getOriginalUrlBySlug(slug);
        if(!url){
            throw new UrlNotFoundException();
        }
        return url;
    }
}