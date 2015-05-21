var got = require('got'),
    MAPBOX = require('./constants').MAPBOX,
    at = require('./access_token'),
    getDataset = require('./get_dataset'),
    API = MAPBOX + 'datasets/v1/';

module.exports = function(user, id, callback) {
    getDataset(id, function(datasetid) {
        got(at(API + user + '/' + datasetid + '/features'), callback);
    });
};
