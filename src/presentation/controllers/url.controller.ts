import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UrlUseCases } from 'src/application/use-cases/UrlUseCases';
import { UrlVM } from '../view-models/UrlVM';
import { ShortenedUrlVM } from '../view-models/ShortenedUrlVM';
import { OriginalUrlVM } from '../view-models/OriginalUrlVM';

@Controller('urls')
export class UrlController {
  constructor(
    private readonly urlUseCases: UrlUseCases
  ) {}

  @Post('shorten')
  async shortenUrl(
    @Body() urlVM: UrlVM
  ): Promise<ShortenedUrlVM> {
    const url = await this.urlUseCases.shortenUrl(UrlVM.fromViewModel(urlVM));
    return ShortenedUrlVM.toViewModel(url);
  }

  @Get(':slug')
  async getOriginalUrl(
    @Query('slug') slug: string,
  ): Promise<OriginalUrlVM> {
    console.log(slug);
    const url = await this.urlUseCases.getOriginalUrlBySlug(slug);
    return OriginalUrlVM.toViewModel(url);
  }
}
