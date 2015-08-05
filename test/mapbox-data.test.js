var exec = require('child_process').exec;
var path = require('path');
var queue = require('queue-async');
var test = require('tape').test;

var mbdata = path.resolve(__dirname, '..', 'mapbox-data');

var validFeatures = path.resolve(__dirname, 'fixtures', 'features.json');

var testDataset;
var testFeatures = [];

process.env.PATH = [ path.resolve(__dirname, '..'), process.env.PATH ].join(':');

test('create: create a dataset', function(t) {
    var cmd = [mbdata, 'create-dataset', '--user', 'mapbox'].join(' ');
    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'user exists');
        var dataset = JSON.parse(stdout);
        t.equal(dataset.owner, 'mapbox', 'mapbox is the owner');
        t.ok(dataset.id, 'dataset has id');
        t.ok(dataset.created, 'dataset as a created date');
        t.ok(dataset.modified, 'dataset has a modified date');
        testDataset = dataset.id;
        t.end();
    });
});

test('add: add features to a dataset', function(t) {
    var cmd = [mbdata, 'insert-features', testDataset, validFeatures, '--user', 'mapbox'].join(' ');
    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'user exists');
        stdout.split('\n').forEach(function(line) {
            if (line) {
                var feature = JSON.parse(line);
                t.equal(feature.type, 'Feature', 'mapbox is the owner');
                t.ok(feature.id, 'id exists');
                t.ok(feature.geometry, 'dataset has created property');
            }
        });
        t.end();
    });
});

test('replace: replace features of a dataset', function(t) {
    var cmd = [mbdata, 'replace-dataset', testDataset, validFeatures, '--user', 'mapbox'].join(' ');
    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'dataset exists');
        stdout.split('\n').forEach(function(line) {
            if (line) {
                var feature = JSON.parse(line);
                t.equal(feature.type, 'Feature', 'mapbox is the owner');
                t.ok(feature.id, 'id exists');
                t.ok(feature.geometry, 'dataset has created property');
                testFeatures.push(feature.id);
            }
        });
        t.end();
    });
});

test('list: list datasets of user', function(t) {
    var cmd = [mbdata, 'list-datasets', '--user', 'mapbox'].join(' ');
    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'user exists');
        stdout.split('\n').forEach(function(line) {
            if (line) {
                var dataset = JSON.parse(line);
                t.equal(dataset.owner, 'mapbox', 'mapbox is the owner');
                t.ok(dataset.id, 'id exists');
                t.ok(dataset.created, 'dataset has created property');
                t.ok(dataset.modified, 'dataset has modified property');
            }
        });
        t.end();
    });
});

test('list: list features of a dataset', function(t) {
    var cmd = [mbdata, 'list-features', testDataset, '--user', 'mapbox'].join(' ');
    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'dataset exists');
        stdout.split('\n').forEach(function(line) {
            if (line) {
                var feature = JSON.parse(line);
                t.equal(feature.type, 'Feature', 'mapbox is the owner');
                t.ok(feature.id, 'id exists');
                t.ok(feature.properties, 'dataset has created property');
                t.ok(feature.geometry, 'dataset has modified property');
            }
        });
        t.end();
    });
});

test('get: get description of a dataset', function(t) {
    var cmd = [mbdata, 'get-dataset', testDataset, '--user', 'mapbox'].join(' ');
    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'dataset exsts');
        var dataset = JSON.parse(stdout);
        t.equal(dataset.id, testDataset);
        t.end();
    });
});

test('get: get description of a feature', function(t) {
    var cmd = [mbdata, 'get-feature', testDataset, testFeatures[0], '--user', 'mapbox'].join(' ');
    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'fixture exsts');
        var feature = JSON.parse(stdout);
        t.equal(feature.id, testFeatures[0]);
        t.end();
    });
});

test('delete: delete features of a dataset', function(t) {
    var testFeature = testFeatures.shift();
    var cmd = [mbdata, 'delete-feature', testDataset, testFeature, '--user', 'mapbox'].join(' ');

    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'feature was deleted');
        t.end();
    });
});

test('delete: delete an entire dataset', function(t) {
    var cmd = [mbdata, 'delete-dataset', testDataset, '--user', 'mapbox'].join(' ');

    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'dataset was deleted');
        t.end();
    });
});
