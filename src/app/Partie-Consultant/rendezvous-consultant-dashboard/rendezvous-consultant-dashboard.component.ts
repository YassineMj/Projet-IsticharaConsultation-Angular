import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../Services/rendez-vous.service';
import { ConsultantService } from '../Services/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rendezvous-consultant-dashboard',
  templateUrl: './rendezvous-consultant-dashboard.component.html',
  styleUrls: ['./rendezvous-consultant-dashboard.component.css']
})
export class RendezvousConsultantDashboardComponent implements OnInit {

  listRendezVous:any;


  constructor(private _serviceRendezVous:RendezVousService , private _serviceConsultant : ConsultantService , private router: Router){}

  ngOnInit(): void {
    if (this._serviceConsultant.consultantAuthObjet == null) {
      this.router.navigate(['/consultant/sidentifier-consultant']);
    }

    this._serviceRendezVous.getRendezVous(this._serviceConsultant.consultantAuthObjet.idConsultant).subscribe(
      resp=>{
        this.listRendezVous=resp;
      },error=>{
        this.listRendezVous=null;
      }
      
    )
  }

  refuseRendezVous(idRendezVous:any){    
    this._serviceRendezVous.refuseRendezVous(idRendezVous).subscribe(
      resp=>{
        const dataActivity={
          action:"Refuser",
          description:"Refuser Rendez-vous",
          date:new Date(),
          idConsultant:this._serviceConsultant.consultantAuthObjet.id
        }

        this._serviceConsultant.addActivity(dataActivity).subscribe(
          (response) => {
            console.log('Activité ajoutée avec succès !', response);
            
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'activité : ', error);
            
          }
        );
        this.ngOnInit();
      }
    )
  }

  accepteRendezVous(idRendezVousParam : any , emailClientParam:any , dateJourParam:any , heureDebutParam:any){
    const lienRequest={
      idRendezVous:idRendezVousParam,
      lien:this._serviceRendezVous.getUrl(),
      emailConsultant:this._serviceConsultant.consultantAuthObjet.email,
      emailClient:emailClientParam,
      date:dateJourParam,
      heureDebut:heureDebutParam
    }

    this._serviceRendezVous.accepteRendezVous(lienRequest).subscribe(
      resp=>{
        console.log(resp);
        const dataActivity={
          action:"Accepter",
          description:"Accepter Rendez-vous",
          date:new Date(),
          idConsultant:this._serviceConsultant.consultantAuthObjet.id
        }

        this._serviceConsultant.addActivity(dataActivity).subscribe(
          (response) => {
            console.log('Activité ajoutée avec succès !', response);
            
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'activité : ', error);
            
          }
        );
        this.ngOnInit();
      },error=>{
        this.ngOnInit();
        //traitement de si plan répeter
      }
    )
    
  }
  
}
