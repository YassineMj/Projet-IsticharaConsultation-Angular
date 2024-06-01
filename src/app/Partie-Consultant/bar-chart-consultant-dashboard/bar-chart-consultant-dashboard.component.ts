import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ConsultantService } from '../Services/consultant.service';

@Component({
  selector: 'app-bar-chart-consultant-dashboard',
  templateUrl: './bar-chart-consultant-dashboard.component.html',
  styleUrls: ['./bar-chart-consultant-dashboard.component.css'],
})
export class BarChartConsultantDashboardComponent {
  
  constructor(private consultantService: ConsultantService) { }

  ngOnInit(): void {
    this.consultantService.getCountPlansByMonthForCurrentYear(this.consultantService.consultantAuthObjet.idConsultant).subscribe(data => {
      this.createBarChart(data);
    });
  }

  createBarChart(data: any): void {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const counts = Array(12).fill(0); // Initialiser un tableau de 12 éléments à 0

    for (const month in data) {
      if (data.hasOwnProperty(month)) {
        counts[+month - 1] = data[month]; // Remplir les données correspondantes
      }
    }

    const chartData = {
      labels: months,
      datasets: [{
        label: 'Nombre de plan par mois',
        data: counts,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        x: {
          beginAtZero: true
        }
      }
    };

    const ctx = document.getElementById('barChartConsultant') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: options
    });
  }
}

