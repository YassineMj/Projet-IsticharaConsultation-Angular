import { Component } from '@angular/core';
import { consultantBean } from '../Beans/consultantBean';
import { ConsultantService } from '../Services/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidentifier',
  templateUrl: './sidentifier.component.html',
  styleUrls: ['./sidentifier.component.css']
})
export class SidentifierComponent {

  consultantAuth={
    email:'',
    motDePasse:''
  }

  constructor(private _service:ConsultantService , private router:Router){}

  auth(){
    this._service.consultantAuthObjet=null;

    this._service.authConsultant(this.consultantAuth).subscribe(
      (resp)=>{
        this._service.consultantAuthObjet=resp
        console.log(this._service.consultantAuthObjet);
        this.router.navigate(['/consultant/profil-consultant-dashoard']);
      },
      (error)=>{
        console.error(error);
      }
    )
  }
}
