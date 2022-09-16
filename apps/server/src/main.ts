import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { ServerModule } from './server.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ServerModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'echo',
        protoPath: join(__dirname, '../../../proto/echo.proto'),
        url: 'localhost:50051',
      },
    },
  );

  await app.listen();
}
bootstrap();
