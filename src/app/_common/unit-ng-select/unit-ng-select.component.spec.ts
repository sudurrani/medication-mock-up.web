import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitNgSelectComponent } from './unit-ng-select.component';

describe('UnitNgSelectComponent', () => {
  let component: UnitNgSelectComponent;
  let fixture: ComponentFixture<UnitNgSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitNgSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitNgSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
