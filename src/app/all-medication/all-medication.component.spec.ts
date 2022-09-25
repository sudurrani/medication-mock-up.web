import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMedicationComponent } from './all-medication.component';

describe('AllMedicationComponent', () => {
  let component: AllMedicationComponent;
  let fixture: ComponentFixture<AllMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMedicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
