import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityInputComponent } from './identity-input.component';

describe('IdentityInputComponent', () => {
  let component: IdentityInputComponent;
  let fixture: ComponentFixture<IdentityInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
