import { EntitySchema } from 'typeorm';
import { ShortUrl } from 'src/domain/models/ShortUrl';

export const ShortUrlEntity = new EntitySchema<ShortUrl>({
  name: 'ShortUrl',
  tableName: 'short_urls',
  target: ShortUrl,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    originalUrl: {
      type: String,
    },
    slug: {
      type: String
    }
  },
});