import { TestBed } from '@angular/core/testing';

import { FirstErrorHandlerInterceptor } from './first-error-handler.interceptor';

describe('FirstErrorHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FirstErrorHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FirstErrorHandlerInterceptor = TestBed.inject(FirstErrorHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
