import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { ConsultantService } from '../Services/consultant.service';

@Component({
  selector: 'app-pie-chart-avis-consultant-dashboard',
  templateUrl: './pie-chart-avis-consultant-dashboard.component.html',
  styleUrls: ['./pie-chart-avis-consultant-dashboard.component.css'],
})
export class PieChartAvisConsultantDashboardComponent {
  @Input() idConsultant: any;
  avis: any;
  avisData: any;
  avisChartInstance: any | undefined;

  constructor(public _service: ConsultantService) {}

  ngOnInit(): void {
    this._service.getFavAndDefavCount(this.idConsultant).subscribe((data) => {
      this.avis = data;
      console.log(this.avis);

      this.avisData = {
        labels: ['Favorable', 'Défavorable'],
        values: [this.avis.favCount, this.avis.defavCount],
      };

      
      this.avisChart();
    });
  }

  avisChart(): void {
    const ctx = document.getElementById('pieChartConsultant') as HTMLCanvasElement;

    
    if (this.avisChartInstance) {
      this.avisChartInstance.destroy();
    }

    this.avisChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.avisData.labels,
        datasets: [
          {
            data: this.avisData.values,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(128, 0, 128, 0.2)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }
}
