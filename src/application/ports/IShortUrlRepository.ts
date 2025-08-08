import { Injectable } from '@nestjs/common';



import { IRepository } from './IRepository';
import { Url } from "src/domain/models/Url";
import { ShortenedUrl } from "src/domain/models/ShortenedUrl";

@Injectable()
export abstract class IShortUrlRepository extends IRepository<Url> {
    abstract saveShortenedUrl(shortenedUrl: ShortenedUrl): Promise<ShortenedUrl>;
}