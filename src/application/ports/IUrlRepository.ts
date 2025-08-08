import { Injectable } from '@nestjs/common';



import { IRepository } from './IRepository';
import { Url } from "src/domain/models/Url";
import { ShortenedUrl } from "src/domain/models/ShortenedUrl";

@Injectable()
export abstract class IUrlRepository extends IRepository<Url> {
    abstract findUrlByValue(value: string): Promise<Url | undefined>;
    abstract saveShortenedUrl(shortenedUrl: ShortenedUrl): Promise<ShortenedUrl>;
    abstract findUrlBySlug(slug: string): Promise<Url | undefined>;
}