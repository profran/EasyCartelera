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

function mygoogle() {

  signOut();

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    Materialize.toast('Signed in succesfully!', 2000, 'rounded');

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

function register() {

  $("#div_main_info").load("/html-elements/register.html");

}

function registerEmailPassword() {

  var email = document.getElementById("input_email").value;
  var password = document.getElementById("input_password").value;
  var repeat_password = document.getElementById("input_repeat_password").value;
  var error = false;

  if (password == repeat_password) {

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...

      console.error(errorCode, errorMessage);

      error = true;

      M.toast({html: 'There was an error while creating your account... (Already registered?)', classes: 'rounded'});

    });

  }

}

function writeUserData(userId, name, surname="Not specified", age="Not specified", gender="Not specified", phone="Not specified", country="Not specified", province="Not specified", street="Not specified", number="Not specified", likings="Not specified", photo="Not specified") {
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

function getDataAndSaveUserData() {

  var name = document.getElementById("input_name").value;
  var surname = document.getElementById("input_surname").value;
  var age = document.getElementById("input_age").value;
  var gender = document.getElementById("input_gender").value;
  var phone = document.getElementById("input_phone").value;
  var country = document.getElementById("input_country").value;
  var province = document.getElementById("input_province").value;
  var street = document.getElementById("input_street").value;
  var number = document.getElementById("input_number").value;
  var likings = document.getElementById("input_liking").value;

  writeUserData(firebase.auth().currentUser.uid, name, surname, age, gender, phone, country, province, street, number, likings, firebase.auth().currentUser.photoURL);

}

function createUser() {

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

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
    M.toast({html: 'Signed out succesfully!', classes: 'rounded'});

  }).catch(function(error) {
    // An error happened.
  });

}

function initSpecialAuthentication() {

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
      //M.toast({'Signed in succesfully!', 2000, 'rounded');
      M.toast({html: "Signed in succesfully!", classes: 'rounded'});
      database();


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

function getAndDisplayData(snap) {

  document.getElementById("input_name").value = snap.val().name;
  document.getElementById("input_surname").value = snap.val().surname;
  document.getElementById("input_age").value = snap.val().age;
  document.getElementById("input_gender").value = snap.val().gender;
  document.getElementById("input_phone").value = snap.val().phone;
  document.getElementById("input_country").value = snap.val().country;
  document.getElementById("input_province").value = snap.val().province;
  document.getElementById("input_street").value = snap.val().street;
  document.getElementById("input_number").value = snap.val().number;
  document.getElementById("input_liking").value = snap.val().likings;

  M.updateTextFields();

}

function database() {

  if (firebase.auth().currentUser != null) {


    var dbRefObject = firebase.database().ref("/users/" + firebase.auth().currentUser.uid);

    dbRefObject.on('value', snap => {

      getAndDisplayData(snap);

    });

    dbRefObject.on('child_added', snap => {

    });

    dbRefObject.on('child_changed', snap => {

    });

    dbRefObject.on('child_removed', snap => {

    });
  }
}

initializeFirebase();
initSpecialAuthentication();
