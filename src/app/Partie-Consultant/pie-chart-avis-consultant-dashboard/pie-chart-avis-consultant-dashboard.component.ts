import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart-avis-consultant-dashboard',
  templateUrl: './pie-chart-avis-consultant-dashboard.component.html',
  styleUrls: ['./pie-chart-avis-consultant-dashboard.component.css'],
})
export class PieChartAvisConsultantDashboardComponent {

  @Input() data!: {
    labels: string[];
    values: number[];
  };

  constructor() {}

  ngOnInit(): void {
    this.avisChart();
  }

  avisChartInstance: any | undefined; // Propriété pour stocker l'instance du graphique

   avisChart(): void {
    const ctx = document.getElementById('pieChartConsultant') as HTMLCanvasElement;

    // Vérifier et détruire l'instance existante
    if (this.avisChartInstance) {
      this.avisChartInstance.destroy();
    }

    this.avisChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.data.labels,
        datasets: [
          {
            data: this.data.values,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(128, 0, 128, 0.2)', // Purple with 20% opacity
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
