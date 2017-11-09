var config = {
	apiKey: "AIzaSyAK-3br_mavmuruZrryh-Vidm0PPKqLxbI",
	authDomain: "easycartelera.firebaseapp.com",
	databaseURL: "https://easycartelera.firebaseio.com",
	projectId: "easycartelera",
	storageBucket: "easycartelera.appspot.com",
	messagingSenderId: "703501126646"
};

function signOut(argument) {

	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		Materialize.toast('Signed out succesfully!', 2000, 'rounded');

	}).catch(function(error) {
		// An error happened.
	});

}

function initializeFirebase() {

	firebase.initializeApp(config);

}

function initAuthentication() {

	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			console.log("Signed in user(email): " + email);
			console.log("Signed in user(photoURL): " + photoURL);
			// ...

			if (photoURL != null) {

				var myNode = document.getElementById("li_account");
				myNode.setAttribute("style", "max-height: 64px");

				while (myNode.firstChild) {
					myNode.removeChild(myNode.firstChild);
				}

				var a = document.createElement("a");
				a.setAttribute("href", "account.html");
				a.setAttribute("style", "max-height: 64px");

				var img = document.createElement("img");
				img.setAttribute("class", "img-circle");
				img.setAttribute("src", photoURL);

				a.appendChild(img);
				myNode.appendChild(a);

				console.log("photo change successful");
				sideNav(firebase.auth().currentUser);
				$(".button-collapse").sideNav();

			} else {

				var myNode = document.getElementById("li_account");

				while (myNode.firstChild) {
					myNode.removeChild(myNode.firstChild);
				}

				var a = document.createElement("a");
				a.setAttribute("href", "account.html");

				var i = document.createElement("i");
				i.setAttribute("class", "material-icons icon-white");
				i.setAttribute("style", "font-size: 40px");
				i.appendChild(document.createTextNode("account_circle"));

				a.appendChild(i);
				myNode.appendChild(a);

				console.log("original icon successful");

			}

		} else {

			var myNode = document.getElementById("li_account");

			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}

			var a = document.createElement("a");
			a.setAttribute("href", "account.html");

			var i = document.createElement("i");
			i.setAttribute("class", "material-icons icon-white");
			i.setAttribute("style", "font-size: 40px");
			i.appendChild(document.createTextNode("account_circle"));

			a.appendChild(i);
			myNode.appendChild(a);

			console.log("signed out");
		}

	});

}

function sideNav(user) {

	var nav_bar = document.getElementById("nav-bar");

	var ul = document.createElement("ul");
	ul.setAttribute("class", "side-nav");
	ul.setAttribute("id", "mobile-demo");

	var li_user_view = document.createElement("li");

	var div_user_view = document.createElement("div");
	div_user_view.setAttribute("class", "user-view");

	var div_background = document.createElement("div");
	div_background.setAttribute("class", "background");

	var img_background = document.createElement("img");
	img_background.setAttribute("src", "media/office.jpg");

	var a_user = document.createElement("a");
	a_user.setAttribute("href", "account.html");

	var img_user = document.createElement("img");
	img_user.setAttribute("class", "circle");
	img_user.setAttribute("src", user.photoURL);

	var a_name = document.createElement("a");

	var span_name = document.createElement("span");
	span_name.setAttribute("class", "white-text name");
	span_name.appendChild(document.createTextNode(user.displayName));

	var a_email = document.createElement("a");

	var span_email = document.createElement("span");
	span_email.setAttribute("class", "white-text email");
	span_email.appendChild(document.createTextNode(user.email));

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

}
