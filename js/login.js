firebase.initializeApp({
  apiKey: "AIzaSyA_KbKju_pF8fEpnCjdYLj3QLy5k3TOZjE",
  authDomain: "hackathonlaboratoria-d3894.firebaseapp.com",
  projectId: "hackathonlaboratoria-d3894"
});

const btnGoogle = document.getElementById('btn-google');
const btnFacebook = document.getElementById('btn-facebook');

const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();


// firebase.auth().signInWithRedirect(provider).then(function(result) {
//   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });
const facebook = () => {
  firebase.auth().signInWithPopup(providerFacebook).then(function(result) {
<<<<<<< HEAD
=======
    console.log(user);
>>>>>>> e9cb773a93a9e1960bd33322abed5c1f2a6286c6
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    location.href = 'views/home.html';
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
};

const google = () => {
  firebase.auth().signInWithPopup(providerGoogle).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    location.href = 'views/home.html';
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

btnFacebook.addEventListener('click', facebook);
btnGoogle.addEventListener('click', google)