import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  @Input() data!: {
    labels: string[];
    values: number[];
  };

  constructor() {}

  ngOnInit(): void {
    this.rendezvousChart();
  }

  rendezvousChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie', // pie,
      data: {
        labels: this.data.labels,
        datasets: [
          {
            data: this.data.values,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
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
