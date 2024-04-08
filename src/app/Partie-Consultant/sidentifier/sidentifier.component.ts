import { Component } from '@angular/core';
import { consultantBean } from '../Beans/consultantBean';
import { ConsultantService } from '../Services/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidentifier',
  templateUrl: './sidentifier.component.html',
  styleUrls: ['./sidentifier.component.css'],
})
export class SidentifierComponent {
  consultantAuth = {
    email: '',
    motDePasse: '',
  };
  champEmailVide: boolean = false;
  emailInvalid: boolean = false;
  champPasswordVide: boolean = false;
  notfound: boolean = false;

  validateEmail() {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    this.emailInvalid = !emailRegex.test(this.consultantAuth.email.trim());
  }

  constructor(private _service: ConsultantService, private router: Router) { }
  showError: boolean = false;
  auth() {
    this.validateEmail();
    this.champEmailVide = this.consultantAuth.email === '';
    this.champPasswordVide = this.consultantAuth.motDePasse === '';

    const validations = this.champEmailVide || this.emailInvalid || this.champPasswordVide;
    // Arrêtez l'envoi du formulaire si l'un des champs est vide

    if (validations) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false; // Réinitialise editDone à false après 2 secondes
      }, 3000);
    }
     else {
        this._service.consultantAuthObjet = null;

        this._service.authConsultant(this.consultantAuth).subscribe(
          (resp) => {
            this.notfound = false;

            this._service.consultantAuthObjet = resp;
            console.log(this._service.consultantAuthObjet);
            this.router.navigate(['/consultant/profil-consultant-dashoard']);
          },
          (error) => {
            console.error(error);
            console.log("identifant not found");
            this.notfound = true;

          }
        );
      }
    }
  }

