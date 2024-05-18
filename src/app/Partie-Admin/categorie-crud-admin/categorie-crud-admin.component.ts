import { Component , OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorie-crud-admin',
  templateUrl: './categorie-crud-admin.component.html',
  styleUrls: ['./categorie-crud-admin.component.css']
})
export class CategorieCrudAdminComponent implements  OnInit {


  constructor(private _serviceAdmin: AdminService , private router: Router) {}

  listDomaine:any
  idDomaine:any;

  categorieData={
    nomCategorie:"",
    descriptionCategorie:""
  }

  listCategorie:any

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

        this.ngOnInit();
      }
    )
  }

}
