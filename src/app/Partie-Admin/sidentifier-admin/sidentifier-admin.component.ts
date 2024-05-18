import { Component , OnInit} from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidentifier-admin',
  templateUrl: './sidentifier-admin.component.html',
  styleUrls: ['./sidentifier-admin.component.css']
})
export class SidentifierAdminComponent implements OnInit {

  constructor(public _serviceAdmin:AdminService ,private router: Router){}

  ngOnInit(): void {
    this._serviceAdmin.authAdminObjet=null;
  }

  loginData={
    email:"",
    motDePasse:""
  }

  login(){
    console.log(this.loginData);
    
    this._serviceAdmin.authenticateAdmin(this.loginData)
      .subscribe(
        response => {
          // Authentification réussie, rediriger ou effectuer d'autres actions nécessaires
          console.log('Authentification réussie', response);
          this._serviceAdmin.authAdminObjet=response
          this.router.navigate(['/admin'])

        },
        error => {
          // Gérer les erreurs d'authentification
          console.error('Erreur lors de l\'authentification', error);
        }
      );
  }
  
}
