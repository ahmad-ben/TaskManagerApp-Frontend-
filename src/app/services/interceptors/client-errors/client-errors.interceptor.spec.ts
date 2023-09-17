import { TestBed } from '@angular/core/testing';

import { ClientErrorsInterceptor } from './client-errors.interceptor';

describe('ClientErrorsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ClientErrorsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ClientErrorsInterceptor = TestBed.inject(ClientErrorsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
