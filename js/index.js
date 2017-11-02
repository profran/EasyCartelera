initializeFirebase();
initAuthentication();
/*
$(document).ready(function() {

  console.log("anda");

  const dbRefObject  = firebase.database().ref('/users/Cordoba');

  // dbRefObject.on('value', snap => console.log(snap.val()));
  dbRefObject.on('value', snap => {

    snap.forEach(function(snaps) {
      console.log(snaps.lat, snaps.long, snaps.name);
      addMarker(snaps.lat, snaps.long, snaps.name);
    })

  });

  dbRefObject.on('child_added', snap => {

  });

  dbRefObject.on('child_changed', snap => {

  });

  dbRefObject.on('child_removed', snap => {

  });

});*/

function database() {

  console.log("anda2");

  const dbRefObject  = firebase.database().ref('/cities/Cordoba');

  //dbRefObject.on('value', snap => console.log(Object.values(snap.val())));
  dbRefObject.on('value', snap => {


    snap.forEach(function(snaps) {
      console.log(snaps.val());
      addMarker(snaps.val().name, snaps.val().lat, snaps.val().long);
    });
    /*
    for (var snaps in snap.val()) {
      //console.log(Object.values(snap.val()));
      addMarker(snaps.lat, snaps.long, snaps.name);
    }
    */

  });

  dbRefObject.on('child_added', snap => {

  });

  dbRefObject.on('child_changed', snap => {

  });

  dbRefObject.on('child_removed', snap => {

  });

}
