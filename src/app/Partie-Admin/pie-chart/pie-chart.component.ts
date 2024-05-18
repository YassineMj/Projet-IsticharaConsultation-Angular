import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from '../Services/admin.service';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {

  constructor(private _serviceADmin : AdminService) {}

  ngOnInit(): void {
    this._serviceADmin.getAllDomaines().subscribe(
      resp=>{
        this.getAllDomaine=resp
      }
    )
  }

  getAllDomaine:any
  idDomaine:any;

  getInfoDomaine(){
    this._serviceADmin.countRvByDomaine(this.idDomaine).subscribe(
      resp=>{
        this.domaineData=resp;
        this.rendezvousChart();
      }
    )
  }

  domaineData :any;

  rendezvousChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    // Vérifier si un graphique existe déjà
    let existingChart = Chart.getChart(ctx);
    if (existingChart) {
        // Détruire le graphique existant
        existingChart.destroy();
    }

    let dataValues = [0, 0, 0];
    let backgroundColors = [
        'rgba(75, 192, 192, 0.2)', // En attente
        'rgba(255, 99, 132, 0.2)', // Accepte
        'rgba(54, 162, 235, 0.2)', // Refuse
    ];
    let borderColors = [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
    ];

    if (this.domaineData.ENATTENTE !== null) {
        dataValues = [
            this.domaineData.ENATTENTE,
            this.domaineData.ACCEPTE,
            this.domaineData.REFUSE
        ];

        // Ajouter des couleurs supplémentaires si besoin
        backgroundColors = [
            this.domaineData.ENATTENTE > 0 ? 'rgb(255, 205, 86)' : 'rgba(54, 162, 235, 0.2)',
            this.domaineData.ACCEPTE > 0 ? 'rgba(0, 128, 0, 0.2)' : 'rgba(54, 162, 235, 0.2)',
            this.domaineData.REFUSE > 0 ? 'rgba(255, 0, 0, 0.2)' : 'rgba(54, 162, 235, 0.2)'
        ];

        borderColors = [
            this.domaineData.ENATTENTE > 0 ? 'rgb(255, 205, 86)' : 'rgba(54, 162, 235, 0.2)',
            this.domaineData.ACCEPTE > 0 ? 'rgba(0, 128, 0, 1)' : 'rgba(54, 162, 235, 0.2)',
            this.domaineData.REFUSE > 0 ? 'rgba(255, 0, 0, 1)' : 'rgba(54, 162, 235, 0.2)'
        ];
    }

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['EN ATTENTE', 'ACCEPTE', 'REFUSE'],
        datasets: [
          {
            data: dataValues,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
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
