import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { consultantBean } from 'src/app/Partie-Consultant/Beans/consultantBean';
import { ConsultantService } from 'src/app/Partie-Consultant/Services/consultant.service';


@Component({
  selector: 'app-profil-consultant-utilisateur',
  templateUrl: './profil-consultant-utilisateur.component.html',
  styleUrls: ['./profil-consultant-utilisateur.component.css']
})
export class ProfilConsultantUtilisateurComponent implements OnInit{

  constructor(private route :ActivatedRoute , private _service: ConsultantService){}


  idConsultant:any
  consultantProfil!:any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.idConsultant=params.get('idConsultant');
    });

    this._service.getConsultantProfil(this.idConsultant).subscribe(
      (resp)=>{
        this.consultantProfil=resp;
      },
      (error)=>{
        console.error(error);
        
      }
    )
    
  }

  selectedTab: string = 'specialisation';

  navigateProfil(tab: string): void {
    this.selectedTab = tab;    
  }

}
