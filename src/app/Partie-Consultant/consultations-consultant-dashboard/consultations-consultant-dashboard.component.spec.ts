import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsConsultantDashboardComponent } from './consultations-consultant-dashboard.component';

describe('ConsultationsConsultantDashboardComponent', () => {
  let component: ConsultationsConsultantDashboardComponent;
  let fixture: ComponentFixture<ConsultationsConsultantDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationsConsultantDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationsConsultantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
