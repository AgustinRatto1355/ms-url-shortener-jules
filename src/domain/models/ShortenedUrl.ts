import { Url } from "./Url";

export class ShortenedUrl {
  constructor(
    public readonly id: number,
    public readonly value: string,
    public readonly url: Url,
  ) {}
}
