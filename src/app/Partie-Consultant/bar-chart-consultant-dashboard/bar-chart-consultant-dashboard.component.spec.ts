import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartConsultantDashboardComponent } from './bar-chart-consultant-dashboard.component';

describe('BarChartConsultantDashboardComponent', () => {
  let component: BarChartConsultantDashboardComponent;
  let fixture: ComponentFixture<BarChartConsultantDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartConsultantDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartConsultantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
