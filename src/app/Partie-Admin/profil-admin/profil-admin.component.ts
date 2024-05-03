import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent {



   profileImageUrl: string ="";

   onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
        this.readImageFile(file);
    }
}


    readImageFile(file: File): void {
        const reader = new FileReader();
        reader.onload = () => {
            this.profileImageUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
  

}
