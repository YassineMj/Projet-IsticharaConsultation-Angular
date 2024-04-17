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
        this.ngOnInit();
      },error=>{
        this.ngOnInit();
        //traitement de si plan répeter
      }
    )
    
  }
  
}
