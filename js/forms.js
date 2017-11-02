initializeFirebase();
initAuthentication();

const input_name = document.getElementById("input_name");
const input_desc = document.getElementById("input_desc");
const input_direc = document.getElementById("input_direc");
const input_lat = document.getElementById("input_lat");
const input_long = document.getElementById("input_long");
const input_city = document.getElementById("input_city");

const databaseRef = firebase.database();

function pushNewCinema() {

  var name = input_name.value;
  var desc = input_desc.value;
  var direc = input_direc.value;
  var lat = input_lat.value;
  var long = input_long.value;
  var city = input_city.value;

  pushToDatabase(createNewCinema(name, desc, rating, dire, lat, long, city));

  console.log(newCinema + " was pushed");

  input_name.value = "";
  input_desc.value = "";
  input_direc.value = "";
  input_lat.value = "";
  input_long.value = "";
  input_city.value = "";

}

function createNewCinema(name, desc="null", rating=0, direc="", lat="", long="", city="") {

  var newCinema = {"name" : name, "desc" : desc, "rating" : rating, "direc" : direc, "lat" : lat, "long" : long, "city" : city};
  return newCinema;

}

function pushToDatabase(cinema) {

  var myRef = databaseRef.ref("/cities/Cordoba");
  myRef.push(cinema);
  console.log("succesfully pushed " + cinema.name);

}

var map;
var service;
var infowindow;

function initialize(lat=-31.4112551, long=-64.1888339) {
  var location = new google.maps.LatLng(lat,long);
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15
  });

  var request = {
    location: location,
    radius: "50",
    query: "cinema"
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
      pushToDatabase(createNewCinema(place.name, "null", place.rating, place.formatted_address, place.geometry.viewport.f.b, place.geometry.viewport.b.b, "Cordoba"));
    }
  }
}
