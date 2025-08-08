import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { IUrlRepository } from '../../src/application/ports/IUrlRepository';
import { TOKENS } from '../../src/application/tokens';
import { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { ShortUrlEntity } from '../../src/infrastructure/database/mapper/url.entity';
import { HttpExceptionFilter } from '../../src/infrastructure/rest/http-exception.filter';

describe('UrlController (e2e)', () => {
  let app: INestApplication<App>;
  let urlRepository: IUrlRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();

    urlRepository = moduleFixture.get<IUrlRepository>(TOKENS.UrlRepository);
    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterEach(async () => {
    if (dataSource.isInitialized) {
      const repository = dataSource.getRepository(ShortUrlEntity);
      await repository.clear();
    }
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    await app.close();
  });

  describe('/urls/shorten (POST)', () => {
    it('should shorten a valid URL and return the shortened URL', async () => {
      const originalUrl = 'http://example.com';
      return request(app.getHttpServer())
        .post('/urls/shorten')
        .send({ url: originalUrl })
        .expect(201)
        .then((res) => {
          expect(res.body).toHaveProperty('shortenedUrl');
          expect(res.body.shortenedUrl).toContain('http://localhost:3000/');
        });
    });

    it('should return 400 for an invalid URL', () => {
      const originalUrl = 'invalid-url';
      return request(app.getHttpServer())
        .post('/urls/shorten')
        .send({ url: originalUrl })
        .expect(400);
    });
  });

  describe('/urls/:slug (GET)', () => {
    it('should redirect to the original URL for a valid slug', async () => {
      const originalUrl = 'http://google.com';
      
      const postResponse = await request(app.getHttpServer())
        .post('/urls/shorten')
        .send({ url: originalUrl });

      const shortenedUrl = postResponse.body.shortenedUrl;
      const slug = shortenedUrl.split('/').pop();

      return request(app.getHttpServer())
        .get(`/urls/${slug}`)
        .expect(302)
        .expect('Location', originalUrl);
    });

    it('should return 404 for a non-existent slug', () => {
      return request(app.getHttpServer())
        .get('/urls/nonexistentslug')
        .expect(404);
    });
  });
});
