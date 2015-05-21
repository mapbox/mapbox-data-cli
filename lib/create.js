var got = require('got'),
    API = require('./util/constants').API,
    at = require('./util/access_token');

/**
 * Create a new dataset in the API.
 *
 * @param {string} user
 * @param {string} name
 * @param {string} description
 * @param {Function} callback
 */
module.exports = function create(user, name, description, callback) {
    var body = JSON.stringify({
        name: name || '',
        description: description || ''
    });
    got.post(at(API + user), {
        json: true,
        body: body,
        headers: {
            'Content-Length': body.length,
            'Content-Type': 'application/json'
        }
    }, function(err, res) {
        callback(err, res.id);
    });
};
