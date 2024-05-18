import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultant-demande-admin',
  templateUrl: './consultant-demande-admin.component.html',
  styleUrls: ['./consultant-demande-admin.component.css']
})
export class ConsultantDemandeAdminComponent implements OnInit {

  constructor(private _serviceAdmin: AdminService , private router: Router) {}

  listDemandeComptes:any;

  ngOnInit(): void {

    if(this._serviceAdmin.authAdminObjet==null){
      this.router.navigate(['/admin-sidentifier'])
    }
    
    this._serviceAdmin.getAllDemandeCompte().subscribe(
      resp=>{
        this.listDemandeComptes=resp
      }
    )
  }

  detailCompte:any=null;

  getDetailcompte(idDemande:any , nom:any , prenom:any){
    this._serviceAdmin.getDemandeCompteById(idDemande).subscribe(
      resp=>{
        this.detailCompte=resp;

        const dataActivity={
          action:"consulter",
          description:"consulte la demande de "+nom+" "+prenom,
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

      }
    )
  }

  toggleActivation(event: any,idDemande:any , nom:any , prenom:any): void {
    const isChecked = event?.target?.checked; // Utilisation de l'opérateur de navigation sécurisé
    if (isChecked !== undefined && isChecked) {
      this._serviceAdmin.activeCompte(idDemande).subscribe(
        resp=>{
          alert(resp.message);

          const dataActivity={
            action:"ajouter",
            description:"Active le compte de "+nom+" "+prenom,
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

          this.ngOnInit();
        }
      )
    }
  }

}
