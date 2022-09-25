import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneFieldComponent } from './one-field.component';

describe('OneFieldComponent', () => {
  let component: OneFieldComponent;
  let fixture: ComponentFixture<OneFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
