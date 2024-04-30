import { Component } from '@angular/core';

@Component({
  selector: 'app-domaine-crud-admin',
  templateUrl: './domaine-crud-admin.component.html',
  styleUrls: ['./domaine-crud-admin.component.css']
})
export class DomaineCrudAdminComponent {
  isEditing: boolean = false;

     message: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit saepe molestiae, deserunt pariatur consequatur tenetur aperiam sed doloribus praesentium tempore distinctio numquam itaque possimus. Provident cupiditate amet fugiat incidunt dolore?";
     domaine: string="sport"
  toggleEdit() {
  this.isEditing = !this.isEditing;
}
  
  onFileSelected(event: any) {
  const selectedFile = event.target.files[0];

  // Handle the selected file, like uploading or processing it
}
}
