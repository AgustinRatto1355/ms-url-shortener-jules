export class UrlNotFoundException extends Error {
  constructor() {
    super(`URL was not found.`);
    this.name = 'UrlNotFoundException';
  }
}
