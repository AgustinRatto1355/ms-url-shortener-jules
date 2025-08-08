import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './infrastructure/rest/http-exception.filter';
import { LoggerInterceptor } from './infrastructure/rest/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@rabbitmq:5672'],
      queue: 'main_queue',
      queueOptions: { durable: false },
    },
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: false,
  });
  app.useGlobalInterceptors(new LoggerInterceptor());
  
  await app.startAllMicroservices();
  await app.listen(3000, '0.0.0.0');
  console.log('🚀 App running with HTTP + RabbitMQ');
}
bootstrap();