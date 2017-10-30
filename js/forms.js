initializeFirebase();
initAuthentication();

const input_name = document.getElementById("input_name");
const input_desc = document.getElementById("input_desc");
const input_lat = document.getElementById("input_lat");
const input_long = document.getElementById("input_long");
const input_city = document.getElementById("input_city");

const databaseRef = firebase.database();

function pushNewCinema() {

  var name = input_name.value;
  var desc = input_desc.value;
  var lat = input_lat.value;
  var long = input_long.value;
  var city = input_city.value;

  var myRef = databaseRef.ref("/cities/" + city).push();
  var id = myRef.key;

  var newCinema = {"id" : id, "name" : name, "desc" : desc, "lat" : lat, "long" : long, "city" : city};

  myRef.push(newCinema);

  console.log(newCinema + " was pushed");

  input_name.value = "";
  input_desc.value = "";
  input_lat.value = "";
  input_long.value = "";
  input_city.value = "";

}
