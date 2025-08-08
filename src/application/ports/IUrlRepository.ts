import { Injectable } from '@nestjs/common';



import { IRepository } from './IRepository';
import { ShortUrl } from 'src/domain/models/ShortUrl';

@Injectable()
export abstract class IUrlRepository extends IRepository<ShortUrl> {
    abstract findOriginalUrlBySlug(originalUrl: string): Promise<ShortUrl|undefined>;
}