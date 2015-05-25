var test = require('tape');

test('validate', function(t) {
    var validate = require('../lib/util/validate_input');
    t.throws(function() { validate(''); });
    t.throws(function() { validate({type:'Point'}); });
    t.ok(validate({type:'FeatureCollection', features: []}), 'valid input');
    t.end();
});

test('chunks', function(t) {
    var chunks = require('../lib/util/chunks');

    var emptyCollection = {type:'FeatureCollection', features: []};
    t.deepEqual(chunks(emptyCollection), [], 'no chunks necessary');

    var oneFeature = {type:'FeatureCollection', features: [{
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
        properties: {}
    }]};
    t.deepEqual(chunks(oneFeature), [oneFeature], 'one chunk');

    t.end();
});

test('access_token', function(t) {
    var at = require('../lib/util/access_token');
    delete process.env.MapboxAccessToken;
    t.throws(function() { at(''); });

    process.env.MapboxAccessToken = 'foo';
    t.equal(at('bar'), 'bar?access_token=foo');
    t.end();
});
