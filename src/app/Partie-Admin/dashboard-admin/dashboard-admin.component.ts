import { Component,OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';
import { ConsultantService } from 'src/app/Partie-Consultant/Services/consultant.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent implements OnInit {


  constructor(private _serviceAdmin: AdminService , private router: Router ) {}

  countAllData: any;
  listActivity:any;

  ngOnInit(): void {
    if(this._serviceAdmin.authAdminObjet==null){
      this.router.navigate(['/admin-sidentifier'])
    }
    
    this.getAllActivity();
    this.getCountAll();
    this.getAllConsultants();
  }

  getAllActivity(){
    this._serviceAdmin.getActivitiesByAdminId(this._serviceAdmin.authAdminObjet.id).subscribe(
      resp=>{
        this.listActivity=resp;
        this.listActivity.reverse();

      }
    )
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${month}/${day} - ${hours}:${minutes}`;
  }

  getCountAll(): void {
    this._serviceAdmin.getCountAll().subscribe((data) => {
      this.countAllData = data;
    });
  }

  allConsultants:any;
  idConsultant1:any;
  getAllConsultants(){
    this._serviceAdmin.getAllConsultants().subscribe(
      resp=>{
        this.allConsultants=resp;
      }
    )
  }

  countPlanByConsultant:any=null;
  getNombrePlan(){
    this.countPlanByConsultant=null;
    this._serviceAdmin.countPlansByConsultantId(this.idConsultant1).subscribe(
      resp=>{
        this.countPlanByConsultant=resp
      }
    )
  }
  

}
