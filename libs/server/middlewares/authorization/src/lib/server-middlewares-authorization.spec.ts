import { serverMiddlewaresAuthorization } from './server-middlewares-authorization';

describe('serverMiddlewaresAuthorization', () => {
  it('should work', () => {
    expect(serverMiddlewaresAuthorization()).toEqual(
      'server-middlewares-authorization'
    );
  });
});
