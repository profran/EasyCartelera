$(document).ready(function() {

  $.get("../html-elements/nav-bar.html", function (data) {

    $(document.body).prepend(data);

  });

});
