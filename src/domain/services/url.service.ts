import { Inject, Injectable } from '@nestjs/common';
import { Url } from '../models/Url';
import { IUrlRepository } from 'src/application/ports/IUrlRepository';
import { TOKENS } from 'src/application/tokens';
import { InvalidUrlException } from '../exceptions/InvalidUrlException';

@Injectable()
export class UrlService {
    
    constructor(
        @Inject(TOKENS.UrlRepository)
        private readonly urlRepository: IUrlRepository
    ) {}

    async getUrlByValue(originalUrl: string): Promise<Url>{
        let url = await this.urlRepository.findUrlByValue(originalUrl);

        if (!url) {
            url = await this.urlRepository.save(new Url(originalUrl));
        }

        return url;
    }

    async getUrlBySlug(slug: string): Promise<Url|undefined>{
        return this.urlRepository.findUrlBySlug(slug);
    }

    validateUrl(url: string): void{
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,})(\.[a-z]{2,})?(:[0-9]{1,5})?(\/[\w.-]*)*(\?[^\s#]*)?(#.*)?$/i;
        if(!urlRegex.test(url)){
            throw new InvalidUrlException();
        }
    }
}
