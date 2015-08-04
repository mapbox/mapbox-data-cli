var stdin = require('get-stdin'),
    validate = require('./validate_input'),
    hat = require('hat'),
    fs = require('fs');

/**
 * Get input for cli commands from stdin or from the first
 * cli argument.
 *
 * @param {string?}  filename filename: can be null, in which case we check for
 * stdin.
 * @param {Function} callback callback called with (err, data)
 */
module.exports = function getInput(filename, cb) {
    if (filename) return fs.readFile(filename, 'utf8', send);
    else return stdin(send.bind(null, null));

    function send(err, data) {
        if (err) return cb(err);
        data = validate(JSON.parse(data));

        if (data.features) {
            data = data.features.map(function(feature) {
                feature.id = feature.id || hat();
                return feature;
            });
        } else {
            data = [data];
        }
        return cb(null, data);
    }
};
