// calling functions locally
// https://firebase.google.com/docs/functions/callable

//const functions = require('firebase-functions');
//const admin = require('firebase-admin');

// You'll need to manually require both Firebase and Cloud Functions
const firebase = require("firebase");
// Required for side-effects
require("firebase/functions");
//require("firebase-functions");

//const functions = require('firebase-functions');

// Initialize the client SDK

// Initialize an instance of Cloud Functions
firebase.initializeApp({
    apiKey: "AIzaSyCqZV8RSB6VQoMktdvtebPryYU4k3LKnBA",
    authDomain: "test-ci-b56e8.firebaseapp.com",
    projectId: "test-ci-b56e8",
    databaseURL: "http://localhost:5000"
});

// Initialize Cloud Functions through Firebase
//var functions = firebase.functions();

// Call the function
var addMessage = firebase.functions().httpsCallable('addMessage');
addMessage({ text: messageText }).then(result => {
    // Read result of the Cloud Function.
    //var sanitizedMessage = result.data.text;
    console.log(result);
    return;
}).catch();
