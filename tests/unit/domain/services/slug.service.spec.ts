import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrl } from 'src/domain/models/ShortUrl';
import { SlugService } from 'src/domain/services/slug.service';


describe('SlugService', () => {
  let service: SlugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlugService],
    }).compile();

    service = module.get<SlugService>(SlugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateSlug', () => {
    it('should generate a slug and add it to the url object', () => {
      const url = new ShortUrl('http://example.com');

      service.generateSlug(url);

      expect(url.slug).toBeDefined();
      expect(typeof url.slug).toBe('string');
      expect(url.slug.length).toBe(6);
    });
  });
});
