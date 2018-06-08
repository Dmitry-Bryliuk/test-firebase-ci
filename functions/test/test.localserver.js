/*const FirebaseServer = require('firebase-server');

new FirebaseServer(5000, 'localhost', {
    states: {
        CA: 'California',
        AL: 'Alabama',
        KY: 'Kentucky'
    }
});*/

//const firebase = require('firebase');
const firebase = require('firebase/app');
require('firebase/database');
//require('firebase/firestore');

const app = firebase.initializeApp({
    databaseURL: `ws://localhost:5555`,
});

app.database().ref().on('value', (snap) => {
    console.log('Got value: ', snap.val());
});

// no firestore support
/*app.firestore().collection('users').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
        return;
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });*/
