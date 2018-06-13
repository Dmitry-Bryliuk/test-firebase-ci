var mock_firestore = require('mock-cloud-firestore');
firestore = (new mock_firestore()).firestore();

function listSnapshot(snapshot, title) {
    !title || console.log(title);
    !snapshot || snapshot.forEach(doc => console.log(doc.id, '=>', doc.data()));
    console.log("<");
}

//firestore.autoFlush();

firestore.collection("users").get().then(r => listSnapshot(r, "before:"));

firestore.collection("users").doc("aaa").set({ name: "aaa" }).then(r => console.log(r));
firestore.collection("users").add({ name: "bbb" }).then(r => console.log(r.id, '=>', r.data));

firestore.collection("users").get().then(r => listSnapshot(r, "after:"));

//firestore.flush();