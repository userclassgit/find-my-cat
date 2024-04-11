import { listen, select } from './utils.js';
'use strict';

const locateButton = select('.two-buttons button:first-child');
const mapElement = select('.map-element');

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlamFuZHJvcGMwNSIsImEiOiJjbHEzd2ZoYzgwMHM4MnJvaGhoZWFybnpoIn0.27E07iRs7vSpMJ9dA3gmGw';;

const map = new mapboxgl.Map({
  container: mapElement,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [0, 0], //start position
  zoom: 1
});

map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
}));

function placeMarker(location) {
  new mapboxgl.Marker({
    color: '#F5854F'
  })
    .setLngLat(location)
    .addTo(map);
}

function locateUser() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const userLocation = [longitude, latitude];
      map.flyTo({ center: userLocation, zoom: 16 });
      placeMarker(userLocation);
    }, () => {
      console.log('Failed to get user location');
    });
  } else {
    console.log('User browser does not support Geolocation');
  }
}

listen('click', locateButton, locateUser);