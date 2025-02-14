import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLayoutComponent } from './add-edit-layout.component';

describe('AddEditLayoutComponent', () => {
  let component: AddEditLayoutComponent;
  let fixture: ComponentFixture<AddEditLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditLayoutComponent]
    });
    fixture = TestBed.createComponent(AddEditLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
