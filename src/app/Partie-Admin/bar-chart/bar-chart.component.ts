import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  constructor() {}
  @Input() labels: String[] = [];
  @Input() data1: number[] = [];
  @Input() data2: number[] = [];
  ngOnInit(): void {
    this.createBarChart();
  }

  createBarChart(): void {
    const data = {
      labels: this.labels, // Remplacez par vos domaines
      datasets: [
        {
          label: 'Nombre de catégories par domaine',
          data: this.data1, // Remplacez par le nombre de catégories par domaine
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Nombre de consultants par domaine',
          data: this.data2,//consultants
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
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

    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });
  }
}
