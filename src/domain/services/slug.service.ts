import { Injectable } from '@nestjs/common';
import { ShortUrl } from '../models/ShortUrl';
import { nanoid } from 'nanoid';

@Injectable()
export class SlugService {
  generateSlug(url: ShortUrl): void {
    const slug = nanoid(6);
    url.slug = slug;
  }
}
