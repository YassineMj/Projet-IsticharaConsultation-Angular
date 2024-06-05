import { Component } from '@angular/core';
import { PaiementService } from '../Services/paiement.service';

@Component({
  selector: 'app-reclamation-utilisateur',
  templateUrl: './reclamation-utilisateur.component.html',
  styleUrls: ['./reclamation-utilisateur.component.css']
})
export class ReclamationUtilisateurComponent {

    // example.component.ts
  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';


  constructor(private _service:PaiementService){}

  allFieldsFilled: boolean = false;
  commentaireFilled: boolean = false;
  reclamationCode: string = '';
  showRadioButtons: boolean = false;
  avis: string = '';
  commentaire: string = '';

 problemes = {
  consultantPasParle: false,
  consultantPasParticipe: false,
  problemeVoix: false,
  mauvaiseQualiteVideo: false,
  manqueDeConnaissances: false,
  mauvaiseQualiteAudio: false,
  connexionInterrompue: false
};


  
  onAvisChange(avis: string) {
  this.avis = avis;
  if (avis === 'defavorable') {
    this.commentaire = ''; // Réinitialise le commentaire lorsque l'avis est "défavorable"
    this.commentaireFilled = false; // Réinitialise le statut du commentaire rempli
  }
     if (avis === 'favorable') {
    this.commentaire = ''; // Réinitialise le commentaire lorsque l'avis est "défavorable"
    this.commentaireFilled = false; // Réinitialise le statut du commentaire rempli
  }
}

  allFieldsFille(): boolean {
  if (this.avis === 'favorable') {
    return !!this.reclamationCode && !!this.commentaire;
  } else if (this.avis === 'defavorable') {
    return !!this.reclamationCode && (this.problemes.consultantPasParle || this.problemes.consultantPasParticipe || this.problemes.problemeVoix || this.problemes.mauvaiseQualiteVideo ||this.problemes.mauvaiseQualiteAudio || this.problemes.connexionInterrompue || this.problemes.manqueDeConnaissances);
  } else {
    return false;
  }
}

  
  onCodeInput() {
    if (!this.reclamationCode) {
      this.resetReclamation();
    }
  }

  resetFormFields() {
  this.reclamationCode = ''; // Réinitialiser le champ de code de réclamation
  this.avis = ''; // Réinitialiser le choix d'avis
  this.commentaire = ''; // Réinitialiser le champ de commentaire

  // Réinitialiser les propriétés associées aux problèmes rencontrés
  this.problemes = {
    consultantPasParle: false,
    consultantPasParticipe: false,
    problemeVoix: false,
    mauvaiseQualiteVideo: false,
    manqueDeConnaissances: false,
    mauvaiseQualiteAudio: false,
    connexionInterrompue: false
  };
}

  
  resetReclamation() {
    this.avis = '';
    this.commentaire = '';
    this.problemes = {
          consultantPasParle: false,
          consultantPasParticipe: false,
          problemeVoix: false,
          mauvaiseQualiteVideo: false,
          manqueDeConnaissances: false,
          mauvaiseQualiteAudio: false,
          connexionInterrompue: false
    };
  }

  checkFields() {
  if (this.avis === 'favorable') {
    this.allFieldsFilled = !!this.reclamationCode && !!this.avis && !!this.commentaire;
  } else if (this.avis === 'defavorable') {
    this.allFieldsFilled = !!this.reclamationCode && !!this.avis && (this.problemes.consultantPasParle || this.problemes.consultantPasParticipe || this.problemes.problemeVoix);
  }
}

  onCommentaireInput() {
  this.commentaireFilled = !!this.commentaire;
  this.checkFields();
}

onCheckboxChange() {
  this.checkFields();
}


  submitReclamation() {
    const reclamationData = {
      codeReclamation: this.reclamationCode,
      avis: this.avis,
      commentaire: this.commentaire,
      consultantPasParle: this.problemes.consultantPasParle,
      consultantPasParticipe: this.problemes.consultantPasParticipe,
      problemeVoix: this.problemes.problemeVoix,
      mauvaiseQualiteVideo: this.problemes.mauvaiseQualiteVideo,
      manqueDeConnaissances: this.problemes.manqueDeConnaissances,
      mauvaiseQualiteAudio: this.problemes.mauvaiseQualiteAudio,
      connexionInterrompue: this.problemes.connexionInterrompue
    };



    this._service.reclamation(reclamationData).subscribe(
      resp => {
      if (resp.message === "Reclamation ajoutée avec succès") {
        this.showAlert('Votre réclamation a été soumise avec succès ', 'success');
      } else {
        this.showAlert('  Votre avis a été déjà pris en compte !', 'danger');
      }
    },
      error => {
        this.showAlert(' Votre avis a été déjà pris en compte !', 'danger');

    }
  );
  }

  showAlert(message: string, type: 'success' | 'danger') {
  this.alertMessage = message;
  this.alertType = type;
  setTimeout(() => {
    this.alertMessage = '';
  }, 3000); // 2 seconds delay
}

}


