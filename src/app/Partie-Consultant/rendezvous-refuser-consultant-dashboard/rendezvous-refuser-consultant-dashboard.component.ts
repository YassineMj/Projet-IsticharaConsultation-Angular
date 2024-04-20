import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../Services/rendez-vous.service';
import { ConsultantService } from '../Services/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rendezvous-refuser-consultant-dashboard',
  templateUrl: './rendezvous-refuser-consultant-dashboard.component.html',
  styleUrls: ['./rendezvous-refuser-consultant-dashboard.component.css']
})
export class RendezvousRefuserConsultantDashboardComponent implements OnInit {

  listRendezVous:any=null;


  constructor(private _serviceRendezVous:RendezVousService , private _serviceConsultant : ConsultantService , private router: Router){}

  ngOnInit(): void {
    if (this._serviceConsultant.consultantAuthObjet == null) {
      this.router.navigate(['/consultant/sidentifier-consultant']);
    }

    this._serviceRendezVous.getRendezVousRefuser(this._serviceConsultant.consultantAuthObjet.idConsultant).subscribe(
      resp=>{
        this.listRendezVous=resp;
      },error=>{
        this.listRendezVous=null;
      }
      
    )
  }
}
