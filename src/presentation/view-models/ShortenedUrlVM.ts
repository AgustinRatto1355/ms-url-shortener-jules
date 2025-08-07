import { Expose, plainToClass } from 'class-transformer';
import { ShortUrl } from 'src/domain/models/ShortUrl';

export class ShortenedUrlVM {
  @Expose()
  shortenedUrl: string;

  static toViewModel(url: ShortUrl): ShortenedUrlVM {
    return {
      shortenedUrl: url.shortenedUrl
    }
  }
}