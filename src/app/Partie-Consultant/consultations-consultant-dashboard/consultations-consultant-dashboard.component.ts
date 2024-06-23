import { Component, OnInit } from '@angular/core';
import { consultationBean } from '../Beans/consultationBean';
import { ConsultationService } from '../Services/consultation.service';
import { ConsultantService } from '../Services/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultations-consultant-dashboard',
  templateUrl: './consultations-consultant-dashboard.component.html',
  styleUrls: ['./consultations-consultant-dashboard.component.css'],
})
export class ConsultationsConsultantDashboardComponent implements OnInit {

  showSuccessMessage: boolean = false;
  showInfoMessage: boolean = false;

  consultation: consultationBean = new consultationBean();
  getConsultations: any = null;
  consultationExist = {
    description: '',
    duree: 0,
    prix: 0,
  };
  desc: boolean = false;
  duree: boolean = false;
  prix: boolean = false;
  modification: boolean = false;
  ajoute: boolean = false;

  constructor(
    private _serviceConsultation: ConsultationService,
    private _serviceConsultant: ConsultantService,
    private router: Router
  ) {}

  ngOnInit(): void {
     if (this._serviceConsultant.consultantAuthObjet == null) {
       this.router.navigate(['/consultant/sidentifier-consultant']);
     }
    this._serviceConsultation
      .getConsultation(this._serviceConsultant.consultantAuthObjet.idConsultant)
      .subscribe(
        (data) => {
          this.getConsultations = data;
          this.consultationExist.description = data.description;
          this.consultationExist.duree = data.duree;
          this.consultationExist.prix = data.prix;
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des consultations',
            error
          );
        }
      );
  }

  ajouterConsultation() {
    this.desc = this.consultation.description.trim() === '';
    this.duree = this.consultation.duree === 0 || this.consultation.duree < 14;
    this.prix = this.consultation.prix === 0 || this.consultation.prix<99;
    if (this.prix || this.desc || this.duree) {
      alert('veuillez remplir les champs avec duree min 15 et prix min 100');
      return;
    } else {
      this._serviceConsultation
        .addConsultation(
          this._serviceConsultant.consultantAuthObjet.idConsultant,
          this.consultation
        )
        .subscribe((resp) => {
          this.ngOnInit();
          this.ajoute = true;
        });


       // Show success message
        this.showSuccessMessage = true;
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
    }
  }

  modifierConsultation() {
    this.desc = this.consultationExist.description.trim() === '';
    this.duree =
      this.consultationExist.duree === 0 || this.consultationExist.duree < 14;
    this.prix =
      this.consultationExist.prix === 0 || this.consultationExist.prix < 99;
    if (this.prix || this.desc || this.duree) {
      alert('veuillez remplir les champs avec duree min 15 et prix min 100');
      return;
    } else {
      this._serviceConsultation
        .updateConsultation(
          this._serviceConsultant.consultantAuthObjet.idConsultant,
          this.consultationExist
        )
        .subscribe((resp) => {
          this.ngOnInit();
          this.modification = true;
        });


       // Show success message
        this.showInfoMessage = true;
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showInfoMessage = false;
        }, 3000);
    }
  }

  goToPlan(idConsultation: string) {
    this.router.navigate([
      '/consultant/plan-consultations-consultant-dashboard',
      idConsultation,
    ]);
  }
}
