import { Observable } from 'rxjs';

export interface EchoRequest {
  name: string;
}

export interface EchoResponse {
  message: string;
}

export interface EchoService {
  getEcho: (request: EchoRequest) => Observable<EchoResponse>;
}
