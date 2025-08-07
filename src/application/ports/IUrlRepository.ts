import { Injectable } from '@nestjs/common';



import { IRepository } from './IRepository';
import { ShortUrl } from 'src/domain/models/ShortUrl';

@Injectable()
export abstract class IUrlRepository extends IRepository<ShortUrl> {
    abstract findUrlByOriginalUrl(originalUrl: string): Promise<ShortUrl|undefined>;
}