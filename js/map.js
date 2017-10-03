var map
var actual_JSON

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

function addMarker(Lat, Lng) {

	var marker = new google.maps.Marker({
    	position: new google.maps.LatLng(Lat,Lng),
    	map: map,
    	title: 'Hello World!'
  	});

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
