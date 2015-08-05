var hint = require('geojsonhint').hint;

/**
 * Validate input as a valid GeoJSON FeatureCollection object
 *
 * @param {string?} input geojson input
 * @throws {Error} on invalid input
 */
module.exports = function validate(input) {
    var hints = hint(input);
    if (hints.length) {
        throw new Error(hints.map(function(h) { return h.message; }));
    }
    if (input.type !== 'FeatureCollection' && input.type !== 'Feature') {
        throw new Error('GeoJSON must be a FeatureCollection or Feature');
    }
    return input;
};
