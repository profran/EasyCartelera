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
	});
}

initializeFirebase();
