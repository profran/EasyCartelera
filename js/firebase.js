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
