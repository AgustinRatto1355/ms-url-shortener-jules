
export class ShortUrl {
    public id?: number;
    public slug?: string;
    public shortenedUrl?: string;
    constructor(
        public readonly originalUrl: string,
    ) {}

    public addDomain(): void{
        this.shortenedUrl = `http://localhost:3000/${this.slug}`;
    }
}