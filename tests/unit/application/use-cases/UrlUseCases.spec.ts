import { Test, TestingModule } from '@nestjs/testing';
import { UrlUseCases } from 'src/application/use-cases/UrlUseCases';
import { IUrlRepository } from 'src/application/ports/IUrlRepository';
import { Url } from 'src/domain/models/Url';
import { ShortenedUrl } from 'src/domain/models/ShortenedUrl';
import { UrlNotFoundException } from 'src/domain/exceptions/NotFoundUrlException';
import { TOKENS } from 'src/application/tokens';
import { IShortUrlRepository } from 'src/application/ports/IShortUrlRepository';

describe('UrlUseCases', () => {
  let useCases: UrlUseCases;
  let urlRepository: IUrlRepository;
  let shortUrlRepository: IShortUrlRepository;

  const mockUrlRepository = {
    findUrlByValue: jest.fn(),
    save: jest.fn(),
    saveShortenedUrl: jest.fn(),
    findUrlBySlug: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlUseCases,
        { provide: TOKENS.UrlRepository, useValue: mockUrlRepository },
      ],
    }).compile();

    useCases = module.get<UrlUseCases>(UrlUseCases);
    urlRepository = module.get<IUrlRepository>(TOKENS.UrlRepository);
    shortUrlRepository = module.get<IShortUrlRepository>(TOKENS.ShortUrlRepository);
  });

  it('should be defined', () => {
    expect(useCases).toBeDefined();
  });

  describe('shortenUrl', () => {
    it('should create a new url and shortened url if url does not exist', async () => {
      const originalUrl = 'http://example.com';
      const url = new Url( originalUrl);
      const shortenedUrl = new ShortenedUrl('abcdef', url);

      mockUrlRepository.findUrlByValue.mockResolvedValue(undefined);
      mockUrlRepository.save.mockResolvedValue(url);
      mockUrlRepository.saveShortenedUrl.mockResolvedValue(shortenedUrl);

      const result = await useCases.shortenUrl(originalUrl);

      expect(urlRepository.findUrlByValue).toHaveBeenCalledWith(originalUrl);
      expect(urlRepository.save).toHaveBeenCalledWith(new Url(originalUrl));
      expect(shortUrlRepository.saveShortenedUrl).toHaveBeenCalled();
      expect(result).toEqual(shortenedUrl);
    });

    it('should use existing url and create a new shortened url if url exists', async () => {
        const originalUrl = 'http://example.com';
        const url = new Url(originalUrl);
        const shortenedUrl = new ShortenedUrl('abcdef', url);

        mockUrlRepository.findUrlByValue.mockResolvedValue(url);
        mockUrlRepository.saveShortenedUrl.mockResolvedValue(shortenedUrl);

        const result = await useCases.shortenUrl(originalUrl);

        expect(urlRepository.findUrlByValue).toHaveBeenCalledWith(originalUrl);
        expect(urlRepository.save).not.toHaveBeenCalled();
        expect(shortUrlRepository.saveShortenedUrl).toHaveBeenCalled();
        expect(result).toEqual(shortenedUrl);
      });
  });

  describe('getOriginalUrl', () => {
    it('should return the original url', async () => {
      const slug = 'abcdef';
      const url = new Url('http://example.com');

      mockUrlRepository.findUrlBySlug.mockResolvedValue(url);

      const result = await useCases.getOriginalUrl(slug);

      expect(urlRepository.findUrlBySlug).toHaveBeenCalledWith(slug);
      expect(result).toEqual(url);
    });

    it('should throw UrlNotFoundException if url is not found', async () => {
      const slug = 'abcdef';
      mockUrlRepository.findUrlBySlug.mockResolvedValue(undefined);

      await expect(useCases.getOriginalUrl(slug)).rejects.toThrow(UrlNotFoundException);
    });
  });
});
