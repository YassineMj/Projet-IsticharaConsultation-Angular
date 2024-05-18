import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-bar-horizontal-chart',
  templateUrl: './bar-horizontal-chart.component.html',
  styleUrls: ['./bar-horizontal-chart.component.css'],
})
export class BarHorizontalChartComponent implements OnInit {

  constructor(private _serviceAdmin : AdminService) {}

  labels: any[] = [];
  data1: number[] = [];
  data2: number[] = [];

  ngOnInit(): void {
    this._serviceAdmin.countConsultationsPlansByDomaine().subscribe(
      resp => {
        // Traiter la réponse pour extraire les données pertinentes
        resp.forEach(item => {
          // Ajouter le nom de domaine à labels
          this.labels.push(item.nomDomaine);
          // Ajouter le nombre de consultations à data1
          this.data1.push(item.consultations);
          // Ajouter le nombre de plans à data2
          this.data2.push(item.plans);
        });

        // Une fois que les données sont extraites, créer le graphique
        this.createBarHorizontalChart();
      }
    );
}


  createBarHorizontalChart(): void {
    const data = {
      labels: this.labels, // Remplacez par vos domaines
      datasets: [
        {
          label: 'Nombre de consultations par domaine',
          data: this.data1, // Remplacez par le nombre de catégories par domaine
          backgroundColor: 'rgb(128, 0, 128)',

        },
        {
          label: 'Nombre de plans par domaine',
          data: this.data2, //consultants
          backgroundColor: 'rgb(255, 192, 203)',
        },
      ],
    };

    const options = {
      indexAxis: 'y' as const, // Utiliser 'y' comme type pour indexAxis

      scales: {
        x: {
          beginAtZero: true,
        },
      },
    };

    const ctx = document.getElementById(
      'barHorizontalChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });
  }
}
