import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageBaseComponent } from './components/page-base/page-base.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkerPageComponent } from './pages/worker-page/worker-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ActivitiesPageComponent } from './pages/activities-page/activities-page.component';
import { GemeenteDetailPageComponent } from './pages/gemeente-detail-page/gemeente-detail-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MapComponent } from './components/map/map.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ThankYouPageComponent } from './pages/thank-you-page/thank-you-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageBaseComponent,
    WorkerPageComponent,
    NavigationComponent,
    FooterComponent,
    ContactPageComponent,
    ActivitiesPageComponent,
    GemeenteDetailPageComponent,
    NotFoundPageComponent,
    MapComponent,
    AboutPageComponent,
    ThankYouPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,

    NgbModule
  ],
  providers: [FormBuilder, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
