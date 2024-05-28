import { Component } from '@angular/core';

@Component({
  selector: 'app-statistique-consultant',
  templateUrl: './statistique-consultant.component.html',
  styleUrls: ['./statistique-consultant.component.css'],
})
export class StatistiqueConsultantComponent {
  avisData = {
    labels: ['Favorable', 'Défavorable'],
    values: [40, 5],
  };
  listActivity = [
    {
      date: '2023-05-01',
      action: 'Accepter',
      description: 'Accepter Rendez-vous',
    },
    {
      date: '2023-05-02',
      action: 'Refuser',
      description: 'Refuser Rendez-vous',
    },

    {
      date: '2023-05-04',
      action: 'Modifier',
      description: 'Modifié les informations ',
    },
  ];
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${month}/${day} - ${hours}:${minutes}`;
  }
  items = [
    {
      dateJourDebut: '24/05/2024',
      dateJourFin: '24/05/2024',
      jourDebut: 'Monday',
      jourFin: 'Monday',
      heureDebut: '13:00',
      heureFin: '14:00',
      status: 'Terminer',
    },
    {
      dateJourDebut: '24/05/2024',
      dateJourFin: '24/05/2024',
      jourDebut: 'Monday',
      jourFin: 'Monday',
      heureDebut: '13:00',
      heureFin: '14:00',
      status: 'En cours',
    },
    {
      dateJourDebut: '24/05/2024',
      dateJourFin: '24/05/2024',
      jourDebut: 'Monday',
      jourFin: 'Monday',
      heureDebut: '13:00',
      heureFin: '14:00',
      status: 'Réserver',
    },
  ];
}
