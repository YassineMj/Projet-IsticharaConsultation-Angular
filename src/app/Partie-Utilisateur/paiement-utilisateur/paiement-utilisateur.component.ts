import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaiementService } from '../Services/paiement.service';
import Stripe from 'stripe';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-paiement-utilisateur',
  templateUrl: './paiement-utilisateur.component.html',
  styleUrls: ['./paiement-utilisateur.component.css'],
})
export class PaiementUtilisateurComponent implements OnInit {

  constructor(
    private router: Router,
    public _serviceClientPaiement: PaiementService,
  ) { }
  
    @ViewChild('receiptSection') receiptSection!: ElementRef;

  ngOnInit(): void {
    if (this._serviceClientPaiement.infoClientPaiement.nomClient == '') {
      this.router.navigate(['/utilisateur/recherche-utilisateur']);
    }
  }

  buttonDisabled: boolean = false;
  numeroVide: boolean = false;
  moisVide: boolean = false;
  anneeVide: boolean = false;
  cvcVide: boolean = false;
  invalidNumero: boolean = false;
  invalidCvc: boolean = false;
  conditionsAccepted = false;

 downloadReceiptAsPDF() {
    const doc = new jsPDF();

    // Use html2canvas to capture the content of the receiptSection element
    html2canvas(this.receiptSection.nativeElement).then((canvas) => {
      // Convert the captured content to a base64 image data URL
      const imgData = canvas.toDataURL('image/png');

      // Add image to the PDF document
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Save the PDF with name 'receipt.pdf'
      doc.save('Reçu-paiement.pdf');
      this.resetForm();
      this.router.navigate(['/utilisateur/accueil-utilisateur']);


    });
  }

  invalid() {
    const numeroRegex = /^\d{16,17}$/;
    this.invalidNumero = !numeroRegex.test(
      this._serviceClientPaiement.infoClientPaiement.numCard
    );
  }

  invalidC() {
    const cvcRegex = /^\d{3,4}$/;
    this.invalidCvc = !cvcRegex.test(
      this._serviceClientPaiement.infoClientPaiement.cvc
    );
  }

  /*
  validateinfos() {

    this.numeroVide =
      this._serviceClientPaiement.infoClientPaiement.numCard === '';
    this.cvcVide = this._serviceClientPaiement.infoClientPaiement.cvc === '';
    this.moisVide = this._serviceClientPaiement.infoClientPaiement.dateExpMois === '';
    this.anneeVide = this._serviceClientPaiement.infoClientPaiement.dateExpAnne === '';

    if (
      this.numeroVide ||
      this.cvcVide ||
      this.invalidNumero ||
      this.invalidCvc ||
      this.moisVide||this.anneeVide
    ) {
      return;
    } else {
       if (this.conditionsAccepted) {
         alert("paiement validé")
       } else {
         alert('veuillez accpeter les conditions');
       }
    }
  } */

  ouvrirNouvelOnglet() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/paiement-conditions'])
    );
    window.open(url, '_blank');
  }

  stripe = new Stripe(
    'sk_test_51OyypLAfJRZNY57iG5692KP0pf71AvYcyQRjEOzJCQTbkwyFPop01V3DPbBdTzz4JGVzUHgu7kRIUsUhiOIzClNa007kAcWtMi'
  );
  token: string = '';

  annuler() {
    this._serviceClientPaiement.infoClientPaiement = {
      idClient: '',
      idPlan: 0,
      nomClient: '',
      emailClient: '',
      paysClient: '',
      villeClient: '',
      codePostaleClient: '',
      provinceClient: '',
      telephoneClient: '',
      adresseClient: '',
      nomConsultant: '',
      prenomConsultant: '',
      prixConsultation: 0,
      jourDebut: '',
      dateJourDebut: '',
      heureDebut: '',
      heureFin: '',
      anglais: 'false',
      arabe: 'false',
      espagnol: 'false',
      francais: 'false',
      duree: 0,
      fraisService: 0,
      total: 0,
      descriptionClient: '',
      numCard: '',
      dateExpMois: '',
      dateExpAnne: '',
      cvc: '',
      idCard: '',
      idConsultant: 0,
    };
    this.router.navigate(['/utilisateur/recherche-utilisateur']);
  }

  showSuccessMessage = false;
  showReceipt: boolean = false; // Control the visibility of the receipt summary

  showSuccess() {
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 5000); // Hide the message after 5 seconds
  }

  hideSuccessMessage() {
    this.showSuccessMessage = false;
  }
loading = false; // Initialize as false

  async paiement() {
    this.buttonDisabled = true;
    this.loading = true; // Show loading spinner

    // Perform validations
    this.invalid();
    this.invalidC();
    this.numeroVide = this._serviceClientPaiement.infoClientPaiement.numCard === '';
    this.cvcVide = this._serviceClientPaiement.infoClientPaiement.cvc === '';
    this.moisVide = this._serviceClientPaiement.infoClientPaiement.dateExpMois === '';
    this.anneeVide = this._serviceClientPaiement.infoClientPaiement.dateExpAnne === '';

    if (this.numeroVide || this.cvcVide || this.moisVide || this.anneeVide || this.invalidNumero || this.invalidCvc) {
      this.loading = false;
      this.buttonDisabled = false;
      return;
    }

    if (!this.conditionsAccepted) {
      alert('Veuillez accepter les conditions');
      this.loading = false;
      this.buttonDisabled = false;
      return;
    }

    try {
      const customer = await this.createCustomer();
      this._serviceClientPaiement.infoClientPaiement.idClient = customer.id;

      const card = await this.addCardToCustomer(customer.id);
      this._serviceClientPaiement.infoClientPaiement.idCard = card.id;

      const demandeRequest = {
        idClientStripe: this._serviceClientPaiement.infoClientPaiement.idClient,
        idCardStripe: this._serviceClientPaiement.infoClientPaiement.idCard,
        numCard: this._serviceClientPaiement.infoClientPaiement.numCard,
        nomClient: this._serviceClientPaiement.infoClientPaiement.nomClient,
        emailClient: this._serviceClientPaiement.infoClientPaiement.emailClient,
        villeClient: this._serviceClientPaiement.infoClientPaiement.villeClient,
        paysClient: this._serviceClientPaiement.infoClientPaiement.paysClient,
        adresseClient: this._serviceClientPaiement.infoClientPaiement.adresseClient,
        idConsultant: this._serviceClientPaiement.infoClientPaiement.idConsultant,
        idPlan: this._serviceClientPaiement.infoClientPaiement.idPlan,
        prixTotal: this._serviceClientPaiement.infoClientPaiement.total,
        message: this._serviceClientPaiement.infoClientPaiement.descriptionClient,
        telephone: this._serviceClientPaiement.infoClientPaiement.telephoneClient,
      };

      this._serviceClientPaiement.prendreRendezVous(demandeRequest).subscribe(
        (resp) => {
          console.log('Paiement réussi. Affichage du reçu...');
          this.showReceipt = true; // Show receipt summary
          console.log('showReceipt:', this.showReceipt); // Log the state
          this.loading = false; // Hide loading spinner

          setTimeout(() => {
            this.buttonDisabled = false;
          }, 3000);
          
        },
        (error) => {
          console.error("Erreur lors de la prise de rendez-vous:", error);
          this.loading = false; // Hide loading spinner on error
          this.buttonDisabled = false;
        }
      );
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      this.loading = false; // Hide loading spinner on error
      this.buttonDisabled = false;
    }
  }





  resetForm() {
    this._serviceClientPaiement.infoClientPaiement = {
      idClient: '',
      idPlan: 0,
      nomClient: '',
      emailClient: '',
      paysClient: '',
      villeClient: '',
      codePostaleClient: '',
      provinceClient: '',
      telephoneClient: '',
      adresseClient: '',
      nomConsultant: '',
      prenomConsultant: '',
      prixConsultation: 0,
      jourDebut: '',
      dateJourDebut: '',
      heureDebut: '',
      heureFin: '',
      anglais: 'false',
      arabe: 'false',
      espagnol: 'false',
      francais: 'false',
      duree: 0,
      fraisService: 0,
      total: 0,
      descriptionClient: '',
      numCard: '',
      dateExpMois: '',
      dateExpAnne: '',
      cvc: '',
      idCard: '',
      idConsultant: 0,
    };
  }


  async createCustomer() {
    try {
      const customer = await this.stripe.customers.create({
        email: this._serviceClientPaiement.infoClientPaiement.emailClient,
        phone: this._serviceClientPaiement.infoClientPaiement.telephoneClient,
        name: this._serviceClientPaiement.infoClientPaiement.nomClient,
        description:
          this._serviceClientPaiement.infoClientPaiement.descriptionClient,
        address: {
          line1: this._serviceClientPaiement.infoClientPaiement.adresseClient,
          city: this._serviceClientPaiement.infoClientPaiement.villeClient,
          postal_code:
            this._serviceClientPaiement.infoClientPaiement.codePostaleClient,
          country: this._serviceClientPaiement.infoClientPaiement.paysClient,
        },
      });
      console.log('client ajouté:');
      return customer;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la création du client:",
        error
      );
      throw error;
    }
  }
  cardToken: any;

  async addCardToCustomer(customerId: string) {
    try {
      // this.token = this.obtenirTypeDeCarte(
      //   this._serviceClientPaiement.infoClientPaiement.numCard
      //);

      this.cardToken = {
        object: 'card',
        number: this._serviceClientPaiement.infoClientPaiement.numCard,
        exp_month: this._serviceClientPaiement.infoClientPaiement.dateExpMois,
        exp_year: this._serviceClientPaiement.infoClientPaiement.dateExpAnne,
        cvc: this._serviceClientPaiement.infoClientPaiement.cvc,
      };

      const card = await this.stripe.customers.createSource(customerId, {
        source: this.cardToken,
      });
      console.log('Carte ajoutée avec succès:');
      return card;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'ajout de la carte:",
        error
      );
      throw error;
    }
  }

  // obtenirTypeDeCarte(numCarte: string) {
  //   const lastFourDigits = numCarte.slice(-4);

  //   switch (lastFourDigits) {
  //     case '4242':
  //       return 'tok_visa';
  //     case '5556':
  //       return 'tok_visa_debit';
  //     case '4444':
  //       return 'tok_mastercard';
  //     case '8210':
  //       return 'tok_mastercard_debit';
  //     case '5100':
  //       return 'tok_mastercard_prepaid';
  //     case '9424':
  //       return 'tok_discover';
  //     case '0004':
  //       return 'tok_diners';
  //     case '0000':
  //       return 'tok_jcb';
  //     case '0005':
  //       return 'tok_uniopay';
  //     default:
  //       return 'tok_visa';
  //   }
  // }
  
}
