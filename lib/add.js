var got = require('got'),
    API = require('./constants').API,
    at = require('./access_token'),
    getDataset = require('./get_dataset'),
    getInput = require('./get_input');

module.exports = function add(user, id, filename, callback) {
    getInput(filename, function(data) {
        getDataset(id, function(datasetid) {
            got.post(at(API + user + '/' + datasetid + '/features'), {
                body: data,
                headers: {
                    'Content-Length': data.length,
                    'Content-Type': 'application/json'
                }
            }, function(err, res) {
                callback(err, res, data);
            });
        });
    });
};
