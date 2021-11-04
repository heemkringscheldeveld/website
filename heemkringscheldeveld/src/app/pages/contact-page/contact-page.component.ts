import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  public form: FormGroup;
  public contacts: Contact[] = [
    { name: "Algemeen", email: "info@heemkringscheldeveld.be" },
    { name: "Carlos Vermeiren", function: "voorzitter", address: "Kerkdreefken 4 – 9840 Zevergem", phone: "0497 19 70 39", email: "carlos.vermeiren@hotmail.com" },
    { name: "Rudy Pieters", function: "secretaris", address: "Reevijver 36 - 9840 De Pinte", phone: "0473 99 87 90", email: "rudy.pieters@skynet.be" },
    { name: "Johan Van Twembeke", function: "redactie jaarboek", address: "Hugo Verriestlaan 57 - 9840 De Pinte", phone: "09 282 70 42", email: "johan.vantwembeke@skynet.be" }
  ]

  constructor(
    private fb: FormBuilder,
    // private mail: MailService,
    // private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // public sendMail() {
  //   const formValue = this.form.getRawValue();
  //   console.log("mail sent!");
  //   this.router.navigate(['thank-you']);
  //   // this.mail.send(formValue.message, formValue.email, formValue.name)
  //   //   .subscribe(() => console.log('Mail sent!'), error => console.log('Failed to send mail.'));
  // }

  private initForm = () => {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      message: ['', Validators.required]
    })
  }
}
