const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addAccount = functions.auth.user().onCreate(event => {
  const user = event.data; // The firebase user
  const id = user.uid;

  try {

    var photoURL = user.photoURL;

  } catch (e) {

    var photoURL = "Not specified";

  } finally {

    var photoURL = "Not specified";

  }

  try {

    const displayName = user.displayName;
    var name = displayName.split(" ")[0];
    var surname = displayName.split(" ")[1];

  } catch (e) {

    var name = "Not specified";
    var surname = "Not specified";

  } finally {

    var name = "Not specified";
    var surname = "Not specified";

  }

  var userData = {
    name: name,
    surname: surname,
    age: "Not specified",
    gender: "Not specified",
    phone: "Not specified",
    country: "Not specified",
    province: "Not specified",
    street: "Not specified",
    number: "Not specified",
    likings: "Not specified",
    profile_picture : photoURL
  };

  return admin.database().ref("/users/" + id).set(userData);

});
