function addMarkers() {

	var map = document.getElementById("map");
	
	var marker = new google.maps.Marker({
    	position: new google.maps.LatLng(-31.421632,-64.186935),
    	map: map,
    	dragable: true,
    	title: 'Hello World!'
  	});
	
}
/*

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

var niceList = artoo.scrape('#body > center > table > tbody > tr > td > ul > li', {
  url: {
    sel: 'a',
    attr: 'href'
  },
  title: {
    sel: 'a',
    method: 'text'
  }
});
*/