import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css'],
})
export class DoughnutChartComponent implements OnInit {
  @Input() data!: {
    labels: string[];
    values: number[];
  };

  constructor() {}

  ngOnInit(): void {
    this.rendezvousChart();
  }

  rendezvousChart(): void {
    const ctx = document.getElementById('doughnut') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut', // pie,
      data: {
        labels: this.data.labels,
        datasets: [
          {
            data: this.data.values,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
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
