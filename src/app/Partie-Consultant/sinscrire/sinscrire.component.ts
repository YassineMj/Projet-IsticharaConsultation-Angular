import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { consultantBean } from '../Beans/consultantBean';
import { domaineBean } from 'src/app/Partie-Utilisateur/Beans/domaineBean';
import { DomaineService } from 'src/app/Partie-Utilisateur/Services/DomaineCategorie.service';
import { categorieBean } from 'src/app/Partie-Utilisateur/Beans/categorieBean';
import { saveAs } from 'file-saver';
import { ConsultantService } from '../Services/consultant.service';
import { MatStepper, MatStepperNext } from '@angular/material/stepper'; // Importez MatStepper
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,

} from '@angular/forms';


@Component({
  selector: 'app-sinscrire',
  templateUrl: './sinscrire.component.html',
  styleUrls: ['./sinscrire.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class SinscrireComponent {
  firstFormGroup = this._formBuilder.group({
    nomCtrl: ['', Validators.required],
    prenomCtrl: ['', Validators.required],
    numeroTelephoneCtrl: ['', Validators.required],
    cinCtrl: ['', Validators.required],
    emailCtrl: ['', [Validators.required, Validators.email]],
    motDePasseCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    paysCtrl: ['', Validators.required],
    villeCtrl: ['', Validators.required],
    adresseCtrl: ['', Validators.required],
    ribCtrl: ['', Validators.required],
    banqueCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    descriptionProfileCtrl: ['', Validators.required],
    francaisCtrl: [false],
    anglaisCtrl: [false],
    arabeCtrl: [false],
    espagnolCtrl: [false],
  });

  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  hide = true;

  /* NomValid: boolean = false;
  PrenomValid: boolean = false;
  PhoneValid: boolean = false;
  CinValid: boolean = false;
  EmailValid: boolean = false;
  PasswordValid: boolean = false;

  infos() {
    this.NomValid = this.formData.nom === '';
    this.PrenomValid = this.formData.prenom === '';
    this.PhoneValid = this.formData.numeroTelephone === '';
    this.CinValid = this.formData.cin === '';
    this.EmailValid = this.formData.email === '';
    this.PasswordValid = this.formData.motDePasse === '';
    if (
      this.NomValid ||
      this.PrenomValid ||
      this.PhoneValid ||
      this.CinValid ||
      this.EmailValid ||
      this.PasswordValid
    ) {
      return; // Arrêtez l'envoi du formulaire si l'un des champs est vide
    }
  } */

  constructor(
    private router: Router,
    private _service: DomaineService,
    private _consultantService: ConsultantService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._service.getAllDomaine().subscribe((resp) => {
      this.domaines = resp;
    });
        this.isEmpty();

  }

  formData: consultantBean = {
    formations: [],
    educations: [],
    experiencesPro: [],
    idDomaine: '',
    specialisation: [],
    descriptionProfile: '',
    francais: false,
    anglais: false,
    arabe: false,
    espagnol: false,
    nom: '',
    prenom: '',
    pays: '',
    ville: '',
    email: '',
    motDePasse: '',
    numeroTelephone: '',
    cin: '',
    adresse: '',
    rib: '',
    banque: '',
    photoProfile: '',
  };
  experience: string = '';
  education: string = '';
  formation: string = '';
  exprienceEmpty: boolean = false;
  educationEmpty: boolean = false;
  formationEmpty: boolean = false;
  isEmpty() {
    this.exprienceEmpty = this.experience.trim() === '';
    this.educationEmpty = this.education.trim() === '';
    this.formationEmpty = this.formation.trim() === '';
  }
  addExperience() {
    this.formData.experiencesPro.push(this.experience);
    this.experience = '';
    this.exprienceEmpty = true;
  }

  supprimerExperiencePro(index: number): void {
    this.formData.experiencesPro.splice(index, 1);
  }
  addEducation() {
    this.formData.educations.push(this.education);
    this.education = '';
    this.educationEmpty = true;
  }

  addFormation() {
    this.formData.formations.push(this.formation);
    this.formation = '';
    this.formationEmpty = true;
  }

  supprimerFormation(index: number): void {
    this.formData.formations.splice(index, 1);
  }

  supprimerEducation(index: number): void {
    this.formData.educations.splice(index, 1);
  }
  trackByFn(index: any) {
    return index;
  }

  ouvrirNouvelOnglet() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/termes-conditions'])
    );
    window.open(url, '_blank');
  }

  domaines: domaineBean[] = [];

  categories: categorieBean[] = [];

  onIdDomaineChange() {
    this.formData.specialisation = [];
    this._service
      .getCategorieByIddomaine(this.formData.idDomaine)
      .subscribe((resp) => {
        this.categories = resp;
      });
  }

  ajouterSpecialisation(nomCategorie: string): void {
    if (this.formData.specialisation.includes(nomCategorie)) {
      // Si la catégorie est déjà sélectionnée, la retirer de la liste
      this.formData.specialisation = this.formData.specialisation.filter(
        (cat) => cat !== nomCategorie
      );
    } else {
      // Sinon, l'ajouter à la liste
      this.formData.specialisation.push(nomCategorie);
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.formData.photoProfile = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  conditionsAccepted = false;
  sinscrire(): void {
    if (
      this.firstFormGroup.valid === false ||
      this.secondFormGroup.valid === false ||
      this.thirdFormGroup.valid === false
    ) {
      alert('Veuillez vérifier les champs en rouge');
      return;
    } else {
      //if (this.conditionsAccepted){code}
      alert('Inscription réussie !');
      this.router.navigate(['/consultant/sidentifier-consultant']);
      //else ( alert)
    } 
    console.log("4", this.fourthFormGroup.valid)
  }

  /* if (this.conditionsAccepted) {

      console.log(this.formData);
      // Appeler votre fonction sinscrire() ici
      this._consultantService.addConsultant(this.formData).subscribe(
        (resp) => {
          console.log(resp);

          console.log(
            'Consultant uploadé avec succès. ID du consultant :',
            resp
          );
          // Ajoutez ici la logique pour traiter l'ID du consultant si nécessaire
        },
        (error) => {
          console.error("Erreur lors de l'upload du consultant", error);
          // Gérez les erreurs d'upload ici
        }
      );
    } else {
      console.log('error');
    } */
}

