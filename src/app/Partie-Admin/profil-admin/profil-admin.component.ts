import { Component } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent {

  showSuccessMessage: boolean = false;
  
    constructor(public _serviceAdmin: AdminService , private router: Router) {}

    dataProfile={
      id:0,
      nomComplet: "",
      description: "",
      email: "",
      telephone: "",
      pays: "",
      adresse: "",
      travail: "",
      motDepasse: ""
    }

    ngOnInit(): void {
        if(this._serviceAdmin.authAdminObjet==null){
          this.router.navigate(['/admin-sidentifier'])
        }

        this.dataProfile.id=this._serviceAdmin.authAdminObjet.id;
        this.dataProfile.nomComplet=this._serviceAdmin.authAdminObjet.nomComplet;
        this.dataProfile.description=this._serviceAdmin.authAdminObjet.description;
        this.dataProfile.email=this._serviceAdmin.authAdminObjet.email;
        this.dataProfile.telephone=this._serviceAdmin.authAdminObjet.telephone;
        this.dataProfile.pays=this._serviceAdmin.authAdminObjet.pays;
        this.dataProfile.adresse=this._serviceAdmin.authAdminObjet.adresse;
        this.dataProfile.travail=this._serviceAdmin.authAdminObjet.travail;
        this.dataProfile.motDepasse=this._serviceAdmin.authAdminObjet.motDepasse;
    }

     sauvegarderInfo(){
        this._serviceAdmin.updateAdmin(this.dataProfile.id,this.dataProfile).subscribe(
            resp=>{
                this._serviceAdmin.authAdminObjet=resp;

                const dataActivity={
                  action:"modifier",
                  description:"Modifier les informations de l'admin",
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

            
       // Show success message
        this.showSuccessMessage = true;
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
                this.ngOnInit();
            }
        )
    }

    nPassword:string='';
    sauvegarderPassword(){
      if(this.nPassword!=''){
        this.dataProfile.motDepasse=this.nPassword;

        this._serviceAdmin.updateAdmin(this.dataProfile.id,this.dataProfile).subscribe(
          resp=>{            
              this._serviceAdmin.authAdminObjet=resp;
              this.nPassword='';

              const dataActivity={
                action:"modifier",
                description:"Modifier le mot de passe de l'admin",
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
            
            
       // Show success message
        this.showSuccessMessage = true;
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
              this.ngOnInit();
          }
      )
      }
    }
}
