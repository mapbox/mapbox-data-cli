var queue = require('queue-async'),
    got = require('got'),
    get = require('./get'),
    at = require('./util/access_token'),
    API = require('./util/constants').API;

module.exports = function(user, id, callback) {
    get(user, id, function(err, res) {
        if (err) throw err;
        var fc = JSON.parse(res);
        var q = queue(20);
        fc.features.forEach(function(feature) {
            q.defer(got.delete, at(API + user + '/' + id + '/features/' + feature.id));
        });
        q.awaitAll(callback);
    });
};
