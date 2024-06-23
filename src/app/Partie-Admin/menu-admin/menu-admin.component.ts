import { Component } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {

  constructor(public _serviceAdmin: AdminService , private router: Router) {}

  ngOnInit(): void {
    if(this._serviceAdmin.authAdminObjet==null){
      this.router.navigate(['/admin-sidentifier'])
    }
  }


sidebarVisible: boolean = true;

  toggleSidebar() {

    this.sidebarVisible = !this.sidebarVisible;

  }

}
