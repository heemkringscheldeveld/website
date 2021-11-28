import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private hoveredStateId = null;

  private markers = [
    { title: "De Pinte", lat: 3.6506400381204003, lng: 50.99312900139441 },
    { title: "Nazareth", lat: 3.595351587861103, lng: 50.95894464646918 },
    { title: "Deurle", lat: 3.6098534764536225, lng: 51.0006016923999 },
    { title: "Sint-Martens-Latem", lat: 3.632059493360572, lng: 51.0157145253028 },
    { title: "Zevergem", lat: 3.685535207546934, lng: 50.9783512081446 },
    { title: "Zwijnaarde", lat: 3.704115752306734, lng: 51.00430906945468 },
    { title: "Afsnee",lat: 3.657437798398405, lng: 51.03281745053306 },
    { title: "Eke", lat: 3.6497336700839185, lng: 50.96208449293681 },
    { title: "Sint-Denijs-Westrem", lat: 3.675565159139353, lng: 51.020846065420955 }
  ]

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.initMapbox();
    console.log('init');
  }

  private initMapbox() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFhcnRlbmJyeXNiYWVydCIsImEiOiJja3ViNXFuaTgwbDN3MnVtdnZhZmw4eWtqIn0.R8aDnYay6ff1JhOhVLUZtA';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/maartenbrysbaert/ckulocs1i0myj17o76jzq5em5',
      center: [3.653177890947404, 50.99346548337044],
      zoom: 10.6,
      interactive: false
    });

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
            .7,
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

      // const marker = new mapboxgl.Marker();

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
          // marker.setLngLat([e.lngLat.lng, e.lngLat.lat])
          //   .addTo(map);
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
        // marker.remove(map);
      });

      map.on('click', 'state-fills', e => {
        console.log(e.lngLat.lng, e.lngLat.lat);
        map.flyTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          zoom: 11.5
        });

        const router = this.router;
        const path = e.features[0].properties.path;
        router.navigate(['gemeente', path]);
        // setTimeout(() => router.navigate([path]), 500);
      });

      const test = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.markers.map(marker => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [marker.lat, marker.lng]
            },
            properties: {
              title: marker.title
            }
          }))
        }
      };

      map.addSource('points', test);
      // Add a symbol layer
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          'icon-image': 'custom-marker',
          // get the title name from the source's "title" property
          'text-field': ['get', 'title'],
          'text-font': [
            'Open Sans Semibold',
            'Arial Unicode MS Bold'
          ],
          'text-offset': [0, 0],
          'text-anchor': 'center',
          'text-size': 11
        }
      });
    });
  }
}
