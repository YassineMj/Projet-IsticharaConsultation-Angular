import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { consultantBean } from '../Beans/consultantBean';
import { domaineBean } from 'src/app/Partie-Utilisateur/Beans/domaineBean';
import { DomaineService } from 'src/app/Partie-Utilisateur/Services/DomaineCategorie.service';
import { categorieBean } from 'src/app/Partie-Utilisateur/Beans/categorieBean';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-sinscrire',
  templateUrl: './sinscrire.component.html',
  styleUrls: ['./sinscrire.component.css']
})
export class SinscrireComponent {

  constructor(private router: Router , private _service:DomaineService) {}

  ngOnInit(): void {
    this._service.getAllDomaine().subscribe(
      resp=>{
        this.domaines=resp;
      }
    )
  }

  formData:consultantBean= {
    formations: [],
    educations: [],
    experiencesPro: [],
    specialisation:[],
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
    photoProfile:null
  };

  ajouterFormation(): void {
    this.formData.formations.push('');
  }

  ajouterEducation(): void {
    this.formData.educations.push('');
  }

  ajouterExperiencePro(): void {
    this.formData.experiencesPro.push('');
  }

  supprimerFormation(index: number): void {
    this.formData.formations.splice(index, 1);
  }

  supprimerEducation(index: number): void {
    this.formData.educations.splice(index, 1);
  }

  supprimerExperiencePro(index: number): void {
    this.formData.experiencesPro.splice(index, 1);
  }

  trackByFn(index: any,) {
    return index;
  }

  ouvrirNouvelOnglet() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/termes-conditions'])
    );
    window.open(url, '_blank');
  }

  domaines:domaineBean[]=[]
  idDomaine:string=''

  categories:categorieBean[]=[];

  onIdDomaineChange(){
    this.formData.specialisation=[];
    this._service.getCategorieByIddomaine(this.idDomaine).subscribe(
      resp=>{
        this.categories=resp;
      }
    )
  }

  ajouterSpecialisation(nomCategorie: string): void {
    if (this.formData.specialisation.includes(nomCategorie)) {
      // Si la catégorie est déjà sélectionnée, la retirer de la liste
      this.formData.specialisation = this.formData.specialisation.filter(cat => cat !== nomCategorie);
    } else {
      // Sinon, l'ajouter à la liste
      this.formData.specialisation.push(nomCategorie);
    }
  }



  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.encodeImageBase64(file);
  }

  encodeImageBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.formData.photoProfile = reader.result as string;

      // Enregistrer la chaîne base64 dans un fichier local avec un nom unique (horodatage)
      const blob = this.base64ToBlob(this.formData.photoProfile);
      const timestamp = new Date().getTime(); // Horodatage actuel
      const fileName = `photo_profile_${timestamp}.png`; // Nom du fichier avec un horodatage

      // Spécifier le chemin pour enregistrer le fichier (dans le dossier "assets/images/")
      const filePath = `${fileName}`;

      // Utiliser FileSaver.js pour enregistrer le fichier dans le dossier choisi
      saveAs(blob, filePath);

      // Stocker le nom du fichier dans formData
      this.formData.photoProfile = filePath;
    };
    reader.readAsDataURL(file);
  }


  base64ToBlob(base64Data: string): Blob {
    const parts = base64Data.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uint8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uint8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: contentType });
  }


  conditionsAccepted = false;
  sinscrire(): void {
    if (this.conditionsAccepted) {
      // Appeler votre fonction sinscrire() ici
      console.log('Inscription en cours...');
      console.log(this.formData);
      
    } else {
      console.log('Veuillez accepter les conditions générales avant de vous inscrire.');
    }
  }
}
