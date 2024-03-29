import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { GemeenteDetailPageComponent } from './pages/gemeente-detail-page/gemeente-detail-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ThankYouPageComponent } from './pages/thank-you-page/thank-you-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'gemeente/:name', component: GemeenteDetailPageComponent },
  { path: 'over', component: AboutPageComponent },
  { path: 'thank-you', component: ThankYouPageComponent },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
