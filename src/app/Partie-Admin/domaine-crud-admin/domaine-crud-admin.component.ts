import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-domaine-crud-admin',
  templateUrl: './domaine-crud-admin.component.html',
  styleUrls: ['./domaine-crud-admin.component.css']
})
export class DomaineCrudAdminComponent implements OnInit{

  constructor(private _serviceAdmin: AdminService , private router: Router) {}

  listDomaine:any

  ngOnInit(): void {

    if(this._serviceAdmin.authAdminObjet==null){
      this.router.navigate(['/admin-sidentifier'])
    }

    this._serviceAdmin.getAllDomaines().subscribe(
      resp=>{
        this.listDomaine=resp;
      }
    )
  }
  
  dataDomaine={
    nomDomaine:"",
    pathImage:"",
    descriptionDomaine:""
  }
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.dataDomaine.pathImage = reader.result as string;

      };
      reader.readAsDataURL(file);
    }
  }

  onFileChangeUpdate(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.updateDomaineData.pathImage = reader.result as string;

      };
      reader.readAsDataURL(file);
    }
  }

  ajouterDomaine(){
    this._serviceAdmin.createDomaine(this.dataDomaine).subscribe(
      resp=>{
        console.log(resp);

        const dataActivity={
          action:"ajouter",
          description:"Ajouter domaine "+this.dataDomaine.nomDomaine,
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

  updateDomaineData:any=null;

  getDomainById(idDomaine:any){
    this._serviceAdmin.getDomaineById(idDomaine).subscribe(
      resp=>{
        this.updateDomaineData=resp
      }
    )
  }

  updateDomaine(){
    this._serviceAdmin.updateDomaine(this.updateDomaineData.idDomaine,this.updateDomaineData).subscribe(
      resp=>{
        console.log(resp);

        const dataActivity={
          action:"modifier",
          description:"Modifier domaine "+this.updateDomaineData.nomDomaine,
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


        this.ngOnInit()
        
      }
    )
  }

  deleteDomaine(idDomaine:any , nomDomaine:any){
    this._serviceAdmin.deleteDomaine(idDomaine).subscribe(
      resp=>{
        console.log(resp);

        const dataActivity={
          action:"supprimer",
          description:"Supprimer domaine "+nomDomaine,
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
