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

function getNewComment(key) {

  const comment_box = document.getElementById("input_comment" + String(key));
  return comment_box.value;

}

function pushNewComment(key) {

  const comment = getNewComment(key);

  if (comment != "") {

    const author = firebase.auth().currentUser;
    firebase.database().ref("users/" + author.uid).once("value", snap => {

      const name =  snap.val().name;
      const surname = snap.val().surname;


      // Get a key for a new Post.
      var newCommentKey = firebase.database().ref().push().key;

      // A post entry.
      var newComment = {
        id: key,
        author: {
          name: name,
          surname: surname,
          authorPic: author.photoURL,
          uid: author.uid
        },
        comment: comment
      };

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['movies/latest/' + key + "/comments/" + newCommentKey] = newComment;

      return firebase.database().ref().update(updates);

    });

  }

}

function displayComments(snap, section) {

  //console.log(snap.val());

  if (snap.val() != null) {

    snap.forEach(function functionName(snaps) {

      console.log(snaps);

      const comment_row = document.createElement("div");
      comment_row.setAttribute("class", "col s12 m8 l8");
      comment_row.setAttribute("id", snaps.val().id);

      const divider = document.createElement("div");
      divider.setAttribute("class", "divider");

      const comment_section = document.createElement("div");
      comment_section.setAttribute("class", "col s12 m8 l8");
      /*
      const author_picture = document.createElement("img");
      author_picture.setAttribute("class", "img-comment");
      author_picture.setAttribute("src", snaps.val().author.authorPic);
      */
      const comment_text = document.createElement("p");
      comment_text.setAttribute("class", "white-text ")
      comment_text.appendChild(document.createTextNode(snaps.val().author.name + " " +snaps.val().author.surname + ": " + snaps.val().comment));

      //comment_section.appendChild(author_picture);
      comment_section.appendChild(comment_text);

      comment_row.appendChild(divider);
      comment_row.appendChild(comment_section);

      section.appendChild(comment_row);

    });

  }

}

function createParallaxes(snap) {

  const grid = document.getElementById("parallaxes");
  $(grid).empty();

  snap.forEach(function(snaps) {

    const mainDiv = document.createElement("div");
    mainDiv.setAttribute("id", snaps.val().id);
    //mainDiv.setAttribute("class", "col s12 m12 l12")

    const parallax_container = document.createElement("div");
    parallax_container.setAttribute("class", "parallax-container");

    const parallax = document.createElement("div");
    parallax.setAttribute("class", "parallax")

    const img = document.createElement("img");
    img.setAttribute("src", ("https://image.tmdb.org/t/p/w1000" + snaps.val().backdrop_path));
    img.setAttribute("class", "responsive-img");

    const whiteSection = document.createElement("div");
    whiteSection.setAttribute("class", "section");
    whiteSection.setAttribute("style", "background-color:black;")

    const row = document.createElement("div");
    row.setAttribute("class", "row container");

    const h2 = document.createElement("h2");
    h2.setAttribute("class", "header white-text");
    h2.appendChild(document.createTextNode(snaps.val().title));

    const col = document.createElement("div");
    col.setAttribute("class", "col s8 m9 l10")

    const p = document.createElement("p");
    p.setAttribute("class", "white-text");
    p.appendChild(document.createTextNode(snaps.val().overview));

    const a = document.createElement("a");
    a.setAttribute("href", ("https://www.themoviedb.org/movie/" + String(snaps.val().id)));
    a.appendChild(document.createTextNode("https://www.themoviedb.org/movie/" + String(snaps.val().id)));

    const comments = document.createElement("div");
    comments.setAttribute("class", "row");

    const comment_box = document.createElement("div");
    comments.setAttribute("class", "row");

    const input_field = document.createElement("div");
    input_field.setAttribute("class", "input-field col s8 m7 l6");

    const input =  document.createElement("input");
    input.setAttribute("id", ("input_comment" + snaps.val().key));
    input.setAttribute("type", "text");
    input.setAttribute("class", "validate white-text");

    const push_button =  document.createElement("a");
    push_button.setAttribute("class", "waves-effect waves-light btn");
    push_button.setAttribute("onclick", ("pushNewComment('" + snaps.val().key + "');"));
    push_button.appendChild(document.createTextNode("comment"));

    comment_box.appendChild(input_field);

    comment_box.appendChild(push_button);

    input_field.appendChild(input);

    parallax.appendChild(img);

    parallax_container.appendChild(parallax);

    whiteSection.appendChild(row);
    whiteSection.appendChild(comments);
    whiteSection.appendChild(comment_box);

    row.appendChild(h2);

    col.appendChild(p);
    col.appendChild(a);

    row.appendChild(col);

    mainDiv.appendChild(parallax_container);
    mainDiv.appendChild(whiteSection);

    grid.appendChild(mainDiv);

    firebase.database().ref("movies/latest/" + snaps.val().key + "/comments").on("value", snapComment => {
      $(comments).empty();
      displayComments(snapComment, comments);
    })

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
