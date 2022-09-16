import {
  Inject,
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { EchoService } from 'interfaces/echo';
import { join } from 'path';
import { timeout } from 'rxjs/operators';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ECHO_CLIENT',
        transport: Transport.GRPC,
        options: {
          package: 'echo',
          protoPath: join(__dirname, '../../../proto/echo.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
})
export class ClientModule implements OnModuleInit, OnApplicationBootstrap {
  private echoService: EchoService;

  constructor(@Inject('ECHO_CLIENT') private client: ClientGrpc) {}

  onModuleInit() {
    this.echoService = this.client.getService<EchoService>('EchoService');
  }

  onApplicationBootstrap() {
    setInterval(() => {
      this.echoService
        .getEcho({ name: 'Joe' })
        .pipe(timeout(5000))
        .subscribe({
          error: error => console.log('[Echo client] Server error: ', error),
          next: message => console.log('[Echo client] Response: ', message),
        });
    }, 1000);
  }
}
