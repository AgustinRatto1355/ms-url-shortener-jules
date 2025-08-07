import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.originalUrl;
    const headers = request.headers;
    const body = request.body;

    console.log(`[${new Date().toISOString()}] Incoming Request`);
    console.log(`> ${method} ${url}`);
    console.log(`> Headers:`, headers);
    console.log(`> Body:`, body ? body : 'Without body');

    return next.handle().pipe(
      tap((responseData) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const elapsedTime = Date.now() - now;

        console.log(`[${new Date().toISOString()}] Outgoing Response`);
        console.log(`> Status: ${statusCode}`);
        console.log(`> Time: ${elapsedTime}ms`);
        console.log(`> Response:`, responseData);
      }),
    );
  }
}
