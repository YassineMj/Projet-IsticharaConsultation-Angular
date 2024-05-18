import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css'],
})
export class DoughnutChartComponent implements OnInit {

  constructor(private _serviceAdmin: AdminService) {}

  ngOnInit(): void {
    this.getAllConsultants();
  }

  allConsultants:any;
  idConsultant1:any;
  getAllConsultants(){
    this._serviceAdmin.getAllConsultants().subscribe(
      resp=>{
        this.allConsultants=resp;
      }
    )
  }

  dataConsultant:any;
  getNombreRnv(){
    this._serviceAdmin.countRvByConsultant(this.idConsultant1).subscribe(
      resp=>{
        this.dataConsultant=resp;
        this.rendezvousChart();
      }
    )
  }


  rendezvousChart(): void {
    const ctx = document.getElementById('doughnut') as HTMLCanvasElement;

    // Vérifier si un graphique existe déjà
    let existingChart = Chart.getChart(ctx);
    if (existingChart) {
        // Détruire le graphique existant
        existingChart.destroy();
    }

    // Extraire les labels et les données de dataConsultant
    const labels = ['EN ATTENTE', 'ACCEPTE', 'REFUSE'];
    const data = [this.dataConsultant.ENATTENTE, this.dataConsultant.ACCEPTE, this.dataConsultant.REFUSE];

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              'rgb(255, 205, 86)',
              'rgba(0, 128, 0, 1)',
              'rgb(255, 99, 132)',
              
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
