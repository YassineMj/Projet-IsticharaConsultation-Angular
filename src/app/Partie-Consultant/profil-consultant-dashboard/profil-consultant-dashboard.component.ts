import { Component, OnInit } from '@angular/core';
import { ConsultantService } from '../Services/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-consultant-dashboard',
  templateUrl: './profil-consultant-dashboard.component.html',
  styleUrls: ['./profil-consultant-dashboard.component.css']
})
export class ProfilConsultantDashboardComponent implements OnInit {


  constructor(public _service : ConsultantService , private router:Router){}

  ngOnInit(): void {
    if(this._service.consultantAuthObjet==null){
      this.router.navigate(['/consultant/sidentifier-consultant']);
    }
  }

selectedTab: string = 'Profile';

  navigateProfile(tab: string): void {
    this.selectedTab = tab;
  }
}
