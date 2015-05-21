var queue = require('queue-async'),
    got = require('got'),
    at = require('./access_token'),
    get = require('./get'),
    API = require('./constants').API;

module.exports = function(user, id, callback) {
    get(user, id, function(err, res) {
        if (err) throw err;
        var fc = JSON.parse(res);
        var q = queue(2);
        fc.features.forEach(function(feature) {
            q.defer(got.delete, at(API + user + '/' + id + '/features/' + feature.id));
        });
        q.awaitAll(callback);
    });
};
