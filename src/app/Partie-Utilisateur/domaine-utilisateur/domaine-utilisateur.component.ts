import { Component, OnInit } from '@angular/core';
import { DomaineService } from '../Services/DomaineCategorie.service';
import { domaineBean } from '../Beans/domaineBean';
import { categorieBean } from '../Beans/categorieBean';

@Component({
  selector: 'app-domaine-utilisateur',
  templateUrl: './domaine-utilisateur.component.html',
})
export class DomaineUtilisateurComponent implements OnInit {

  constructor(private _service :DomaineService){}
  
  domaineList:domaineBean[]=[];
  
  ngOnInit(): void {
    this._service.getAllDomaine().subscribe(
      (resp)=>{
        this.domaineList=resp;
        this.getCategories(this.domaineList[0].idDomaine);
      },
      (error)=>{
        console.error(error);
      }
    )
  }


  categorieList:categorieBean[]=[];
  getCategories(idDomaine:string){
    this._service.getCategorieByIddomaine(idDomaine).subscribe(
      (resp)=>{
        this.categorieList=resp;
      },
      (error)=>{
        console.error(error);
      }
    )
  }

  toggleAnswer(c: any) {
    c.open = !c.open;
  }
}
