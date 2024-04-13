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
      }
    )
  }

  
}
