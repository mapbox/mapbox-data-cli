var stdin = require('get-stdin'),
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
    if (filename) {
        return cb(fs.readFileSync(filename, 'utf8'));
    } else {
        return stdin(function(data) {
            if (!data) throw new Error('input required');
            cb(data);
        });
    }
};
