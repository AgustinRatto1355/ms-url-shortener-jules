import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InvalidUrlException } from 'src/domain/exceptions/InvalidUrlException';
import { UrlNotFoundException } from 'src/domain/exceptions/NotFoundUrlException';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const message =
        (exceptionResponse as any)?.message || exception.message;

      return response.status(statusCode).json({
        statusCode,
        error: message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    //if it's necessary to add more domain exceptions, it would be useful to have like a mapper
    //So instead of doing this, the mapper would now which http code represents that exception
    if (exception instanceof UrlNotFoundException) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        error: exception.message,
        timestamp: new Date().toISOString(),
      });
    }
    if (exception instanceof InvalidUrlException) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        error: exception.message,
        timestamp: new Date().toISOString(),
      });
    }

    console.error('Unhandled exception:', exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}