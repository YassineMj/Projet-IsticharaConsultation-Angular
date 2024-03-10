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

  imageNom=''
  testImageEmpty=true;
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.testImageEmpty=false;
        this.imageNom= reader.result as string; 
        console.log(this.imageNom);
        
      };
      reader.readAsDataURL(file);
    }
  }


  experience:string='';
  education:string='';
  formation:string='';

  addExperience(){
    this._service.consultantAuthObjet.experiencesPro.push(this.experience)
    this.experience=''
  }

  addEducation(){
    this._service.consultantAuthObjet.educations.push(this.education)
    this.education=''
  }

  addFormation(){
    this._service.consultantAuthObjet.formations.push(this.formation)
    this.formation=''
  }

  supprimerFormation(index: number): void {
    this._service.consultantAuthObjet.formations.splice(index, 1);
  }

  supprimerEducation(index: number): void {
    this._service.consultantAuthObjet.educations.splice(index, 1);
  }

  supprimerExperiencePro(index: number): void {
    this._service.consultantAuthObjet.experiencesPro.splice(index, 1);
  }


  edite(){
    if(this.testImageEmpty==false){
      this._service.consultantAuthObjet.photoProfile=this.imageNom;
      this.testImageEmpty=true;
    }

    this._service.updateConsultant(this._service.consultantAuthObjet).subscribe(
      (resp)=>{
        console.log(resp);
      },
      (error)=>{
        console.error(error);
        
      }
    )
    
  }
}
