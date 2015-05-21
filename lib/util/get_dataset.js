var got = require('got'),
    MAPBOX = require('./constants').MAPBOX,
    at = require('./access_token');

/**
 * Given a mapid, find its dataset.
 *
 * @param {string} _ a mapbox mapid or dataset id
 * @param {Function} callback callback called with (err, data)
 */
module.exports = function getInput(_, cb) {
    var parts = _.split('.');
    if (parts.length === 1) {
        cb(_);
    } else if (parts.length === 2) {
        got(at(MAPBOX + 'api/Map/' + _), { json: true }, function(err, res) {
            if (err) throw err;
            cb(res.dataset);
        });
    } else {
        throw new Error('given a string that does not look like a mapid or datasetid');
    }
};
