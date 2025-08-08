import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlUseCases } from 'src/application/use-cases/UrlUseCases';
import { UrlVM } from '../view-models/UrlVM';
import { ShortenedUrlVM } from '../view-models/ShortenedUrlVM';
import { Response } from 'express';
import { ShortUrl } from 'src/domain/models/ShortUrl';

@Controller('')
export class UrlController {
  constructor(
    private readonly urlUseCases: UrlUseCases
  ) {}

  @Post('urls/shorten')
  async shortenUrl(
    @Body() urlVM: UrlVM
  ): Promise<ShortenedUrlVM> {
    const url = await this.urlUseCases.shortenUrl(UrlVM.fromViewModel(urlVM));
    return ShortenedUrlVM.toViewModel(url);
  }

  @Get(':slug')
  async redirectToOriginalUrl(
    @Param('slug') slug: string,
    @Res() res: Response
  ): Promise<void> {
    let url: ShortUrl;
    try {
      url = await this.urlUseCases.getOriginalUrlBySlug(slug);
      res.redirect(url.originalUrl);
    } catch (error) {
      res.redirect('http://localhost:4000/404');
    }
  }
}
