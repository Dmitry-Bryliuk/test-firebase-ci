var Firebase = require('firebase');
var ref = new Firebase('myRefUrl');
ref.on('value', function (snapshot) {
    console.log(snapshot.val());
});

var db = ref;

var docRef = db.collection('users').doc('alovelace2');

var setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
});
console.log("setAda");
console.log(setAda);
setAda.then(r => console.log(r)).catch(e => {});

/*
var people = {
    ref: function () {
        if (!ref) ref = new Firebase('htttps://example.firebaseio.com/people');
        return ref;
    },
    greet: function (person) {
        console.log('hi ' + person.first);
    },
    listen: function () {
        people.ref().on('child_added', function (snapshot) {
            people.greet(snapshot.val());
        });
    }
};

MockFirebase.override();
people.listen();
var greeted = [];
people.greet = function (person) {
    greeted.push(person);
};
ref.push({
    first: 'Michael'
});
ref.push({
    first: 'Ben'
});
ref.flush();

console.assert(greeted.length === 2, '2 people greeted');
console.assert(greeted[0].first === 'Michael', 'Michael greeted');
console.assert(greeted[1].first === 'Ben', 'Ben greeted');
*/