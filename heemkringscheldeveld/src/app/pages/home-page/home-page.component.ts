import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { 
  }
  
  ngOnInit(): void {
    this.initMapbox();
  }

  private initMapbox() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFhcnRlbmJyeXNiYWVydCIsImEiOiJja3ViNXFuaTgwbDN3MnVtdnZhZmw4eWtqIn0.R8aDnYay6ff1JhOhVLUZtA';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  }
}
