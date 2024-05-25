import { Component } from '@angular/core';

@Component({
  selector: 'app-reclamation-utilisateur',
  templateUrl: './reclamation-utilisateur.component.html',
  styleUrls: ['./reclamation-utilisateur.component.css']
})
export class ReclamationUtilisateurComponent {

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
    return !!this.reclamationCode && (this.problemes.consultantPasParle || this.problemes.consultantPasParticipe || this.problemes.problemeVoix);
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
      code: this.reclamationCode,
      avis: this.avis,
      commentaire: this.commentaire,
      problemes: this.problemes
    };

    console.log('Réclamation soumise :', reclamationData);
    alert('Votre réclamation a été soumise avec succès.');
  }

}
