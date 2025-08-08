import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './BaseRepository';
import { InjectDataSource } from '@nestjs/typeorm';
import { IUrlRepository } from 'src/application/ports/IUrlRepository';
import { ShortUrl } from 'src/domain/models/ShortUrl';
import { ShortUrlEntity } from '../mapper/url.entity';


@Injectable()
export class UrlRepository
  extends BaseRepository<ShortUrl>
  implements IUrlRepository
{
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    super(dataSource, ShortUrlEntity);
  }

  public async findOriginalUrlBySlug(slug: string): Promise<ShortUrl|undefined>{
    return this.dataSource.getRepository(ShortUrlEntity).createQueryBuilder().select('su')
      .from(ShortUrlEntity, 'su')
      .where('su.slug = :slug', { slug }).getOne();
  }
}