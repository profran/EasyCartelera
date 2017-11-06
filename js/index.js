/*
var audio = new Audio('xd.mp3');
audio.play();
*/

initializeFirebase();
initAuthentication();

$(document).ready(function() {

  database();
  $("#preloader").remove();

});

function database() {

  const dbRefObject  = firebase.database().ref('/cities/Cordoba/cinemas');

  //dbRefObject.on('value', snap => console.log(Object.values(snap.val())));
  dbRefObject.on('value', snap => {

    removeMarkers(markers);
    setMarkers(snap);
    setCards(snap);

    /*
    for (var snaps in snap.val()) {
    //console.log(Object.values(snap.val()));
    addMarker(snaps.lat, snaps.long, snaps.name);
  }
  */

});

dbRefObject.on('child_added', snap => {

  removeMarkers(markers);
  setMarkers(snap);

});

dbRefObject.on('child_changed', snap => {

  removeMarkers(markers);
  setMarkers(snap);

});

dbRefObject.on('child_removed', snap => {

  removeMarkers(markers);
  setMarkers(snap);

});

}

function setMarkers(snap) {

  snap.forEach(function(snaps) {
    console.log(snaps);
    addMarker(snaps.val().name, snaps.val().lat, snaps.val().long, (snaps.val().name + ", Rating: " + snaps.val().rating));
  });

}

function removeMarkers(markerList) {
  for (var i = 0; i < markerList.length; i++) {
    markerList[i][0].setMap(null);
  }
  /*
  for (markerList) {

    marker[0].setMap(null);

  }
  */

  markers = [];

}

function setCards(snap) {

  snap.forEach(function(snaps) {
    createVerticalCard(snaps.val().name,snaps.val().desc);
  });

}
