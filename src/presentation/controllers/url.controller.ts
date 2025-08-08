import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlUseCases } from 'src/application/use-cases/UrlUseCases';
import { ShortenedUrlVM } from '../view-models/ShortenedUrlVM';
import { Response } from 'express';
import { OriginalUrlVM } from '../view-models/OriginalUrlVM';
import { Url } from 'src/domain/models/Url';

@Controller('')
export class UrlController {
  constructor(
    private readonly urlUseCases: UrlUseCases
  ) {}

  @Post('urls/shorten')
  async shortenUrl(
    @Body() originalUrlVM: OriginalUrlVM
  ): Promise<ShortenedUrlVM> {
    const shortenedUrl = await this.urlUseCases.shortenUrl(originalUrlVM.url);
    return ShortenedUrlVM.toViewModel(shortenedUrl);
  }

  @Get(':shortenedValue')
  async redirectToOriginalUrl(
    @Param('shortenedValue') shortenedValue: string,
    @Res() res: Response
  ): Promise<void> {
    let url: Url;
    try {
      url = await this.urlUseCases.getOriginalUrl(shortenedValue);
      res.redirect(url.value);
    } catch (error) {
      res.redirect('http://localhost:4000/404');
    }
  }
}
