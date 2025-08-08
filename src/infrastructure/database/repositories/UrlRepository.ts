import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './BaseRepository';
import { InjectDataSource } from '@nestjs/typeorm';
import { IUrlRepository } from 'src/application/ports/IUrlRepository';
import { Url } from 'src/domain/models/Url';
import { UrlEntity } from '../mapper/Url.entity';
import { ShortenedUrl } from 'src/domain/models/ShortenedUrl';
import { ShortenedUrlEntity } from '../mapper/ShortenedUrl.entity';


@Injectable()
export class UrlRepository
  extends BaseRepository<Url>
  implements IUrlRepository
{
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    super(dataSource, UrlEntity);
  }

  public async findUrlByValue(value: string): Promise<Url | undefined> {
    return this.dataSource.getRepository(UrlEntity).findOne({ where: { value } });
  }

  public async saveShortenedUrl(shortenedUrl: ShortenedUrl): Promise<ShortenedUrl> {
    const repository = this.dataSource.getRepository(ShortenedUrlEntity);
    return await repository.save(shortenedUrl);
  }

  public async findUrlBySlug(slug: string): Promise<Url | undefined> {
    const shortenedUrl = await this.dataSource.getRepository(ShortenedUrlEntity).findOne({
        where: { value: slug },
        relations: ['url'],
    });

    return shortenedUrl ? shortenedUrl.url : undefined;
  }
}