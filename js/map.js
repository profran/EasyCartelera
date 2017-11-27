var map;
var actual_JSON;

var markers = [];

function myMap() {

  var mapOptions = {
    center: new google.maps.LatLng(-31.421632,-64.186935),
    zoom: 12,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'hybrid', 'terrain',
      'styled_map']
    }
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

}

function addMarkersFromList(LatLngList) {

  for (var i = 0; i < LatLngList.length; i++) {

    addMarker(LatLngList[i][0], LatLngList[i][1]);

  }

}

function addMarker(title, Lat, Lng, desc="", link="#") {

  console.log("mapa");

  var contentString = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h5 id="firstHeading" class="firstHeading">'+ title +'</h6>'+
  '<div id="bodyContent">'+
  '<p>' + desc + '</p>'+
  '<a href="' + link + '">'+
  'Link to site</a> '+
  '</div>'+
  '</div>';


  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(Lat,Lng),
    title: title,
    clickable: true,
  });

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  markers.push([marker, infowindow]);

}
