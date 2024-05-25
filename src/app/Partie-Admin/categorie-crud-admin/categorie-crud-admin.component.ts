import { Component , OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorie-crud-admin',
  templateUrl: './categorie-crud-admin.component.html',
  styleUrls: ['./categorie-crud-admin.component.css']
})
export class CategorieCrudAdminComponent implements  OnInit {

    showSuccessMessage: boolean = false;
    showInfoMessage: boolean = false;
    showDangerMessage: boolean = false;
    showSearchInput: boolean = false;

  constructor(private _serviceAdmin: AdminService, private router: Router) { }
  
  listCategorie: any
  listDomaine:any
  idDomaine:any;

  categorieData={
    nomCategorie:"",
    descriptionCategorie:""
  }

  isFormComplete(): boolean {

  return !!this.categorieData.nomCategorie && 
         !!this.categorieData.descriptionCategorie &&
         !!this.idDomaine;
    
}

  categorieToDeleteId: number;
  categorieToDeleteName: string;

  // Méthode pour stocker les informations du domaine à supprimer
  setCategorieToDelete(id: number, nom: string): void {
    this.categorieToDeleteId = id;
    this.categorieToDeleteName = nom;
  }

 toggleSearchInput(inputElement: HTMLInputElement) {
   this.showSearchInput = !this.showSearchInput;
     if (!this.showSearchInput) {
      inputElement.value = '';
    }
   
  }

  ngOnInit(): void {
    if(this._serviceAdmin.authAdminObjet==null){
      this.router.navigate(['/admin-sidentifier'])
    }
    
    this._serviceAdmin.getAllDomaines().subscribe(
      resp=>{
        this.listDomaine=resp
      }
    )

    this._serviceAdmin.getAllCategories().subscribe(
      resp=>{
        this.listCategorie=resp
      }
    )
  }

  ajouterCategorie(){
    
    console.log(this.idDomaine);
    
    this._serviceAdmin.addCategorie(this.idDomaine,this.categorieData).subscribe(
      resp=>{
        console.log(resp);

        const dataActivity={
          action:"ajouter",
          description:"Ajouter categorie "+this.categorieData.nomCategorie,
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
        
        this.categorieData.descriptionCategorie="";
        this.categorieData.nomCategorie="";
        this.ngOnInit();
      }
    )
  }

  categorieUpdateData:any=null;

  getCategorieById(idCategorie:any){
    this._serviceAdmin.getCategorieById(idCategorie).subscribe(
      resp=>{
        this.categorieUpdateData=resp;
      }
    )
  }

  updateCategorie(idCategorie:any){
    this._serviceAdmin.updateCategorie(idCategorie,this.categorieUpdateData.domaine.idDomaine,this.categorieUpdateData).subscribe(
      resp=>{
        console.log(resp);
        
        const dataActivity={
          action:"modifier",
          description:"Modifier categorie "+this.categorieUpdateData.nomCategorie,
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
        this.showInfoMessage = true;
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showInfoMessage = false;
        }, 3000);

        this.categorieUpdateData.descriptionCategorie="";
        this.categorieUpdateData.nomCategorie="";

        this.ngOnInit();

      }
    )
  }

  deleteCategorie(idCategorie:any , nomCategorie:any){
    this._serviceAdmin.deleteCategorie(idCategorie).subscribe(
      resp=>{
        console.log(resp);

        const dataActivity={
          action:"supprimer",
          description:"Supprimer categorie "+nomCategorie,
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
        this.showDangerMessage = true;
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showDangerMessage = false;
        }, 3000);

        this.ngOnInit();
      }
    )
  }

}
