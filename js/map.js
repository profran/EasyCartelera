function myMap() {

    var mapOptions = {
        center: new google.maps.LatLng(-31.421632,-64.186935),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	map
	
	var marker = new google.maps.Marker({
    	position: new google.maps.LatLng(-31.421632,-64.186935),
    	map: map,
    	dragable: true,
    	title: 'Hello World!'
  	});
}