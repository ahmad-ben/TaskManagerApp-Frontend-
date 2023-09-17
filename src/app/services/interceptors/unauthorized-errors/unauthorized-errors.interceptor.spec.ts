import { TestBed } from '@angular/core/testing';

import { UnauthorizedErrorsInterceptor } from './unauthorized-errors.interceptor';

describe('UnauthorizedErrorsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnauthorizedErrorsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UnauthorizedErrorsInterceptor = TestBed.inject(UnauthorizedErrorsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
