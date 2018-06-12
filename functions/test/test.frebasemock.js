//const admin = require('firebase-admin');
const firebasemock = require('firebase-mock');

//firebasemock.MockFirebase.override = function () {
firebase = firebasemock.MockFirebaseSdk();
Firebase = firebasemock.MockFirebase;
//};

//firebasemock.MockFirebase.override();

window = {};
window.firebasemock = firebasemock;
window.MockFirebase = window.firebasemock.MockFirebase;
window.MockFirebaseSdk = window.firebasemock.MockFirebaseSdk;
window.firebase = firebase;//window.firebasemock.MockFirebaseSdk();
window.Firebase = Firebase;//window.firebasemock.MockFirebase;


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

setImmediate(() => console.log("setImmediate"));
setTimeout(() => console.log("setTimeout"), 0);
setTimeout(() => console.log("setTimeout1000"), 1000);
process.nextTick(console.log, "process.nextTick");

var promise1 = new Promise(function (resolve, reject) { setTimeout(resolve, 100, 'foo'); });
//promise1.then((a) => { console.log("then a:", a); return new Promise((a,b) => { console.log("in promise"); a(); return "b"; }); }).then((b) => { console.log("then b:", b) })
//promise1.then((a) => { console.log("then a:", a); return "b"; }).then((b) => { console.log("then b:", b) })
promise1.then((a) => { console.log("then a:", a); return new Promise((resolve) => { console.log("in promise"); resolve("b"); }); }).then((b) => { console.log("then b:", b) })
