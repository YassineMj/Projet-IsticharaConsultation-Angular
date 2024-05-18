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

  ngOnInit(): void {
    if(this._serviceAdmin.authAdminObjet==null){
      this.router.navigate(['/admin-sidentifier'])
    }
  }

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

  rembourser(){
    this._serviceAdmin.valideReclamation(this.dataReclamation.id).subscribe(
      resp=>{
        alert(resp.message);

        const dataActivity={
          action:"rembourser",
          description:"Rembourser le paiement de le client "+this.dataReclamation.nom_client,
          date:new Date(),
          idAdmin:this._serviceAdmin.authAdminObjet.id
        }

        this._serviceAdmin.addActivity(dataActivity).subscribe(
          (response) => {
            console.log('Activité ajoutée avec succès !', response);
            
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'activité : ', error);
            
          }
        );

        this.dataReclamation={
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
        this.idReclamation='';
      }
    )
  }

}
