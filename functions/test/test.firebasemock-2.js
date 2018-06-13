var firebase_mock = require('firebase-mock');
var firestore = new firebase_mock.MockFirestore();

firestore.collection("users").doc("aaa").set({ name: "aaa" }).then(r => console.log(r));
firestore.collection("users").add({ name: "bbb" }).then(r => console.log(r));
firestore.collection("users").get().then(r => console.log(r));
