document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0)
  {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    //var lang = navigator.language;

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?v=3.27&key=AIzaSyDgkuKTvSeDX_MAHKQUon93Jb3_TVjcS5Y&signed_in=true&callback=initMap&language=' + lang;
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});

var map;

function initMap()
{
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: -2000,
    scrollwheel: false,
  });

  fetch('/resource/markers.json')
    .then(function(response){return response.json()})
    .then(plotMarkers);
}

var markers;
var bounds;

function plotMarkers(m)
{
  markers = [];
  bounds = new google.maps.LatLngBounds();

  m.forEach(function (marker) {
    var position = new google.maps.LatLng(marker.lat, marker.lng);

    markers.push(
      new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP
      })
    );

    bounds.extend(position);
  });

  map.fitBounds(bounds);
}
