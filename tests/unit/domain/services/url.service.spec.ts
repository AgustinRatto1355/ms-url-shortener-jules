import { Test, TestingModule } from '@nestjs/testing';
import { IUrlRepository } from 'src/application/ports/IUrlRepository';
import { TOKENS } from 'src/application/tokens';
import { ShortUrl } from 'src/domain/models/ShortUrl';
import { InvalidUrlException } from 'src/domain/exceptions/InvalidUrlException';
import { UrlService } from 'src/domain/services/url.service';

describe('UrlService', () => {
  let service: UrlService;
  let repository: IUrlRepository;

  const mockUrlRepository = {
    save: jest.fn(),
    findOriginalUrlBySlug: jest.fn(),
    findSlugByOriginalUrl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: TOKENS.UrlRepository,
          useValue: mockUrlRepository,
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
    repository = module.get<IUrlRepository>(TOKENS.UrlRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveUrl', () => {
    it('should call repository.save with the correct url', async () => {
      const url = new ShortUrl('http://example.com');
      mockUrlRepository.save.mockResolvedValue(url);

      const result = await service.saveUrl(url);

      expect(repository.save).toHaveBeenCalledWith(url);
      expect(result).toEqual(url);
    });
  });

  describe('getOriginalUrlBySlug', () => {
    it('should call repository.findOriginalUrlBySlug and return the url', async () => {
      const slug = 'abcdef';
      const url = new ShortUrl('http://example.com');
      url.slug = slug;
      mockUrlRepository.findOriginalUrlBySlug.mockResolvedValue(url);

      const result = await service.getOriginalUrlBySlug(slug);

      expect(repository.findOriginalUrlBySlug).toHaveBeenCalledWith(slug);
      expect(result).toEqual(url);
    });

    it('should return undefined if repository does not find a url', async () => {
        const slug = 'abcdef';
        mockUrlRepository.findOriginalUrlBySlug.mockResolvedValue(undefined);
  
        const result = await service.getOriginalUrlBySlug(slug);
  
        expect(repository.findOriginalUrlBySlug).toHaveBeenCalledWith(slug);
        expect(result).toBeUndefined();
      });
  });

  describe('validateUrl', () => {
    it('should not throw an exception for a valid URL', () => {
      const url = new ShortUrl('http://example.com');
      expect(() => service.validateUrl(url)).not.toThrow();
    });

    it('should throw InvalidUrlException for an invalid URL', () => {
      const url = new ShortUrl('not a valid url');
      expect(() => service.validateUrl(url)).toThrow(InvalidUrlException);
    });

    it('should not throw an exception for a valid URL with https', () => {
        const url = new ShortUrl('https://example.com');
        expect(() => service.validateUrl(url)).not.toThrow();
    });

    it('should not throw an exception for a valid URL with www', () => {
        const url = new ShortUrl('http://www.example.com');
        expect(() => service.validateUrl(url)).not.toThrow();
    });
  });
});
