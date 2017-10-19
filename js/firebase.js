function initializeFirebase() {

	var config = {
		apiKey: "AIzaSyAK-3br_mavmuruZrryh-Vidm0PPKqLxbI",
		authDomain: "easycartelera.firebaseapp.com",
		databaseURL: "https://easycartelera.firebaseio.com",
		projectId: "easycartelera",
		storageBucket: "easycartelera.appspot.com",
		messagingSenderId: "703501126646"
	};

	firebase.initializeApp(config);

}

function mygoogle() {

	signOut();

	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...

	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...

		console.log(errorCode);
	});

}

function writeUserData(userId, name, surname, age="Not specified", gender="Not specified", phone="Not specified", country, province, street="Not specified", number="Not specified", likings="Not specified", photo="Not specified") {
	firebase.database().ref("/users/" + userId).set({
		name: name,
		surname: surname,
		age: age,
		gender: gender,
		phone: phone,
		country: country,
		province: province,
		street: street,
		number: number,
		likings: likings,
		profile_picture : photo
	});
}

function createUser() {

	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
	});

}

function getAnalizedData(location) {

	var result;

	function getFirebaseData(endpoint){
		return firebase.database().ref(endpoint).once("value", function(snapshot){
			return snapshot.val();
		});
	}

	Promise.all([getFirebaseData(location)]).then(function(snapshots) {
		result = snapshots[0].gn.it;
	});

	console.log(result);
}

function signIn() {

	signOut();

	var email = document.getElementById("user").value;
	var password = document.getElementById("password").value;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
	});
}

function signOut(argument) {

	firebase.auth().signOut().then(function() {
		// Sign-out successful.
	}).catch(function(error) {
		// An error happened.
	});

}

function initApp() {

	initializeFirebase();

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

			//getAnalizedData("/cities/test");
			/*
			var result = 0;

			function getFirebaseData(endpoint){
			return firebase.database().ref(endpoint).once("value", function(snapshot){
			return snapshot.val();
		});
	}

	function getResult(result) {
	result = result;
}

Promise.all([getFirebaseData("/cities/test")]).then(function(snapshots) {
result = snapshots[0].gn.it;
console.log(result);
});

console.log(result);
*/

//writeUserData(userId, "Francesco", "Silvetti", "17", "Male", "3513476196", "Obispo Moscoso y Peralta", "2971", "Comedy", firebase.auth().currentUser.photoURL);
$("#div_main_info").load("/html-elements/profile.html");

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

	$("#div_main_info").load("/html-elements/sign-in-form.html");

}

});

}

initApp();
