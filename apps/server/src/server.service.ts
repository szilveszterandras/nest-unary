import { Injectable } from '@nestjs/common';
import { EchoResponse } from 'interfaces/echo';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ServerService {
  getEcho(name: string): Observable<EchoResponse> {
    // simulate long-running unary call
    return timer(10000).pipe(
      map(() => {
        console.log(`[Echo server] Emitting echo response: Hello ${name}`);

        return { message: `Hello ${name}` };
      }),
    );
  }
}
