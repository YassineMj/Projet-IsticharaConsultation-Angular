import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultant-accpeter-admin',
  templateUrl: './consultant-accpeter-admin.component.html',
  styleUrls: ['./consultant-accpeter-admin.component.css']
})
export class ConsultantAccpeterAdminComponent implements OnInit {

  constructor(private _serviceAdmin: AdminService , private router: Router) {}

  listConsultant:any;

  ngOnInit(): void {

    if(this._serviceAdmin.authAdminObjet==null){
      this.router.navigate(['/admin-sidentifier'])
    }
    
    this._serviceAdmin.getAllConsultants().subscribe(
      resp=>{
        this.listConsultant=resp
      }
    )
  }

  detailCompte:any=null;

  getDetailcompte(idDemande:any,nom:any,prenom:any){
    this._serviceAdmin.getConsultantById(idDemande).subscribe(
      resp=>{
        this.detailCompte=resp;

        const dataActivity={
          action:"consulter",
          description:"consulte le compte de consultant "+nom+" "+prenom,
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

}
