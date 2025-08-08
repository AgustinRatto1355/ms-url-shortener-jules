import { Test, TestingModule } from '@nestjs/testing';
import { SlugService } from 'src/domain/services/slug.service';
import { UrlService } from 'src/domain/services/url.service';
import { ShortUrl } from 'src/domain/models/ShortUrl';
import { UrlNotFoundException } from 'src/domain/exceptions/NotFoundUrlException';
import { UrlUseCases } from 'src/application/use-cases/UrlUseCases';

describe('UrlUseCases', () => {
  let useCases: UrlUseCases;
  let slugService: SlugService;
  let urlService: UrlService;

  const mockSlugService = {
    generateSlug: jest.fn(),
  };

  const mockUrlService = {
    validateUrl: jest.fn(),
    saveUrl: jest.fn(),
    getOriginalUrlBySlug: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlUseCases,
        { provide: SlugService, useValue: mockSlugService },
        { provide: UrlService, useValue: mockUrlService },
      ],
    }).compile();

    useCases = module.get<UrlUseCases>(UrlUseCases);
    slugService = module.get<SlugService>(SlugService);
    urlService = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(useCases).toBeDefined();
  });

  describe('shortenUrl', () => {
    it('should orchestrate url shortening and return the shortened url', async () => {
      const url = new ShortUrl('http://example.com');
      
      const savedUrl = new ShortUrl('http://example.com');
      savedUrl.slug = 'abcdef';

      mockUrlService.saveUrl.mockResolvedValue(savedUrl);

      const result = await useCases.shortenUrl(url);

      expect(urlService.validateUrl).toHaveBeenCalledWith(url);
      expect(slugService.generateSlug).toHaveBeenCalledWith(url);
      expect(urlService.saveUrl).toHaveBeenCalledWith(url);
      expect(result.shortenedUrl).toBeDefined();
    });
  });

  describe('getOriginalUrlBySlug', () => {
    it('should return the original url', async () => {
      const slug = 'abcdef';
      const url = new ShortUrl('http://example.com');
      url.slug = slug;

      mockUrlService.getOriginalUrlBySlug.mockResolvedValue(url);

      const result = await useCases.getOriginalUrlBySlug(slug);

      expect(urlService.getOriginalUrlBySlug).toHaveBeenCalledWith(slug);
      expect(result).toEqual(url);
    });

    it('should throw UrlNotFoundException if url is not found', async () => {
      const slug = 'abcdef';
      mockUrlService.getOriginalUrlBySlug.mockResolvedValue(undefined);

      await expect(useCases.getOriginalUrlBySlug(slug)).rejects.toThrow(UrlNotFoundException);
    });
  });
});
