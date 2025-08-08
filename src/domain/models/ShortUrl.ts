
export class ShortUrl {
    public id?: number;
    public slug?: string;
    public shortenedUrl?: string;
    constructor(
        public readonly originalUrl: string,
    ) {}

    public addDomain(baseUrl: string): void{
        this.shortenedUrl = `${baseUrl}/${this.slug}`;
    }
}