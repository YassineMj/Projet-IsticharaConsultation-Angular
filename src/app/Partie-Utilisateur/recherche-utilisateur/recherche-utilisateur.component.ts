import { Component } from '@angular/core';
import { DomaineService } from '../Services/DomaineCategorie.service';
import { domaineBean } from '../Beans/domaineBean';
import { categorieBean } from '../Beans/categorieBean';
import { ConsultationService } from 'src/app/Partie-Consultant/Services/consultation.service';

@Component({
  selector: 'app-recherche-utilisateur',
  templateUrl: './recherche-utilisateur.component.html',
  styleUrls: ['./recherche-utilisateur.component.css']
})
export class RechercheUtilisateurComponent {

  constructor(private _serviceDomaineCategorie:DomaineService , private _serviceConsultation:ConsultationService){}

  domaines:domaineBean[]=[]

  categories:categorieBean[]=[];

  nomCategorie:any;


  ngOnInit(): void {
    this._serviceDomaineCategorie.getAllDomaine().subscribe(
      resp=>{
        this.domaines=resp;
      }
    )
  }

  idDomaine:string=''

  onIdDomaineChange(){    
    this._serviceDomaineCategorie.getCategorieByIddomaine(this.idDomaine).subscribe(
      resp=>{
        this.categories=resp;
      }
    )
  }

  dataConsultations:any;
  getConsultations(){    
    this._serviceConsultation.getConsultationByIdDomaineEtNomCategorie(this.idDomaine,this.nomCategorie).subscribe(
      (resp)=>{        
        this.dataConsultations=resp;    
        console.log(resp);        
      },
      (error)=>{
        console.error(error);
      }
    )
  }
}
