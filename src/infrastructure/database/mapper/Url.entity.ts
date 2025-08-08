import { EntitySchema } from 'typeorm';
import { Url } from '../../../domain/models/Url';

export const UrlEntity = new EntitySchema<Url>({
  name: 'Url',
  tableName: 'urls',
  target: Url,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    value: {
      type: String,
    },
  },
});
