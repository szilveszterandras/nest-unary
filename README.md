## Problem statement

Unary requests aren't cleaned up in nest's GRPC client if the subscriber on the resulting Observable
unsubscribes. To demonstrate this, i wrote a simple echo grpc service which emits a unary response
after 10 seconds.

The client is configured to timeout after 5 seconds, which cuts the subscription to the underlying
Observable, which in theory should close the grpc connection. In reality it doesn't, which is
evident from the server/client logs.

## Running the app

```bash
$ yarn start server
$ yarn start client
```
