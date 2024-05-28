import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart-consultant-dashboard',
  templateUrl: './bar-chart-consultant-dashboard.component.html',
  styleUrls: ['./bar-chart-consultant-dashboard.component.css'],
})
export class BarChartConsultantDashboardComponent {
  ngOnInit(): void {
    this.createBarChart();
  }
  createBarChart(): void {
    const data = {
      labels: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ], // Les mois de l'année
      datasets: [
        {
          label: 'Nombre de plan par mois',
          data: [12, 19, 3, 5, 2, 3, 9, 7, 4, 10, 6, 8], // Exemple de données
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    };

    const ctx = document.getElementById(
      'barChartConsultant'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });
  }
}
