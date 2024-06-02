import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { ConsultantService } from 'src/app/Partie-Consultant/Services/consultant.service';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-pie-avis-chart',
  templateUrl: './pie-avis-chart.component.html',
  styleUrls: ['./pie-avis-chart.component.css']
})
export class PieAvisChartComponent implements OnInit {


  allConsultants:any;
  getAllConsultants(){
    this._serviceAdmin.getAllConsultants().subscribe(
      resp=>{
        this.allConsultants=resp;
      }
    )
  }

  constructor( private _serviceConsultant:ConsultantService,private _serviceAdmin:AdminService) { }

  ngOnInit(): void {
    this.getAllConsultants();
  }

  idConsultantAvis:any
  getAvis(){

    this._serviceConsultant.getFavAndDefavCount(this.idConsultantAvis).subscribe(
      data=>{
        this.avisData=data;
        this.avisData = {
          labels: ['Favorable', 'Défavorable'],
          values: [this.avisData.favCount, this.avisData.defavCount],
        };

        this.avisChart();
      }
    )
  }
  avisData :any

  avisChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie', // pie,
      data: {
        labels: this.avisData.labels,
        datasets: [
          {
            data: this.avisData.values,
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
