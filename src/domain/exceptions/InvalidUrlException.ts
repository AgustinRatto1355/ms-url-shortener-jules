export class InvalidUrlException extends Error {
  constructor() {
    super(`Url provided was invalid`);
    this.name = 'InvalidUrlException';
  }
}
