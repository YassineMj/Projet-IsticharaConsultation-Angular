import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';


interface Reclamation {
  code_reclamation:string,
  nom: string,
	consultant_pas_parle: boolean,
	manque_de_connaissances: boolean,
	avis: string,
	nom_domaine:string,
	probleme_voix: boolean,
	prenom: string,
	connexion_interrompue: boolean,
	mauvaise_qualite_video: boolean,
	nom_client: string,
	mauvaise_qualite_audio: boolean,
	consultant_pas_participe: boolean
  showProblemes?: boolean; // Property to toggle problems
}


@Component({
  selector: 'app-list-reclamation-admin',
  templateUrl: './list-reclamation-admin.component.html',
  styleUrls: ['./list-reclamation-admin.component.css']
})
export class ListReclamationAdminComponent implements OnInit {

  reclamations: Reclamation[];
  isCopied: boolean = false;
  showTooltip: boolean = false;
  constructor(private _serviceAdmin: AdminService) { }

  
  ngOnInit(): void {
    this._serviceAdmin.getAllReclamation().subscribe(
      resp => {
        this.reclamations = resp
      }
    )
  }

  toggleProblemes(reclamation: Reclamation): void {
    reclamation.showProblemes = !reclamation.showProblemes;
  }


copyCode() {
    const codeElement = document.getElementById('codeReclamation');
    if (codeElement) {
      let codeToCopy = codeElement.textContent || codeElement.innerText;
      // Trim leading and trailing whitespace characters
      codeToCopy = codeToCopy.trim();
      navigator.clipboard.writeText(codeToCopy).then(() => {
        // Set isCopied to true to switch the icon temporarily
        this.isCopied = true;
        // Reset isCopied after a short delay
        setTimeout(() => {
          this.isCopied = false;
        }, 1000);
      }).catch((error) => {
        console.error('Unable to copy code: ', error);
      });
    }
  } 


}
