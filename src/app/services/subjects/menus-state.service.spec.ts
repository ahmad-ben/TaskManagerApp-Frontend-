import { TestBed } from '@angular/core/testing';

import { MenusStateService } from './menus-state.service';

describe('MenusStateService', () => {
  let service: MenusStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenusStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
