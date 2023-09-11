import { TestBed } from '@angular/core/testing';

import { SecondErrorHandlerInterceptor } from './second-error-handler.interceptor';

describe('SecondErrorHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SecondErrorHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SecondErrorHandlerInterceptor = TestBed.inject(SecondErrorHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
