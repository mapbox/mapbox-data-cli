var got = require('got'),
    API = require('./util/constants').API,
    at = require('./util/access_token'),
    queue = require('queue-async'),
    getDataset = require('./util/get_dataset'),
    getInput = require('./util/get_input');

/**
 * Add new data to the API, potentially splitting the input into chunks
 * in order to stay under the 100 feature per request limit.
 *
 * @param {string} user
 * @param {string} id
 * @param {string?} filename
 * @param {Function} callback
 */
module.exports = function add(user, id, filename, callback) {
    getInput(filename, function(original, chunks) {
        getDataset(id, function(datasetid) {
            var q = queue(1);
            console.error('adding ' + JSON.parse(original).features.length +
                ' features with ' + chunks.length + ' batches');
            chunks.forEach(function(data) {
                q.defer(send, user, datasetid, data);
            });
            q.awaitAll(function(err, res) {
                if (err) throw err;
                callback(err, res, original);
            });
        });
    });
};

/**
 * Send a single request to the API: this is a single chunk.
 *
 * @param {string} user
 * @param {string} id
 * @param {Object} data
 * @param {Function} callback
 */
function send(user, datasetid, data, callback) {
    var body = JSON.stringify(data);
    got.post(at(API + user + '/' + datasetid + '/features'), {
        body: body,
        headers: {
            'Content-Length': body.length,
            'Content-Type': 'application/json'
        }
    }, function(err, res) {
        callback(err, res);
    });
}
