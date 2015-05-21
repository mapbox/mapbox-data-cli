var got = require('got'),
    API = require('./util/constants').API,
    at = require('./util/access_token'),
    getDataset = require('./util/get_dataset');

module.exports = function(user, id, callback) {
    getDataset(id, function(datasetid) {
        got(at(API + user + '/' + datasetid + '/features'), callback);
    });
};
