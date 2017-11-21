initializeFirebase();
initAuthentication();

//window.onscroll = function() {scrollFunction()};


$(document).ready(function() {

  parallaxLatest();
  $('.parallax').parallax();

  /*
  //Check to see if the window is top if not then display button
  $(window).scroll(function(){
  if ($(this).scrollTop() > 100) {
  $('.scrollToTop').fadeIn();
} else {
$('.scrollToTop').fadeOut();
}
});

//Click event to scroll to top
$('.scrollToTop').click(function(){
$('html, body').animate({scrollTop : 0},800);
return false;
});
*/

});

function parallaxLatest() {

  const dbRefObject  = firebase.database().ref('/movies/latest');

  //dbRefObject.on('value', snap => console.log(Object.values(snap.val())));
  dbRefObject.on('value', snap => {

    createParallaxes(snap);
    $('.parallax').parallax();

    /*
    for (var snaps in snap.val()) {
    //console.log(Object.values(snap.val()));
    addMarker(snaps.lat, snaps.long, snaps.name);
  }
  */

});

}

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

function createParallaxes(snap) {

  const grid = document.getElementById("parallaxes");

  snap.forEach(function(snaps) {

    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("id", snaps.val().id);
    //mainDiv.setAttribute("class", "col s12 m12 l12")

    var parallax_container = document.createElement("div");
    parallax_container.setAttribute("class", "parallax-container");

    var parallax = document.createElement("div");
    parallax.setAttribute("class", "parallax")

    var img = document.createElement("img");
    img.setAttribute("src", ("https://image.tmdb.org/t/p/w1000" + snaps.val().backdrop_path));

    var whiteSection = document.createElement("div");
    whiteSection.setAttribute("class", "section");
    whiteSection.setAttribute("style", "background-color:black;")

    var row = document.createElement("div");
    row.setAttribute("class", "row container");

    var h2 = document.createElement("h2");
    h2.setAttribute("class", "header white-text");
    h2.appendChild(document.createTextNode(snaps.val().title));

    var col = document.createElement("div");
    col.setAttribute("class", "col s8 m9 l10")

    var p = document.createElement("p");
    p.setAttribute("class", "white-text");
    p.appendChild(document.createTextNode(snaps.val().overview));

    var a = document.createElement("a");
    a.setAttribute("href", ("https://www.themoviedb.org/movie/" + String(snaps.val().id)));
    a.appendChild(document.createTextNode("https://www.themoviedb.org/movie/" + String(snaps.val().id)));

    parallax.appendChild(img);

    parallax_container.appendChild(parallax);

    whiteSection.appendChild(row);

    row.appendChild(h2);

    col.appendChild(p);
    col.appendChild(a);

    row.appendChild(col);

    mainDiv.appendChild(parallax_container);
    mainDiv.appendChild(whiteSection);

    grid.appendChild(mainDiv);

  });

  $("#preloader").remove();

}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("topBtn").style.display = "block";
  } else {
    document.getElementById("topBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
