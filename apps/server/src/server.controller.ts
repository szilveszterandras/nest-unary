import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { EchoRequest, EchoResponse } from 'interfaces/echo';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';

@Controller()
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @GrpcMethod('EchoService', 'GetEcho')
  getEcho(data: EchoRequest): Observable<EchoResponse> {
    return this.serverService.getEcho(data.name);
  }
}
