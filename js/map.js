var map;
var actual_JSON;

var markers = [];

function myMap() {

  var mapOptions = {
    center: new google.maps.LatLng(-31.421632,-64.186935),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

}

function addMarkersFromList(LatLngList) {

  for (var i = 0; i < LatLngList.length; i++) {

    addMarker(LatLngList[i][0], LatLngList[i][1]);

  }

}

function addMarker(title, Lat, Lng, desc="", link="#") {

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
/*
function loadJSON(callback) {

var xobj = new XMLHttpRequest();
xobj.overrideMimeType("application/json");
xobj.open('GET', 'json/scrappedData.json', true); // Replace 'my_data' with the path to your file
xobj.onreadystatechange = function () {
if (xobj.readyState == 4 && xobj.status == "200") {
// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
callback(xobj.responseText);
}
};
xobj.send(null);
}

function init() {
loadJSON(function(response) {
// Parse JSON string into object
actual_JSON = JSON.parse(response);
console.log(actual_JSON);
});
}
*/

function createShowtime() {

  var cinema = {};

}
