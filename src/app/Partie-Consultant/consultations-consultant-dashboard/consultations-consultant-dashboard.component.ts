import { Component, OnInit } from '@angular/core';
import { consultationBean } from '../Beans/consultationBean';
import { ConsultationService } from '../Services/consultation.service';
import { ConsultantService } from '../Services/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultations-consultant-dashboard',
  templateUrl: './consultations-consultant-dashboard.component.html',
  styleUrls: ['./consultations-consultant-dashboard.component.css']
})
export class ConsultationsConsultantDashboardComponent implements OnInit{

  consultation: consultationBean =new consultationBean();
  getConsultations:any

  constructor(private _serviceConsultation:ConsultationService , private _serviceConsultant:ConsultantService , private router: Router){}


  ngOnInit(): void {
    this._serviceConsultation.getConsultation(this._serviceConsultant.consultantAuthObjet.idConsultant).subscribe(
      (data) => {
        this.getConsultations = data;        
      },
      (error) => {
        console.error('Erreur lors de la récupération des consultations', error);
      }
    );
  }

  ajouterConsultation(){    
    this._serviceConsultation.addConsultation(this._serviceConsultant.consultantAuthObjet.idConsultant,this.consultation).subscribe(
      resp=>{
        this.ngOnInit();
      }
    )
  }

  goToPlan(idConsultation:string){
    this.router.navigate(['/consultant/plan-consultations-consultant-dashboard', idConsultation]); 
  }

}
