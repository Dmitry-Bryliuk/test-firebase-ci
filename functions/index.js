const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// https://us-central1-test-ci-b56e8.cloudfunctions.net/addMessage

exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({ original: original }).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        return res.redirect(303, snapshot.ref.toString());
    });
});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const original = snapshot.val();
        console.log('Uppercasing', context.params.pushId, original);
        const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return snapshot.ref.parent.child('uppercase').set(uppercase);
    });

// https://us-central1-test-ci-b56e8.cloudfunctions.net/addData

exports.addData = functions.https.onRequest((req, res) => {
    const original = req.query.text;

    var db = admin.firestore();

    var docRef = db.collection('users').doc('alovelace2');

    var setAda = docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });

    var aTuringRef = db.collection('users').doc('aturing2');

    var setAlan = aTuringRef.set({
        'first': 'Alan',
        'middle': 'Mathison',
        'last': 'Turing',
        'born': 1912
    });

    return "OK";
});
