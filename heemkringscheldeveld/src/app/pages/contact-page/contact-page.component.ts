import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isScullyRunning } from '@scullyio/ng-lib';
import { Contact } from 'src/app/models/contact';
import { MailService } from 'src/app/services/mail.service';
import { environment } from 'src/environments/environment';

declare const turnstile: any;

const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
// Keep in sync with EMAIL_PATTERN and the length limits in functions/mail.js.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX_LENGTH = 100;
const MESSAGE_MAX_LENGTH = 10000;
// Rejects whitespace-only input, like the trim() check in functions/mail.js.
const NOT_BLANK = /\S/;
const GENERAL_EMAIL = 'info@heemkringscheldeveld.be';

// Shared across component instances so the script is only added to the page once.
let captchaScriptLoading: Promise<void>;

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('captcha') captchaElement: ElementRef<HTMLElement>;

  public form: FormGroup;
  public captchaToken: string;
  public sending = false;
  public error: string;
  public captchaError = false;
  public readonly nameMaxLength = NAME_MAX_LENGTH;
  public readonly messageMaxLength = MESSAGE_MAX_LENGTH;
  public readonly generalEmail = GENERAL_EMAIL;
  public contacts: Contact[] = [
    { name: "Algemeen", email: GENERAL_EMAIL },
    { name: "Carlos Vermeiren", function: "voorzitter", address: "Kerkdreefken 4 – 9840 Zevergem", phone: "0497 19 70 39", email: "carlos.vermeiren@hotmail.com" },
    { name: "Rudy Pieters", function: "secretaris", address: "Reevijver 36 - 9840 De Pinte", phone: "0473 99 87 90", email: "rudy.pieters@skynet.be" },
    { name: "Johan Van Twembeke", function: "redactie jaarboek", address: "Hugo Verriestlaan 57 - 9840 De Pinte", phone: "09 282 70 42", email: "johan.vantwembeke@skynet.be" }
  ]

  private widgetId: string;
  private destroyed = false;

  constructor(
    private fb: FormBuilder,
    private mail: MailService,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    // Don't bake the captcha into the prerendered static page.
    if (isScullyRunning()) {
      return;
    }
    this.loadCaptchaScript().then(
      () => this.renderCaptcha(),
      () => this.zone.run(() => this.captchaError = true));
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.widgetId && typeof turnstile !== 'undefined') {
      turnstile.remove(this.widgetId);
    }
  }

  public sendMail() {
    if (this.form.invalid || !this.captchaToken || this.sending) {
      return;
    }
    const formValue = this.form.getRawValue();
    this.sending = true;
    this.error = null;
    this.mail.send(formValue.message, formValue.email, formValue.name, this.captchaToken, formValue.hp_field)
      .subscribe(
        () => this.router.navigate(['thank-you']),
        () => {
          this.sending = false;
          this.error = `Het bericht kon niet verstuurd worden. Probeer het later opnieuw of mail naar ${GENERAL_EMAIL}.`;
          this.resetCaptcha();
        });
  }

  private initForm = () => {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      name: ['', [Validators.required, Validators.pattern(NOT_BLANK), Validators.maxLength(NAME_MAX_LENGTH)]],
      message: ['', [Validators.required, Validators.pattern(NOT_BLANK), Validators.maxLength(MESSAGE_MAX_LENGTH)]],
      hp_field: ['']
    })
  }

  private loadCaptchaScript(): Promise<void> {
    if (!captchaScriptLoading) {
      captchaScriptLoading = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = TURNSTILE_SCRIPT_URL;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => {
          // Allow a retry on the next visit to the page.
          script.remove();
          captchaScriptLoading = null;
          reject();
        };
        document.head.appendChild(script);
      });
    }
    return captchaScriptLoading;
  }

  private renderCaptcha() {
    if (this.destroyed || !this.captchaElement) {
      return;
    }
    this.widgetId = turnstile.render(this.captchaElement.nativeElement, {
      sitekey: environment.turnstileSiteKey,
      language: 'nl',
      callback: (token: string) => this.zone.run(() => {
        this.captchaToken = token;
        this.captchaError = false;
      }),
      'expired-callback': () => this.zone.run(() => this.captchaToken = null),
      'error-callback': () => this.zone.run(() => {
        this.captchaToken = null;
        this.captchaError = true;
      })
    });
  }

  private resetCaptcha() {
    this.captchaToken = null;
    if (this.widgetId) {
      turnstile.reset(this.widgetId);
    }
  }
}
