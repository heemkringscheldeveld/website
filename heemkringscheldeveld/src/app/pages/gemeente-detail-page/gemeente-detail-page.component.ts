import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city';
import cities from '../../../assets/data.json';

@Component({
  selector: 'app-gemeente-detail-page',
  templateUrl: './gemeente-detail-page.component.html',
  styleUrls: ['./gemeente-detail-page.component.scss']
})
export class GemeenteDetailPageComponent implements OnInit, OnDestroy {

  private routeSubscription: Subscription;
  public page: string;
  public cities: City[] = cities;

  public get city(): City {
    return this.cities.find(x => x.key == this.page);
  }
  public get general(): City {
    return this.cities.find(x => x.key == 'general');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.page = params['name'];
      if (!this.city) this.router.navigate(['404']);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
