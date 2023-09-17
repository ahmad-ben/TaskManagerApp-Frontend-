import { TestBed } from '@angular/core/testing';

import { CheckConnectionInterceptor } from './check-connection.interceptor';

describe('CheckConnectionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CheckConnectionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CheckConnectionInterceptor = TestBed.inject(CheckConnectionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
