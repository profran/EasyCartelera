$.get("../html-elements/nav-bar.html", function (data) {

  $(document.body).prepend(data);
  $('.sidenav').sidenav();
  //buildSideNav();

});

function buildSideNav() {

  var nav_bar = document.getElementById("nav-bar-container");

  var ul = document.createElement("ul");
  ul.setAttribute("class", "sidenav");
  ul.setAttribute("id", "mobile-demo");

  var li_user_view = document.createElement("li");

  var div_user_view = document.createElement("div");
  div_user_view.setAttribute("class", "user-view");

  var div_background = document.createElement("div");
  div_background.setAttribute("class", "background");

  var img_background = document.createElement("img");
  img_background.setAttribute("src", "../media/office.jpg");

  var a_user = document.createElement("a");
  a_user.setAttribute("href", "account.html");

  var img_user = document.createElement("img");
  img_user.setAttribute("class", "circle");
  img_user.setAttribute("id", "side-nav-user-img");
  img_user.setAttribute("src", "../media/icons/account.png");

  var a_name = document.createElement("a");

  var span_name = document.createElement("span");
  span_name.setAttribute("class", "white-text name");
  span_name.setAttribute("id", "side-nav-user-name");
  span_name.appendChild(document.createTextNode("Guest user"));

  var a_email = document.createElement("a");

  var span_email = document.createElement("span");
  span_email.setAttribute("class", "white-text email");
  span_email.setAttribute("id", "side-nav-user-email");
  span_email.appendChild(document.createTextNode("Log in for more features"));

  div_user_view.appendChild(div_background);
  div_background.appendChild(img_background);
  div_user_view.appendChild(a_user);
  div_user_view.appendChild(a_name);
  div_user_view.appendChild(a_email);
  a_user.appendChild(img_user);
  a_name.appendChild(span_name);
  a_email.appendChild(span_email);
  ul.appendChild(li_user_view);
  li_user_view.appendChild(div_user_view);

  nav_bar.appendChild(ul);

  //$(".button-collapse").sidenav();
  $('.sidenav').sidenav();

}

function updateSideNav(user) {

  var img_user = document.getElementById("side-nav-user-img");
  img_user.setAttribute("src", user.photoURL);

  var span_name = document.getElementById("side-nav-user-name");

  while (span_name.firstChild) {
    span_name.removeChild(span_name.firstChild);
  }

  span_name.appendChild(document.createTextNode(user.displayName));

  var span_email = document.getElementById("side-nav-user-email");

  while (span_email.firstChild) {
    span_email.removeChild(span_email.firstChild);
  }

  span_email.appendChild(document.createTextNode(user.email));

}

function defaultSideNav() {

  var img_user = document.getElementById("side-nav-user-img");
  img_user.setAttribute("src", "../media/icons/account.png");

  var span_name = document.getElementById("side-nav-user-name");

  while (span_name.firstChild) {
    span_name.removeChild(span_name.firstChild);
  }

  span_name.appendChild(document.createTextNode("Guest User"));

  var span_email = document.getElementById("side-nav-user-email");

  while (span_email.firstChild) {
    span_email.removeChild(span_email.firstChild);
  }

  span_email.appendChild(document.createTextNode("Log in for more features"));

}
