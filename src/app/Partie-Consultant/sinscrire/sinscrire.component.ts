import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { consultantBean } from '../Beans/consultantBean';
import { domaineBean } from 'src/app/Partie-Utilisateur/Beans/domaineBean';
import { DomaineService } from 'src/app/Partie-Utilisateur/Services/DomaineCategorie.service';
import { categorieBean } from 'src/app/Partie-Utilisateur/Beans/categorieBean';
import { saveAs } from 'file-saver';
import { ConsultantService } from '../Services/consultant.service';
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
})
export class SinscrireComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  hide = true;

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
  addExperience() {
    this.formData.experiencesPro.push(this.experience);
    this.experience = '';
  }

  supprimerExperiencePro(index: number): void {
    this.formData.experiencesPro.splice(index, 1);
  }
  addEducation() {
    this.formData.educations.push(this.education);
    this.education = '';
  }

  addFormation() {
    this.formData.formations.push(this.formation);
    this.formation = '';
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
    if (this.conditionsAccepted) {
      console.log(this.formData)
      // Appeler votre fonction sinscrire() ici
     /*  this._consultantService.addConsultant(this.formData).subscribe(
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
      ); */
    } else {
      console.log("error")
    }
  }
}
