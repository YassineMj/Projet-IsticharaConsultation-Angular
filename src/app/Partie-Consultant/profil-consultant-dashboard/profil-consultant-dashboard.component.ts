import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-consultant-dashboard',
  templateUrl: './profil-consultant-dashboard.component.html',
  styleUrls: ['./profil-consultant-dashboard.component.css']
})
export class ProfilConsultantDashboardComponent {



selectedTab: string = 'profile';

  navigateProfile(tab: string): void {
    this.selectedTab = tab;
  }
}
