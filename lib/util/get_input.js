var stdin = require('get-stdin'),
    chunks = require('./chunks'),
    validate = require('./validate_input'),
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
        if (err) throw err;
        cb(data, chunks(validate(JSON.parse(data))));
    }
};
