import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private hoveredStateId = null;

  constructor() {
  }

  ngOnInit(): void {
    this.initMapbox();
  }

  private initMapbox() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFhcnRlbmJyeXNiYWVydCIsImEiOiJja3ViNXFuaTgwbDN3MnVtdnZhZmw4eWtqIn0.R8aDnYay6ff1JhOhVLUZtA';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/maartenbrysbaert/ckulocs1i0myj17o76jzq5em5',
      center: [3.653177890947404, 50.99346548337044],
      zoom: 10.5
    });

    map.scrollZoom.disable();

    map.on('load', () => {
      map.addSource('states', {
        'type': 'geojson',
        'data': '../../../assets/heemkringscheldeveld.geojson'
      });

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
      map.addLayer({
        'id': 'state-fills',
        'type': 'fill',
        'source': 'states',
        'layout': {},
        'paint': {
          'fill-color': '#80d0a5',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            .8,
            0.5
          ]
        }
      });

      map.addLayer({
        'id': 'state-borders',
        'type': 'line',
        'source': 'states',
        'layout': {},
        'paint': {
          'line-color': '#80d0a5',
          'line-width': 2,
        }
      });

      // When the user moves their mouse over the state-fill layer, we'll update the
      // feature state for the feature under the mouse.
      map.on('mousemove', 'state-fills', (e) => {
        if (e.features.length > 0) {
          if (this.hoveredStateId !== null) {
            map.setFeatureState(
              { source: 'states', id: this.hoveredStateId },
              { hover: false }
            );
          }
          this.hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: 'states', id: this.hoveredStateId },
            { hover: true }
          );
          map.getCanvas().style.cursor = 'pointer';
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.on('mouseleave', 'state-fills', () => {
        if (this.hoveredStateId !== null) {
          map.setFeatureState(
            { source: 'states', id: this.hoveredStateId },
            { hover: false }
          );
          map.getCanvas().style.cursor = 'default';
        }
        this.hoveredStateId = null;
      });

      map.on('click', 'state-fills', e => {
        alert(e.features[0].properties.NAME);
      })
    });
  }
}
