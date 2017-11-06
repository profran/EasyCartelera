$('.parallax').parallax();

initializeFirebase();
initAuthentication();

$(document).ready(function() {

  $('.parallax').parallax();

});

function movies() {

  const dbRefObject  = firebase.database().ref('/movies');

  //dbRefObject.on('value', snap => console.log(Object.values(snap.val())));
  dbRefObject.on('value', snap => {

    setBanner(snap);

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

function setBanner(snap) {

  var mainGrid = document.getElementById("div_main_grid");

  var mainCarousel = document.createElement("div");
  mainCarousel.setAttribute("class", "col s12 m12 l12");
  mainCarousel.setAttribute("id", "div_main_carousel");

  /*
  var carouselSlider = document.createElement("div");
  carouselSlider.setAttribute("class", "carousel carousel-slider center");
  carouselSlider.setAttribute("data-indicators", "true");
  */
  //mainCarousel.appendChild(carouselSlider);

  snap.forEach(function(snaps) {
    console.log(snaps);
    var carouselElement = document.createElement("div");
    carouselElement.setAttribute("class", "carousel-item");
    /*
    var carouselElementTitle = document.createElement("h2");
    carouselElementTitle.appendChild(document.createTextNode(snaps.val().name));
    */
    var carouselElementImage = document.createElement("img");
    carouselElementImage.setAttribute("src", snaps.val().image);
    carouselElementImage.setAttribute("style", "height:100%; width:100%");


    //carouselElement.appendChild(carouselElementTitle);
    carouselElement.appendChild(carouselElementImage);

    mainCarousel.appendChild(carouselElement);

  });

  mainGrid.appendChild(mainCarousel);

  $(mainCarousel).carousel({fullWidth : true});

}
