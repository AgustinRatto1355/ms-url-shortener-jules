import { Expose } from 'class-transformer';

export class OriginalUrlVM {
  @Expose()
  url: string;
}