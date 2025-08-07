import { IsNotEmpty, IsString } from 'class-validator';
import { ShortUrl } from 'src/domain/models/ShortUrl';

export class UrlVM {
  @IsString()
  @IsNotEmpty()
  url: string;

  static fromViewModel(vm: UrlVM): ShortUrl {
    return new ShortUrl(vm.url);
  }
}