import { Url } from "./Url";

export class ShortenedUrl {
  public id?: number
  public shortenedUrl?: string;
    constructor(
      public readonly value: string,
      public readonly url: Url,
  ) {}

  public addDomain(baseUrl: string): void{
      this.shortenedUrl = `${baseUrl}/${this.value}`;
  }
}