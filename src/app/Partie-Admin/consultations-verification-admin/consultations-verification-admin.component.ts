import { Component , OnInit} from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultations-verification-admin',
  templateUrl: './consultations-verification-admin.component.html',
  styleUrls: ['./consultations-verification-admin.component.css']
})
export class ConsultationsVerificationAdminComponent implements OnInit {

  constructor(private _serviceAdmin: AdminService , private router: Router) {}
  showAlert = false;
  alertMessage: string;
  alertType: 'success' | 'danger';


  ngOnInit(): void {
    if(this._serviceAdmin.authAdminObjet==null){
      this.router.navigate(['/admin-sidentifier'])
    }
  }
 loading = false; // Initial loading state
  idReclamation:any;
  dataReclamation={
    id: 0,
    paiement: "",
    nom_domaine: "",
    date_jour_debut: "",
    duree: 0,
    heure_fin: "",
    nom: "",
    heure_debut: "",
    prenom: "",
    prix: 0,
    nom_client: "",
    lien_meet: ""
  };
  getReclamation(){
    this._serviceAdmin.getRendezVousReclamation(this.idReclamation).subscribe(
      resp=>{
        this.dataReclamation=resp;
      }
    )
  }

rembourser() {
    this.loading = true; // Set loading state to true when action starts

    this._serviceAdmin.valideReclamation(this.dataReclamation.id).subscribe(
      (resp) => {
        this.showAlert = true; // Show alert after successful response
        this.alertMessage = resp.message; // Set alert message from response
        this.alertType = 'success'; // Set alert type to success

        const dataActivity = {
          action: "rembourser",
          description: "Rembourser le paiement de le client " + this.dataReclamation.nom_client,
          date: new Date(),
          idAdmin: this._serviceAdmin.authAdminObjet.id
        };

        this._serviceAdmin.addActivity(dataActivity).subscribe(
          (response) => {
            console.log('Activité ajoutée avec succès !', response);
            // Handle success if needed
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'activité : ', error);
            // Handle error if needed
          }
        );

        this.dataReclamation = {
          id: 0,
          paiement: "",
          nom_domaine: "",
          date_jour_debut: "",
          duree: 0,
          heure_fin: "",
          nom: "",
          heure_debut: "",
          prenom: "",
          prix: 0,
          nom_client: "",
          lien_meet: ""
        };
        this.idReclamation = '';

        this.loading = false; // Reset loading state after completing all operations
      },
      (error) => {
        console.error('Erreur lors de la validation de la réclamation : ', error);
        this.showAlert = true; // Show alert in case of error
        this.alertMessage = 'Erreur lors de la validation de la réclamation'; // Set error message
        this.alertType = 'danger'; // Set alert type to danger

        this.loading = false; // Reset loading state after completing all operations
      }
    );
  }
}

