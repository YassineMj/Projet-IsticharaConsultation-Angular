import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact-utilisateur',
  templateUrl: './contact-utilisateur.component.html',
  styleUrls: ['./contact-utilisateur.component.css'],
})
export class ContactUtilisateurComponent {
  Infomessage = {
    nom: '',
    email: '',
    numero: '',
    message: '',
  };

  champNomVide: boolean = false;
  champEmailVide: boolean = false;
  champNumeroVide: boolean = false;
  champMessageVide: boolean = false;
  emailInvalid: boolean = false;
  phoneInvalid: boolean = false;
  nomInvalid: boolean = false;

  validateEmail() {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    this.emailInvalid = !emailRegex.test(this.Infomessage.email.trim());
  }

  validateNom() {
    const nomRegex = /^[a-zA-Z]{4,20}$/;
this.nomInvalid=!nomRegex.test(this.Infomessage.nom.trim()) ;
  }


  sendMessage() {
    // Valider chaque champ
  this.validateNom();
  this.validateEmail();

    
      this.champNomVide = this.Infomessage.nom === '';
      this.champEmailVide = this.Infomessage.email === '';
      this.champNumeroVide = this.Infomessage.numero === '';
      this.champMessageVide = this.Infomessage.message === '';

      if (
        this.champNomVide ||
        this.champEmailVide ||
        this.champNumeroVide ||
        this.champMessageVide ||
        this.nomInvalid ||
        this.emailInvalid 
      ) {
        alert('invalid input');

      }

    emailjs.init('SImaQ8yDhw9OISC5K');
    emailjs.send('service_sdr8i2y', 'template_4lchlpc', {
      phone: this.Infomessage.numero,
      from_email: this.Infomessage.email,
      message: this.Infomessage.message,
      
    });

    alert('Message envoyé');
    // Réinitialiser les valeurs des champs après l'envoi
    this.Infomessage.nom = '';
    this.Infomessage.email = '';
    this.Infomessage.numero = '';
    this.Infomessage.message = '';
  }
}
