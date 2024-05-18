import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from '../Services/admin.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {

  constructor(private _serviceAdmin: AdminService) {}


  ngOnInit(): void {
    this._serviceAdmin.getCountCategorieConsultantParDomaine().subscribe((data) => {
           
      for(let c of data){
        this.domaines.push(c.nomDomaine)
        this.datacategories.push(+c.countCategories)
        this.dataconsultants.push(+c.countConsultants)
      }
      this.createBarChart();
    });
  }

  domaines :string[]=[];
  datacategories :number[]= [];
  dataconsultants :number[]= [];


  createBarChart(): void {
    const data = {
      labels: this.domaines, // Remplacez par vos domaines
      datasets: [
        {
          label: 'Nombre de catégories par domaine',
          data: this.datacategories, // Remplacez par le nombre de catégories par domaine
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Nombre de consultants par domaine',
          data: this.dataconsultants,//consultants
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
