import { Expose, plainToClass } from 'class-transformer';
import { ShortUrl } from 'src/domain/models/ShortUrl';

export class OriginalUrlVM {
  @Expose()
  originalUrl: string;

  static toViewModel(url: ShortUrl): OriginalUrlVM {
    return {
      originalUrl: url.originalUrl
    }
  }
}