import { Expose } from 'class-transformer';
import { ShortenedUrl } from 'src/domain/models/ShortenedUrl';

export class ShortenedUrlVM {
  @Expose()
  shortenedUrl: string;

  static toViewModel(shortenedUrl: ShortenedUrl): ShortenedUrlVM {
    return {
      shortenedUrl: shortenedUrl.value
    }
  }
}