import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact-utilisateur',
  templateUrl: './contact-utilisateur.component.html',
    styleUrls: ['./contact-utilisateur.component.css']


})

export class ContactUtilisateurComponent {

  Infomessage={
    nom:'',
    email:'',
    numero:'',
    message:'',
  }

  send(){
    emailjs.init('MZrSjOhYn3BJR5ee5')
    emailjs.send("service_6ws5cmm","template_ztdbdyg",{
        from_name: this.Infomessage.nom,
        phone: this.Infomessage.numero,
        from_email: this.Infomessage.email,
        message: this.Infomessage.message,
    });
    alert('Message envoyé')
  }
}
