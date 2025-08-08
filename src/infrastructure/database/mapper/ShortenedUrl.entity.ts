import { EntitySchema } from 'typeorm';
import { ShortenedUrl } from '../../../domain/models/ShortenedUrl';

export const ShortenedUrlEntity = new EntitySchema<ShortenedUrl>({
  name: 'ShortenedUrl',
  tableName: 'shortened_urls',
  target: ShortenedUrl,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    value: {
      type: String,
    },
    url: {
        type: Number,
      },
  },
  relations: {
    url: {
      type: 'many-to-one',
      target: 'Url',
      joinColumn: {
        name: 'url_id',
      },
    },
  },
});
