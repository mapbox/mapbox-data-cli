var hint = require('geojsonhint').hint;

/**
 * Validate input as valid GeoJSON with singly-nested properties
 *
 * @param {string?} input geojson input
 * @throws {Error} on invalid input
 */
module.exports = function validate(input) {
    var hints = hint(input);
    if (hints.length) {
        throw new Error(hints.map(function(h) { return h.message; }));
    }
    if (input.type !== 'FeatureCollection') {
        throw new Error('GeoJSON must be a FeatureCollection');
    }
    input.features.forEach(function(feature) {
        for (var k in feature.properties) {
            if (typeof feature.properties[k] === 'object') {
                throw new Error('GeoJSON property ' + k + ' cannot be nested');
            }
        }
    });
    return input;
};
