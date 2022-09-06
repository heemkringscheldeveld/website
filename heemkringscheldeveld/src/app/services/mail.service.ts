import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as sgMail from '@sendgrid/mail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  constructor(private http: HttpClient) { }

  public send(text: string, from: string, name: string) {
    return this.http.post("/.netlify/functions/mail", { text, from, name });
  }
}