# mapbox-data-cli

[![build status](https://secure.travis-ci.org/mapbox/mapbox-data-cli.png)](http://travis-ci.org/mapbox/mapbox-data-cli)

[![NPM](https://nodei.co/npm/mapbox-data-cli.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mapbox-data-cli/)

CLI utilities for [Mapbox](https://www.mapbox.com/) Data API.

## Install

```sh
$ npm install -g @mapbox/mapbox-data-cli
```

## Setup

Requires a `MapboxAccessToken` environment variable with data:write permissions.

## Utilities

Includes nine utilities

* `mapbox-data get-dataset`: read information about a particular dataset
* `mapbox-data get-feature`: get individual feature from dataset
* `mapbox-data create-dataset`: create a new empty dataset with optional name and description
* `mapbox-data insert-features`: add/update features in a dataset
* `mapbox-data replace-dataset`: replace dataset with new GeoJSON data
* `mapbox-data list-datasets`: list all datasets belonging to a user
* `mapbox-data list-features`: get all [GeoJSON](http://geojson.org/) features within a dataset
* `mapbox-data delete-feature`: delete a feature from within a dataset
* `mapbox-data delete-dataset`: delete an entire dataset


```sh
$ npm install -g @mapbox/mapbox-data-cli
$ mapbox-data create-dataset "Traffic Data" "Traffic data for Phoenix area"
{"owner":"smith","id":"6dcc766430756d74120b9e5ff1c9d4dd","name":"Traffic Patterns,","description":"Traffic in the Pheonix Valley","created":"2015-08-05T02:35:59.828Z","modifie$
":"2015-08-05T02:35:59.828Z"}
$ mapbox-data insert-features 6dcc766430756d74120b9e5ff1c9d4dd traffic.json
```

The output of the `list`, `insert`, and `replace` commands are line-delimited JSON objects of each feature. If you would like to have the JSON object of the whole FeatureCollection, use the `--dump` option.

## Pipes

`mapbox-data insert-features` and `mapbox-data replace-dataset` support stdin: you can pipe
into them, and they'll put the data on [Mapbox](https://www.mapbox.com/).

```sh
$ npm install -g geojson-random # util that generates random geojson
$ geojson-random | mapbox-data insert-features DATASETID
```
