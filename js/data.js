firebase.initializeApp({
    apiKey: "AIzaSyA_KbKju_pF8fEpnCjdYLj3QLy5k3TOZjE",
    authDomain: "hackathonlaboratoria-d3894.firebaseapp.com",
    projectId: "hackathonlaboratoria-d3894"
});
// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
    .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
        console.error("Error adding document: ", error);
    });

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});