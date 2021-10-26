import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as sgMail from '@sendgrid/mail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private url: string = "https://api.sendgrid.com/v3/mail/send";
  constructor(private http: HttpClient) { }

  public send(text: string, from: string, name: string) {
    const payload = {
      personalizations: [
        {
          to: [
            {
              email: 'info@heemkringscheldeveld.be'
            }
          ],
          subject: `${name} via website`,
        }
      ],
      from: {
        email: 'info@heemkringscheldeveld.be'
      },
      content: [
        {
          type: "text/plain",
          value: text
        }
      ],
      reply_to: { email: from, name: name }
    }
    // const msg = {
    //   to: 'info@heemkringscheldeveld.be',
    //   from: from,
    //   subject: `${name} via website`,
    //   text: text,
    //   envelope: {
    //     from: `${from} <${from}>`,
    //     to: 'info@heemkringscheldeveld.be'
    //   }
    // };

    return this.http.post(
      this.url,
      payload,
      { headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": `Bearer ${environment.SENDGRID_API_KEY}` }) }
    );
  }

  // constructor() {
  //   sgMail.setApiKey(environment.SENDGRID_API_KEY)
  // }

  // public send(text: string, from: string, name: string) {
  //   const msg = {
  //     to: 'info@heemkringscheldeveld.be',
  //     from: from,
  //     subject: `${name} via website`,
  //     text: text,
  //     envelope: {
  //       from: `${from} <${from}>`,
  //       to: 'info@heemkringscheldeveld.be'
  //     }
  //   };

  //   return sgMail.send(msg);
  // }

  // private nodemailer = require('nodemailer');

  // private transporter = nodemailer.createTransport({
  //   host: 'smtp-auth.mailprotect.be',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: 'info@heemkringscheldeveld.be',
  //     pass: 'Password123'
  //   }
  // });

  // public send(text: string, from: string, name: string, callback: (error, info) => void) {
  //   const mailOptions = {
  //     from: from,
  //     to: 'info@heemkringscheldeveld.be',
  //     subject: `${name} via website`,
  //     text: text,
  //     envelope: {
  //       from: `${from} <${from}>`,
  //       to: 'info@heemkringscheldeveld.be'
  //     }
  //   };

  //   this.transporter.sendMail(mailOptions, callback);

  // this.transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
}
