const admin = require('firebase-admin');
const firebasemock = require('firebase-mock');

firebasemock.MockFirebase.override = function () {
    firebase = firebasemock.MockFirebaseSdk();
    Firebase = firebasemock.MockFirebase;
};

firebasemock.MockFirebase.override();

var db = firebase.firestore();

var docRef = db.collection('users').doc('alovelace2');

var setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
});
console.log("setAda");
console.log(setAda);
setAda.then(r => console.log(r)).catch(e => { });

var aTuringRef = db.collection('users').doc('aturing2');

var setAlan = aTuringRef.set({
    'first': 'Alan',
    'middle': 'Mathison',
    'last': 'Turing',
    'born': 1912
});
console.log("setAlan");
console.log(setAlan);
setAlan.then(r => console.log(r)).catch(e => { });


firebase.firestore().collection('users').get()
    .then((snapshot) => {
        console.log("snapshot:");
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
        return;
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
