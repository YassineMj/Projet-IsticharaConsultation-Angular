import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-avis-chart',
  templateUrl: './pie-avis-chart.component.html',
  styleUrls: ['./pie-avis-chart.component.css']
})
export class PieAvisChartComponent implements OnInit {
  @Input() data!: {
    labels: string[];
    values: number[];
  };

  constructor() { }

  ngOnInit(): void {
    this.avisChart();
  }

  avisChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie', // pie,
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
