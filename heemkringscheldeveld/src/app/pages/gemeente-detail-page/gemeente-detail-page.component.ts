import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gemeente-detail-page',
  templateUrl: './gemeente-detail-page.component.html',
  styleUrls: ['./gemeente-detail-page.component.scss']
})
export class GemeenteDetailPageComponent implements OnInit, OnDestroy {
  
  private routeSubscription: Subscription;
  public page: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => this.page = params['name']);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
