import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './BaseRepository';
import { InjectDataSource } from '@nestjs/typeorm';
import { IUrlRepository } from 'src/application/ports/IUrlRepository';
import { Url } from 'src/domain/models/Url';
import { UrlEntity } from '../mapper/Url.entity';
import { ShortenedUrlEntity } from '../mapper/ShortenedUrl.entity';
import { ShortenedUrl } from 'src/domain/models/ShortenedUrl';
import { IShortUrlRepository } from 'src/application/ports/IShortUrlRepository';


@Injectable()
export class ShortUrlRepository
  extends BaseRepository<ShortenedUrl>
  implements IShortUrlRepository
{
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
    ) {
        super(dataSource, ShortenedUrlEntity);
    }

    public async saveShortenedUrl(shortenedUrl: ShortenedUrl): Promise<ShortenedUrl> {
        const repository = this.dataSource.getRepository(ShortenedUrlEntity);
        return await repository.save(shortenedUrl);
    }
}