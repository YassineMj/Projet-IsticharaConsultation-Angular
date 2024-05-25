import { Component, OnInit } from '@angular/core';


interface Problemes {
  consultantPasParle?: boolean;
  consultantPasParticipe?: boolean;
  problemeVoix?: boolean;
  mauvaiseQualiteVideo?: boolean;
  manqueDeConnaissances?: boolean;
  mauvaiseQualiteAudio?: boolean;
  connexionInterrompue?: boolean;
}


interface Reclamation {
  nomClient: string;
  avis: 'favorable' | 'defavorable';
  nomConsultant: string;
  nomdomaine: string;
  problemes?: Problemes;
  showProblemes?: boolean; // Property to toggle problems
}


@Component({
  selector: 'app-list-reclamation-admin',
  templateUrl: './list-reclamation-admin.component.html',
  styleUrls: ['./list-reclamation-admin.component.css']
})
export class ListReclamationAdminComponent implements OnInit{

 reclamations: Reclamation[] = [
    {
      nomClient: 'hajji oumaima',
      avis: 'favorable',
      nomConsultant: 'hiba hajji ',
      nomdomaine: 'religion'
    },
    {
      nomClient: 'buchra bensedik',
      avis: 'defavorable',
      nomConsultant: 'oumaima hajji',
      nomdomaine: 'economie',
      problemes: {
        consultantPasParle: true,
        consultantPasParticipe: true,
        problemeVoix: true
      }
   },
        {
      nomClient: 'Mhamed hajji',
      avis: 'favorable',
      nomConsultant: 'oumaima moumen ',
      nomdomaine: ' technologie'
   },
         {
      nomClient: 'buchra bensedik',
      avis: 'defavorable',
      nomConsultant: 'oumaima hajji',
      nomdomaine: 'economie',
      problemes: {
        problemeVoix: true,
        mauvaiseQualiteVideo: true,
        manqueDeConnaissances: true,
        mauvaiseQualiteAudio: true,
        connexionInterrompue: true
      }
   }, {
      nomClient: 'buchra bensedik',
      avis: 'defavorable',
      nomConsultant: 'oumaima hajji',
      nomdomaine: 'economie',
      problemes: {
        consultantPasParle: true,
        consultantPasParticipe: true,
        problemeVoix: true,
        mauvaiseQualiteAudio: true,
        connexionInterrompue: true
      }
   },
  ];

  constructor() { }

  ngOnInit(): void {}

  toggleProblemes(reclamation: Reclamation): void {
    reclamation.showProblemes = !reclamation.showProblemes;
  }
}
