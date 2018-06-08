const admin = require('firebase-admin');
const firebasemock = require('firebase-mock');

firebasemock.MockFirebase.override = function () {
    firebase = firebasemock.MockFirebaseSdk();
    Firebase = firebasemock.MockFirebase;
};

firebasemock.MockFirebase.override();

/*var db = firebase.firestore();

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


firebase.firestore().collection('people').add({
    first: 'Michael'
});
firebase.firestore().collection('people').add({
    first: 'Ben'
});

firebase.firestore().collection('people').get()
    .then(snaps => {
        snaps.forEach(doc => {
            console.log(doc.data());
        });
        return;
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });*/

//firebase.firestore().collection('people').flush();


var collection;
var people = {
    collection: function () {
        if (!collection) collection = firebase.firestore().collection('people');
        return collection;
    },
    greet: function (person) {
        console.log('hi ' + person.first);
    },
    process: function () {
        console.log("process people...");
        people.collection().get().then(function (snaps) {
            snaps.forEach(function (doc) {
                people.greet(doc.data());
            });
        });
    }
};

var greeted = [];
people.greet = function (person) {
    greeted.push(person);
};
people.collection().add({
    first: 'Michael'
});
people.collection().add({
    first: 'Ben'
});

people.process();
console.log(greeted);

people.collection().flush();
console.log(greeted);

//console.assert(greeted.length === 2, '2 people greeted');
//console.assert(greeted[0].first === 'Michael', 'Michael greeted');
//console.assert(greeted[1].first === 'Ben', 'Ben greeted');

people.create = function (first) {
    return people.collection().add({
        first: first
    });
};

var newPersonRef = people.create('James');
newPersonRef.then(function (doc) {
    console.assert(doc.get('first') === 'James', 'James was created');
});
people.collection().flush();
