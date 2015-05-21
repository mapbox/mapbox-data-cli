var chunk = require('chunk');

/**
 * Given a FeatureCollection, return an array of FeatureCollections
 * that contain 100 or fewer Features each
 * @param {Object} featurecollection
 * @return {Array<Object>} chunks
 */
module.exports = function(featurecollection) {
    return chunk(featurecollection.features, 100)
        .map(function(features) {
            return {
                type: 'FeatureCollection',
                features: features
            };
        });
};
