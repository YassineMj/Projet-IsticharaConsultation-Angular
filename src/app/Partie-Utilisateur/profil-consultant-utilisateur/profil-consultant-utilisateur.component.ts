import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  morceauxDescription!:any;
  langues:string[]=[]

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.idConsultant=params.get('idConsultant');
    });

    this._service.getConsultantProfil(this.idConsultant).subscribe(
      (resp)=>{
        this.consultantProfil=resp;
        this.morceauxDescription = this.diviserChaineEnMorceaux(this.consultantProfil.descriptionProfile, 120);
        if(this.consultantProfil.francais==true){
          this.langues.push('Francais');
        }

        if(this.consultantProfil.anglais==true){
          this.langues.push('Anglais');
        }

        if(this.consultantProfil.espagnol==true){
          this.langues.push('Espagnol');
        }

        if(this.consultantProfil.arabe==true){
          this.langues.push('Arabe');
        }
        
      },
      (error)=>{
        console.error(error);
        
      }
    )
    
  } 

  diviserChaineEnMorceaux(description: string, tailleMorceau: number): string[] {
    const morceaux: string[] = [];
    for (let i = 0; i < description.length; i += tailleMorceau) {
      morceaux.push(description.substr(i, tailleMorceau));
    }
    return morceaux;
  }

  selectedTab: string = 'specialisation';

  navigateProfil(tab: string): void {
    this.selectedTab = tab;    
  }

}
