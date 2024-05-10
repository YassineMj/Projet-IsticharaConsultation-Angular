import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent {
  labels = [
    'Domaine 1',
    'Domaine 2',
    'Domaine 3',
    'Domaine 4',
    'Domaine 5',
    'Domaine 6',
  ];
  labelsdomaines = [
    'Domaine 1',
    'Domaine 2',
    'Domaine 3',
    'Domaine 4',
    'Domaine 5',
    'Domaine 6',
  ];
  datacategories = [2, 8, 5, 4, 3, 7];
  dataconsultants = [5, 6, 10, 7, 12, 13];

  consultantData = {
    labels: ['Accepté', 'Refusé', 'En attente'],
    values: [10, 20, 30],
  };
  domaineData = {
    labels: ['Accepté', 'Refusé', 'En attente'],
    values: [15, 10, 20],
  };
  avisData = {
    labels: ['Favorable', 'Défavorable'],
    values: [40,5],
  };
}
