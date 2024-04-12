import { Component, OnInit } from '@angular/core';
import { ConsultantService } from '../Services/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-consultant-dashboard',
  templateUrl: './profil-consultant-dashboard.component.html',
  styleUrls: ['./profil-consultant-dashboard.component.css'],
})
export class ProfilConsultantDashboardComponent implements OnInit {
  constructor(public _service: ConsultantService, private router: Router) {}

  ngOnInit(): void {
    if (this._service.consultantAuthObjet == null) {
      this.router.navigate(['/consultant/sidentifier-consultant']);
    }
    this.isEmpty();
  }

  NomValid: boolean = false;
  PrenomValid: boolean = false;
  PhoneValid: boolean = false;
  CinValid: boolean = false;
  EmailValid: boolean = false;
  PasswordValid: boolean = false;
  PaysValid: boolean = false;
  VilleValid: boolean = false;
  emailInvalid: boolean = false;
  showError: boolean = false;
  prenomInvalid: boolean = false;
  villeInvalid: boolean = false;
  paysInvalid: boolean = false;
  CinInvalid: boolean = false;
  phoneInvalid: boolean = false;
  nomInvalid: boolean = false;
  ribValid: boolean = false;
  banqueValid: boolean = false;
  adresseValid: boolean = false;
  descriptionValid: boolean = false;

  validateEmail() {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    this.emailInvalid = !emailRegex.test(
      this._service.consultantAuthObjet.email.trim()
    );
  }

  validatePhone() {
    const phoneRegex = /^\+212[5-7]{1}\d{8}$/;

    this.phoneInvalid = !phoneRegex.test(
      this._service.consultantAuthObjet.numeroTelephone.trim()
    );
  }
  validateNom() {
    const nomRegex = /^[a-zA-Z]{4,20}$/;
    this.nomInvalid = !nomRegex.test(
      this._service.consultantAuthObjet.nom.trim()
    );
  }
  validatePrenom() {
    const nomRegex = /^[a-zA-Z]{4,20}$/;
    this.prenomInvalid = !nomRegex.test(
      this._service.consultantAuthObjet.prenom.trim()
    );
  }
  validateVille() {
    const nomRegex = /^[a-zA-Z]{4,20}$/;
    this.villeInvalid = !nomRegex.test(
      this._service.consultantAuthObjet.ville.trim()
    );
  }
  validatePays() {
    const nomRegex = /^[a-zA-Z]{4,20}$/;
    this.paysInvalid = !nomRegex.test(
      this._service.consultantAuthObjet.pays.trim()
    );
  }
  validateCin() {
    const nomRegex = /^\w+$/;
    this.CinInvalid = !nomRegex.test(
      this._service.consultantAuthObjet.cin.trim()
    );
  }

  /*  tab: boolean = false;

  tablevide() {
    if (this._service.consultantAuthObjet.experiencesPro.length === 0 || this._service.consultantAuthObjet.formations.length === 0 || this._service.consultantAuthObjet.educations.length === 0)
      this.tab = true;
    if (this.tab) {
      alert("tablea est vide")

    }
    else(alert("la table n'est pas vide"))
} */


  /*  editvalidate() {
    this.validateEmail();
        this.validatePhone();
    this.validateNom();
    this.validatePrenom();
    this.validatePays();
    this.validateVille();
    this.validateCin();

    this.NomValid = this._service.consultantAuthObjet.nom === '';
    this.PrenomValid = this._service.consultantAuthObjet.prenom === '';
    this.CinValid = this._service.consultantAuthObjet.cin === '';
    this.PaysValid = this._service.consultantAuthObjet.pays === '';
    this.VilleValid = this._service.consultantAuthObjet.ville === '';
    this.EmailValid = this._service.consultantAuthObjet.email === '';
    this.PasswordValid = this._service.consultantAuthObjet.motDePasse === '';
    this.PhoneValid = this._service.consultantAuthObjet.numeroTelephone === '';

    if (
      this.NomValid ||
      this.PrenomValid ||
      this.PhoneValid ||
      this.CinValid ||
      this.EmailValid ||
      this.PasswordValid ||
      this.PaysValid ||
      this.VilleValid ||
      this.paysInvalid ||
      this.villeInvalid ||
      this.CinInvalid ||
      this.prenomInvalid ||
      this.phoneInvalid ||
      this.nomInvalid ||
      this.emailInvalid
    ) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false; // Réinitialise editDone à false après 2 secondes
      }, 3000);

      return; // Arrêtez l'envoi du formulaire si l'un des champs est vide
    }
  } */

  selectedTab: string = 'Profile';

  navigateProfile(tab: string): void {
    this.selectedTab = tab;
  }

  imageNom = '';
  testImageEmpty = true;
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.testImageEmpty = false;
        this.imageNom = reader.result as string;
        console.log(this.imageNom);
      };
      reader.readAsDataURL(file);
    }
  }

  experience: string = '';
  education: string = '';
  formation: string = '';
  exprienceEmpty: boolean = false;
  educationEmpty: boolean = false;
  formationEmpty: boolean = false;

  addExperience() {
    this._service.consultantAuthObjet.experiencesPro.push(this.experience);
    this.experience = '';
    this.exprienceEmpty = true;
  }
  isEmpty() {
    this.exprienceEmpty = this.experience.trim() === '';
    this.educationEmpty = this.education.trim() === '';
    this.formationEmpty = this.formation.trim() === '';
  }

  addEducation() {
    this._service.consultantAuthObjet.educations.push(this.education);
    this.education = '';
    this.educationEmpty=true;
  }

  addFormation() {
    this._service.consultantAuthObjet.formations.push(this.formation);
    this.formation = '';
    this.formationEmpty = true;
  }

  supprimerFormation(index: number): void {
    this._service.consultantAuthObjet.formations.splice(index, 1);
  }

  supprimerEducation(index: number): void {
    this._service.consultantAuthObjet.educations.splice(index, 1);
  }

  supprimerExperiencePro(index: number): void {
    this._service.consultantAuthObjet.experiencesPro.splice(index, 1);
  }

  editDone: boolean = false;

  edite() {
    if (this.testImageEmpty == false) {
      this._service.consultantAuthObjet.photoProfile = this.imageNom;
      this.testImageEmpty = true;
    }
    // Vérification pour s'assurer qu'au moins une langue est sélectionnée
    const auMoinsUneLangueSelectionnee =
      this._service.consultantAuthObjet.francais ||
      this._service.consultantAuthObjet.anglais ||
      this._service.consultantAuthObjet.espagnol ||
      this._service.consultantAuthObjet.arabe;

    this.validateEmail();
    this.validatePhone();
    this.validateNom();
    this.validatePrenom();
    this.validatePays();
    this.validateVille();
    this.validateCin();

    this.NomValid = this._service.consultantAuthObjet.nom === '';
    this.PrenomValid = this._service.consultantAuthObjet.prenom === '';
    this.CinValid = this._service.consultantAuthObjet.cin === '';
    this.PaysValid = this._service.consultantAuthObjet.pays === '';
    this.VilleValid = this._service.consultantAuthObjet.ville === '';
    this.EmailValid = this._service.consultantAuthObjet.email === '';
    this.PasswordValid = this._service.consultantAuthObjet.motDePasse === '';
    this.PhoneValid = this._service.consultantAuthObjet.numeroTelephone === '';
    this.banqueValid = this._service.consultantAuthObjet.banque === '';
    this.ribValid = this._service.consultantAuthObjet.rib === '';
    this.adresseValid = this._service.consultantAuthObjet.adresse === '';
    this.descriptionValid =
      this._service.consultantAuthObjet.descriptionProfile === '';

    if (
      this.NomValid ||
      this.PrenomValid ||
      this.PhoneValid ||
      this.CinValid ||
      this.EmailValid ||
      this.PasswordValid ||
      this.PaysValid ||
      this.VilleValid ||
      this.paysInvalid ||
      this.villeInvalid ||
      this.CinInvalid ||
      this.prenomInvalid ||
      this.phoneInvalid ||
      this.nomInvalid ||
      this.emailInvalid ||
      this.ribValid ||
      this.adresseValid ||
      this.banqueValid ||
      this.descriptionValid ||
      this._service.consultantAuthObjet.experiencesPro.length === 0 ||
      this._service.consultantAuthObjet.formations.length === 0 ||
      this._service.consultantAuthObjet.educations.length === 0 ||
      !auMoinsUneLangueSelectionnee
    ) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false; // Réinitialise editDone à false après 2 secondes
      }, 3000);

      return;
      // Arrêtez l'envoi du formulaire si l'un des champs est vide
    } else {
      this._service
        .updateConsultant(this._service.consultantAuthObjet)
        .subscribe(
          (resp) => {
            console.log(resp);
            this._service.consultantAuthObjet.photoProfile=resp.photoProfile;
            this.editDone = true;
            console.log('edit done');
            setTimeout(() => {
              this.editDone = false; // Réinitialise editDone à false après 2 secondes
            }, 2000);
          },
          (error) => {
            console.error(error);
            this.editDone = false;
            console.log('no edit detected');
          }
        );
    }
  }
}
