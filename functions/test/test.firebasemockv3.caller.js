var proxyquire = require('proxyquire');
var MockFirebase = require('firebase-mock-v3').MockFirebase;
var mock;
var test = proxyquire('./test.firebasemockv3', {
    firebase: function (url) {
        return (mock = new MockFirebase(url));
    }
});
mock.flush();
